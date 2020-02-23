const helper = require('./helper')

class Note {
    constructor(pitch, octave, duration, accidental = 'none') {
    this.pitch = pitch; this.octave = octave, this.duration = duration; this.accidental = accidental;
    }
    getPitchValue() {
        const values = {'c':0, 'd':2, 'e':4, 'f':5, 'g':7, 'a':9, 'b':11}
        return values[this.pitch] + (this.octave + 1) * 12 +
            (this.accidental == "flat" ? -1 : this.accidental == "sharp" ? 1 : 0)
    }
}

class Chord {
    constructor(notes) {
    this.notes = notes;
    }
}

class Question {
    constructor(type, notes, correct) {
      this.type = type; this.notes = notes; this.correct = correct;
    }
}

//0: Normal interval
//1: Interval with one accidental
//2: Interval with two accidentals
function generateQTheoryInterval(level) {
    const noteLetters = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
    var pitch1 = helper.randomRange(0, 6)
    var interval = helper.randomRange(1, 7)
    var pitch2 = pitch1 + interval * helper.randomChoice([-1, 1])
    if (pitch2 < 0) {
        pitch2 += 7
        var note1 = new Note(noteLetters[pitch1], 5, "quarter")
        var note2 = new Note(noteLetters[pitch2], 4, "quarter")
    }
    else if (pitch2 >= 7) {
        pitch2 -= 7
        var note1 = new Note(noteLetters[pitch1], 4, "quarter")
        var note2 = new Note(noteLetters[pitch2], 5, "quarter")
    }
    else {
        let octave = helper.randomRange(4, 5)
        var note1 = new Note(noteLetters[pitch1], octave, "quarter")
        var note2 = new Note(noteLetters[pitch2], octave, "quarter")
    }
    //Add accidental
    if (level == 1) {
        if (helper.randomChance(0.5)) note1.accidental = helper.randomChoice(["flat", "sharp"])
        else note2.accidental = helper.randomChoice(["flat", "sharp"])
    }
    if (level == 2) {
        note1.accidental = helper.randomChoice(["flat", "sharp"])
        note2.accidental = helper.randomChoice(["flat", "sharp"])
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
    return new Question("theory-interval", [note1, note2], [quality, intervalNames[interval]])
}

module.exports = { generateQTheoryInterval }

