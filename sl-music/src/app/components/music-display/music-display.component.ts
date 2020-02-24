import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-music-display',
  templateUrl: './music-display.component.html',
  styleUrls: ['./music-display.component.css']
})
export class MusicDisplayComponent implements OnInit {

  //svg: any;
  //midi: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  setSVG(svg: any): void {
    var svgElem = document.getElementById("svg")
    svgElem.innerHTML = svg
    //this.svg = svg;
    //console.log(svg)
  }

  setMIDI(midi: any): void {
    //this.midi = midi;
  }

}
