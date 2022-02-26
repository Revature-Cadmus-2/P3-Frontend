import { Component, OnInit } from "@angular/core";
import { Router, Routes } from '@angular/router';
@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.css']
})
export class SettingsButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  buttonclicked(){
    console.log("button clicked ");
  }
}
