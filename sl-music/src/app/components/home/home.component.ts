import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  message: string = "";

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    
  }

  test(): void {
    
  }
}