import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactForm } from '../models/ContactForm';
import { LoginForm } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';
import { ContactService } from '../services/contact.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  formLocked: boolean = true;


  constructor(
    private authenticationService: AuthenticationService,
    public toaster: ToasterService,
    private router: Router
  ){
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }
  
  onSubmit() {
    this.form.disable();
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
    } as LoginForm;
    
    //Send the data to backend
    this.authenticationService.postLoginForm(
      data
      ).subscribe(
        user => {
          this.toaster.addMessage({id: null, message: "Logged in!", type: "success"});
          console.log(user);
          this.authenticationService.setStoredUser(user);
          // redirect to auth routes
          this.router.navigateByUrl("/auth/messages");
        },
        error => {
          this.toaster.addMessage({id: null, message: "Login failed", type: "danger"});
          console.log(error.message);
          this.form.enable();
      }
    );
  }
}

