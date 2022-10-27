import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userService = inject(UserService)
  router=inject(Router)
  constructor(   ) { }

  name!: string
  signup: boolean = true
  loginTxt: string = 'Login'
  messege:string=''
  ngOnInit(): void {
  }

  onSignup() {
    if(!this.name) {
      this.messege = "Enter your name please."
      setTimeout(()=>{
        this.messege =''
      },3000)
      return
    }
  
    this.userService.signup(this.name)
    this.router.navigate(['home'])
  }
  onToggelLoginSignup() {
    this.loginTxt = this.signup ? 'Signup':'Login' 
    this.signup = !this.signup
  }
}
