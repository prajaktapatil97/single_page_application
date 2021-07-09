import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { errorMessages } from '../error-messages-contants';
import { checkPattern } from '../pattern-contants';
import { UserService } from '../user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isDelete: boolean = false;
  isEdit: boolean = false;
  checkpattern = checkPattern;
  errormessages = errorMessages;
  loginForm!: FormGroup;
  loginSubmitted: boolean | undefined;
  username: any;
  invalidCreadentials: boolean | undefined;
  reqObject: {} | undefined;
  submitted: boolean = false;
  isUserForm: boolean = false;
  totalData: any = [];
  userObj : any = {};
  userId: any;
  isEditForm: boolean = false;
  editUserObject: { email_id: any; user_name: any; user_id: any; } | undefined;
;

  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserData()
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
        fullName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(18),
          Validators.pattern(this.checkpattern.NAME_WITH_SPACE),
        ]],
              
      }
    );
  }


  editUser(item:any){
    this.isUserForm = true;
    this.loginForm.patchValue({
      fullName: item.user_name,
      userName: item.user_email,
      // user_id : item.user_id
    });
    this.editUserObject = {
      email_id: item.user_name,
      user_name: item.user_email,
      user_id : item.user_id
    }
  this.isEditForm = true;
  
  }
  openDeletePopup(user_id :any){
    this.userId = user_id
    this.isDelete = true;
  }
  deleteUser(){
    this.isDelete = false;
    this.userObj = {
      user_id : this.userId
    }
    this.userService.deleteUser(this.userObj).subscribe(response => {
      if (response) {
        if (response.status == 0) {
          alert(response.message)
          this.getUserData();
          
        }
      }
    });

  }
  cancelDelete(){
    this.isDelete = true;
  }

  callUserLogin() {
    this.submitted = true;
  }
  addUser(){
   this.loginForm.reset()
   this.isUserForm = true
   this.isEditForm = false;
   }

   onSubmit(){
    this.submitted = true;
     this.reqObject= {
      email_id :this.loginForm.controls.userName.value,
      user_name : this.loginForm.controls.fullName.value
     }
     if(!this.isEditForm){
      this.userService.addUser(this.reqObject).subscribe(response => {
        if (response) {
          if (response.status == 0) {
            alert(response.message)
            this.getUserData();
            this.isUserForm = false
          }
        }
      });
     }
     else{
      this.userService.editUser(this.editUserObject).subscribe(response => {
        if (response) {
          if (response.status == 0) {
            alert(response.message)
            this.getUserData();
            this.isUserForm = false
          }
        }
      });
     }
   }

   getUserData(){
    this.userService.getUser({}).subscribe(response => {
      if (response) {
        if (response.status == 0) {
          this.totalData = response.result
        }
      }
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls; }

logout(){
  this.router.navigateByUrl('/login');
}
}
