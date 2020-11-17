import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from '../models/ContactForm';
import { ContactService } from '../services/contact.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  form: FormGroup;
  formLocked: boolean = true;


  constructor(
    private contactService: ContactService,
    public toaster: ToasterService
  ){
    this.form = new FormGroup({
      contact_email: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }
  
  onSubmit() {
    this.form.disable();
    const data = {
      contact_email: this.form.value.contact_email,
      message: this.form.value.message,
    } as ContactForm;
    
    this.toaster.addMessage({id: null, message: "Sending message...", type: "warning"});
    
    //Send the data to backend
    this.contactService.postContactForm(
      data
      ).subscribe(
        success => {
          this.toaster.addMessage({id: null, message: "Message sent", type: "success"});
        },
        error => {
          this.toaster.addMessage({id: null, message: "Error sending message!", type: "danger"});
          this.form.enable();
      }
    );

  }

}

