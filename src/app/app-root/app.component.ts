import { Component } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from '../service/contact-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'misterBitcoin';
  constructor(private contactService: ContactService) { }

  contactId!: string
  contacts!: Contact[]
  contacts$!: Observable<Contact[]>
  isContactPage: boolean = false


  ngOnInit(): void {
    this.contactService.loadContacts()
    this.contacts$ = this.contactService.contacts$
    this.contactService.contacts$.subscribe(contacts => {

    })

  }

  onChooseContact(contactId: string) {
    this.contactId = contactId
    console.log('contactId', this.contactId)
  }
  onContactPage() {
    this.isContactPage = !this.isContactPage
  }
}
