import { Component, OnInit, Input, ViewChild, ElementRef, ComponentRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MusicDisplayComponent } from '../music-display/music-display.component';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  @Input() lesson: string;

  @ViewChild(MusicDisplayComponent) musicDisplay: MusicDisplayComponent;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.test();
  }

  test(): void {
    this.http.get<Question>("generate/theory-interval/1", true).subscribe(question => {
      //console.log(question)
      this.musicDisplay.setSVG(question.svg);
    })
  }

}
