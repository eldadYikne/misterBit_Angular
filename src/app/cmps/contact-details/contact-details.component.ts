import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/service/contact-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router

  ) { }
  paramsSubscription!: Subscription
  contact!: Contact
  contactIdx!:number

  async ngOnInit() {
    this.paramsSubscription = this.route.data.subscribe(data => {
      const contact = data['contact']
      console.log('data', contact);

      if (contact) this.contact = contact
    })

  }
  onBack() {
    this.router.navigate(['/contact'])

  }
  imgUrl() {
    const contactIdx = this.contactService.contacts$.subscribe(contacts => {
      this.contactIdx= contacts.findIndex(contact => contact._id === this.contact._id)
    })

    let gender = this.contactIdx % 2 === 0 ? 'male' : 'female'

    return `https://xsgames.co/randomusers/assets/avatars/${gender}/${this.contactIdx}.jpg`  }
}
