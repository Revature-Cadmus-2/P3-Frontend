import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-mark-button',
  templateUrl: './book-mark-button.component.html',
  styleUrls: ['./book-mark-button.component.css']
})
export class BookMarkButtonComponent implements OnInit {

  constructor() { }
  booked = false;
  notbooked = false;
  
  ngOnInit(): void {
  }
  onbookmarkClick(){

  }
}
