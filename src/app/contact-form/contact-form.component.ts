import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor() { }

  contactMethods = [
    {id:1, name:'Email'},
    {id:2, name:'Phone'},
    {id:3, name:'Fax'}
  ];

  ngOnInit() {
  }

  log(x){
    console.log(x);
  }

  onSubmit(f){
    console.log(f);
  }

}
