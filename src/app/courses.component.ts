import {Component} from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector : 'courses', //<div class="courses">  '.courses', <div id="courses">  '#courses'
    template : `
                <h2>{{getTitle()}}</h2>
                <ul>
                    <li *ngFor = "let course of courses">{{course}}</li>
                </ul>
                <div (click) = "onDivClick()">
                    <button class = "btn btn-primary" [class.active] = "isActive" 
                    [style.backgroundColor] = "isActive?'blue':'Red'"
                    (click) = "onSave($event)">Save</button>

                </div>
                <input #email (keyup.enter)="onKeyUp(email.value)"/>
                <br/>
                <input  [(ngModel)] = "emails" (keyup.enter) = "onKeyUp()" />
                <br/>
                {{course.Rating | number:'1.2-2'}}<br/>
                {{course.Price | currency: 'BDT':'true':'3.2-2'}}<br/>
                {{course.ReleaseDate | date : 'shortDate'}}<br/>
                {{text | summary : '30'}}
                `
})

export class CoursesComponent{
    title = "List of courses";
    isActive = false;
    courses;
    emails = "fardimkaiser@gmail.com";
    text = `Disability is a very complex issue and it requires collaborative efforts to fight against it, said Saima Wazed Hossain, Chairperson of Bangladesh National Advocacy Committee for Autism and Neurodevelopmental Dis-orders on Wednesday.Saima Wazed, also a Member of the World Health Organisation's (WHO) Expert Advocacy Panel on Mental Health, was addressing as chief guest the launching ceremony of a project for children with disabilities at Sasakawa Auditorium of the International Centre for Diarrhoeal Disease Research, Bangladesh (icddr,b) in Dhaka in the morning.With the United Nations Children's Fund (UNICEF) providing financial assistance, the icddr,b, Faith Bangladesh and Shuchona Foundation are conducting the project titled - 'A Comprehensive Approach to Identify Children with Disabilities through Capacity Building of Government and NGO Health Workers and Disability Service Mapping in Bangladesh.'    -UNB`;
    constructor(service : CoursesService){
        this.courses = service.getCourses();
    }
    getTitle(){
        return this.title;
    }

    onSave($event){
        this.isActive = !this.isActive;
        $event.stopPropagation();
        console.log("save clicked", $event);
    }
    onDivClick(){
        console.log("div clicked");
    }
    onKeyUp(){
        console.log(this.emails);
    }
    course = {
        Title : 'Agular 4',
        Rating : 4.973,
        Price : 310.99,
        ReleaseDate : new Date(2018,2,1)
    };
}