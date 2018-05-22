import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    topics : new FormArray([])
  });

  get topics(){
    return this.form.get('topics') as FormArray;
  }

  addTopic(topic : HTMLInputElement){
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }
  ngOnInit() {
  }

}
