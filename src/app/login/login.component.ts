import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessages } from '../error-messages-contants';
import { checkPattern } from '../pattern-contants';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  checkpattern = checkPattern;
  errormessages = errorMessages;
  loginForm!: FormGroup;
  loginSubmitted: boolean | undefined;
  username: any;
  invalidCreadentials: boolean | undefined;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.createform();
  }
  createform(){
    this.loginForm = this.formBuilder.group(
      {
        userName: ['', [
          Validators.required,
          Validators.pattern(this.checkpattern.EMAIL_VALIDATION),
          Validators.minLength(3),
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(250),
  
        ]],
  
      }
    );
  }

login(){
  if((this.loginForm.controls.userName.value).toLowerCase() == 'admin@gmail.com' && (this.loginForm.controls.password.value).toLowerCase() == 'password'){
    this.router.navigateByUrl('/dashboard');
    // localStorage.setItem('login',this.loginForm.controls.userName.value) 
  }
  else{
    alert("Please enter Valid Credentials")
    this.invalidCreadentials = true;
  }
 }
// convenience getter for easy access to form fields
get f() {
  return this.loginForm.controls; }
}
