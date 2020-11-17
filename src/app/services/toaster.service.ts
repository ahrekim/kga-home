import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../app-config';
import { ContactForm } from "../models/ContactForm";
import { ToastMessage } from '../models/ToastMessage';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    toastId = 1;
    toasterMessages: ToastMessage[] = [];
    constructor() { }

    addMessage(message: ToastMessage) {
        
        // Set var
        var toastMessage = message;

        // Remove old messages if amount get above 5
        if(this.toasterMessages.length == 5)
        {
            this.toasterMessages.shift();
        }

        // Give id
        toastMessage.id = this.toastId;

        // Push to array
        this.toasterMessages.push(message);

        // Set variable for later timer use
        var theId = this.toastId;

        // Set a timer for the message deletion
        setTimeout(() => {
            // Remove message after 5 seconds
            this.toasterMessages.forEach((loopedMessage, index) => {
                if(loopedMessage.id == theId)
                {
                    this.toasterMessages.splice(index, 1);
                }
            })
        }, 5000);

        // Add to id for next toast
        this.toastId = this.toastId+1;
    }
}
