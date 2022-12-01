import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact-service.service';
@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {
  contactService = inject(ContactService)
  constructor(private router: Router) { }

  @Output() remove = new EventEmitter<string>
  @Input() contact!: Contact
  contactIdx!: number
  ngOnInit(): void {

  }
  onRemoveContact(ev: Event) {
    ev.stopPropagation()
    this.remove.emit(this.contact._id)

  }
  imgUrl() {
    const contactIdx = this.contactService.contacts$.subscribe(contacts => {
      this.contactIdx = contacts.findIndex(contact => contact._id === this.contact._id)
    })
    console.log('contactIdx', contactIdx)
    let gender = this.contactIdx % 2 === 0 ? 'male' : 'female'

    return `https://xsgames.co/randomusers/assets/avatars/${gender}/${this.contactIdx}.jpg`
  }
  onEditContact(ev: MouseEvent) {
    ev.stopPropagation()
    this.router.navigate(['/contact/edit', this.contact._id])

  }


}
