import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Message } from '../../models/message'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  message: string = "";

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get<Message>("/").subscribe(msg => {
      this.message = msg.message;
    })
  }
}