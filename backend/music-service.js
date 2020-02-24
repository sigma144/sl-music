const verovio = require('verovio')
var vrvToolkit = new verovio.toolkit()

function renderMusic(music) {
    /*
    let data =
    `<?xml version="1.0" encoding="UTF-16" ?>
    <mei meiversion="3.0.0" xmlns="http://www.music-encoding.org/ns/mei" xmlns:xlink="http://www.w3.org/1999/xlink">
    <meiHead></meiHead>
    <music>
        <body>
            <mdiv>
                <score>
                    <scoreDef meter.count="4" meter.unit="4">
                        <staffGrp>
                            <staffDef clef.line="2" clef.shape="G" key.mode="major" key.sig="0" lines="5" n="1"></staffDef>
                        </staffGrp>
                    </scoreDef>
                    <section>
                        <measure n="1">
                            <staff n="1">
                                <layer n="1">
                                    <chord dur="2" stem.dir="up">
                                        <note dur="2" oct="4" pname="d"/>
                                        <note dur="2" oct="4" pname="f"/>
                                        <note dur="2" oct="5" pname="c"/>
                                        <note dur="2" oct="5" pname="e"/>
                                    </chord>
                                    <chord dur="2" stem.dir="up">
                                        <note dur="2" oct="4" pname="d">
                                            <accid accid="s"/>
                                        </note>
                                        <note dur="2" oct="4" pname="f">
                                            <accid accid="s"/>
                                        </note>
                                        <note dur="2" oct="5" pname="c">
                                            <accid accid="s"/>
                                        </note>
                                        <note dur="2" oct="5" pname="e">
                                            <accid accid="s"/>
                                        </note>
                                    </chord>
                                </layer>
                            </staff>
                        </measure>
                        <measure n="1">
                            <staff n="1">
                                <layer n="1">
                                    <chord dur="2" stem.dir="up">
                                        <note dur="2" oct="4" pname="d"/>
                                        <note dur="2" oct="4" pname="f"/>
                                        <note dur="2" oct="5" pname="c"/>
                                        <note dur="2" oct="5" pname="e"/>
                                    </chord>
                                    <chord dur="2" stem.dir="up">
                                        <note dur="2" oct="4" pname="d">
                                            <accid accid="s"/>
                                        </note>
                                        <note dur="2" oct="4" pname="f">
                                            <accid accid="s"/>
                                        </note>
                                        <note dur="2" oct="5" pname="c">
                                            <accid accid="s"/>
                                        </note>
                                        <note dur="2" oct="5" pname="e">
                                            <accid accid="s"/>
                                        </note>
                                    </chord>
                                </layer>
                            </staff>
                        </measure>
                    </section>
                </score>
            </mdiv>
        </body>
    </music>
    </mei>`;
    */

   var data = `<measure n="1"><staff n="1"><layer n="1">`
   for (note of music.notes) {
        var duration = ""
        if (note.type == "whole") {
            duration = "1"
        }
        if (note.type == "half") {
            duration = "2"
        }
        if (note.type == "quarter") {
            duration = "4"
        }
        var accidental = ""
        if (note.accidental == "flat") {
            accidental = `<accid accid="f"/>`
        }
        if (note.accidental == "sharp") {
            accidental = `<accid accid="s"/>`
        }
        if (note.accidental == "natural") {
            accidental = `<accid accid="n"/>`
        }
        data += `<note dur="${duration}" oct="${note.octave}" pname="${note.pitch}">${accidental}</note>`
   }
   data += `</layer></staff></measure>`

   data = `<?xml version="1.0" encoding="UTF-16" ?>
   <mei meiversion="3.0.0" xmlns="http://www.music-encoding.org/ns/mei" xmlns:xlink="http://www.w3.org/1999/xlink">
   <meiHead></meiHead>
   <music>
       <body>
           <mdiv>
               <score>
                   <scoreDef>
                       <staffGrp>
                           <staffDef clef.line="2" clef.shape="G" key.mode="major" key.sig="0" lines="5" n="1"></staffDef>
                       </staffGrp>
                   </scoreDef>
                   <section>
                        ${data}
                   </section>
                </score>
            </mdiv>
        </body>
    </music>
    </mei>`

    //var svg = vrvToolkit.renderData(data, {})
    var svg = vrvToolkit.renderData(data, { pageWidth: 1000, adjustPageHeight: 1});
    return svg
}

module.exports = { renderMusic }