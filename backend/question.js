const helper = require('./helper')
const musicService = require('./music-service')

class Music {
    constructor(notes, audio) {
        this.notes = notes; this.audio = audio
    }
}

class Note {
    constructor(type, pitch, octave, accidental = 'none') {
        this.type = type; this.pitch = pitch; this.octave = octave; this.accidental = accidental
    }
    getPitchValue() {
        const values = {'c':0, 'd':2, 'e':4, 'f':5, 'g':7, 'a':9, 'b':11}
        return values[this.pitch] + (this.octave + 1) * 12 +
            (this.accidental == "flat" ? -1 : this.accidental == "sharp" ? 1 : 0)
    }
}

class Question {
    constructor(type, svg, midi, correct) {
        this.type = type; this.svg = svg; this.midi = midi; this.correct = correct
    }
}

//0: Normal interval
//1: Interval with accidentals
function generateQTheoryInterval(level) {
    const noteLetters = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
    var pitch1 = helper.randomRange(0, 6)
    var interval = helper.randomRange(1, 7)
    var pitch2 = pitch1 + interval * helper.randomChoice([-1, 1])
    if (pitch2 < 0) {
        pitch2 += 7
        var note1 = new Note("quarter", noteLetters[pitch1], 5)
        var note2 = new Note("quarter", noteLetters[pitch2], 4)
    }
    else if (pitch2 >= 7) {
        pitch2 -= 7
        var note1 = new Note("quarter", noteLetters[pitch1], 4)
        var note2 = new Note("quarter", noteLetters[pitch2], 5)
    }
    else {
        let octave = helper.randomRange(4, 5)
        var note1 = new Note("quarter", noteLetters[pitch1], octave)
        var note2 = new Note("quarter", noteLetters[pitch2], octave)
    }
    //Add accidentals
    if (level == 1) {
        if (helper.randomChance(0.25)) {
            note1.accidental = helper.randomChoice(["flat", "sharp"])
            note2.accidental = helper.randomChoice(["flat", "sharp"])
        }
        else if (helper.randomChance(0.5)) note1.accidental = helper.randomChoice(["flat", "sharp"])
        else note2.accidental = helper.randomChoice(["flat", "sharp"])
    }
    //Name interval
    var pitchDistance = Math.abs(note1.getPitchValue() - note2.getPitchValue())
    const intervalDistance = [0, 2, 4, 5, 7, 9, 11, 12]
    const perfect = [true, false, false, true, true, false, false, true]
    var quality = undefined
    if (perfect[interval] && pitchDistance == intervalDistance[interval]) quality = "perfect"
    if (!perfect[interval] && pitchDistance == intervalDistance[interval]) quality = "major"
    if (!perfect[interval] && pitchDistance == intervalDistance[interval] - 1) quality = "minor"
    if (perfect[interval] && pitchDistance == intervalDistance[interval] - 1 ||
        !perfect[interval] && pitchDistance == intervalDistance[interval] - 2) quality = "diminished"
    if (pitchDistance == intervalDistance[interval] + 1) quality = "augmented"
    if (quality === undefined) return generateQTheoryInterval(level)
    const intervalNames = ["unison", "second", "third", "fourth", "fifth", "sixth", "seventh", "octave"]
    return new Question("theory-interval", musicService.renderMusic(new Music([note1, note2])), undefined, [quality, intervalNames[interval]])
}

module.exports = { generateQTheoryInterval }

