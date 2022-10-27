import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/service/contact-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {


  contactService=inject(ContactService)
  constructor(private router: Router
    ) { }
  @Output() remove = new EventEmitter

 contacts!: Contact[]


  ngOnInit(): void {
    this.contactService.contacts$.subscribe(contacts=>{
      console.log(contacts);
      this.contacts=contacts
      
    })

  }
  onAddContact() {
    this.router.navigate(['/contact/edit'])

  }
  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
    console.log('contactId', contactId)

  }

}
