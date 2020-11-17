import { Component, OnInit, Input } from '@angular/core';
import { ToastMessage } from '../models/ToastMessage';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'toast-message',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit{

  constructor(
      public toaster: ToasterService
    ){
    }
  ngOnInit() {
    // Menu items
    
  }

}

