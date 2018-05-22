import { UsernameValidators } from './../common/Validators/username.validators';
import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  // form= new FormGroup({
  //   account : new FormGroup({
  //     username : new FormControl('',
  //                             [Validators.required, Validators.minLength(3), 
  //                               UsernameValidators.cannnotContainSpace],[UsernameValidators.shouldBeUnique]),
  //     password : new FormControl('',Validators.required)
  //   })
  // });
  form;
  constructor(fb:FormBuilder){
    this.form = fb.group({
      account : fb.group({
        username : ['',[Validators.required, Validators.minLength(3),
                    UsernameValidators.cannnotContainSpace],[UsernameValidators.shouldBeUnique]],
        password : fb.control('',Validators.required)
      })
    })
  }

  get username(){
    return this.form.get('account.username');
  };

  login(){
    this.form.setErrors({invalidLogin : true});
    this.log(this.form);
  };

  log(event){
    console.log(event);
  };
}

