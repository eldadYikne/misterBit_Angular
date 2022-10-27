import { Component, inject, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactService = inject(ContactService)
  constructor(private router: Router, private route: ActivatedRoute) { }
  contact!: Contact
  title!:string

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.contact = data['contact'] || this.contactService.getEmptyContact() as Contact 
    })
    this.title= this.contact._id? 'Edit contact':'New contact'
    console.log('this.contact',this.contact)
    
  }
  async onSaveContact() {
    if(!this.contact.name || !this.contact.email ) return 
    console.log('this.contact',this.contact)
    this.contactService.saveContact(this.contact)
    
    this.router.navigate(['/contact'])
  }

  onGoBack(){
    this.router.navigate(['/contact'])

  }
}
