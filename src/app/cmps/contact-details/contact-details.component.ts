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
    const colors = [
      "B7DDB0",
      "F5EA92",
      "BCD9EA",
      "FAD29C",
      "EDDBF4",
      "51e898",
      "F5DD29",
      "29CCE5",
      "FFAF3F",
      "DFC0EB",
      "49852E",
      "f2d600",
      "21567f",
      "ff9f1a",
      "6C547B",
      "FBEDEB",
      "F5D3CE",
      "EFB3AB",
      "EF7564",
      "e13b24",
    ]

    const name = this.contact.name.split(' ')
    let upperCase1
    let upperCase2
    if (name.length === 1) {
      upperCase1 = name[0].substring(0, 1)
      return `https://eu.ui-avatars.com/api/?name=${upperCase1}&size=250`

    } else if (name.length === 2) {
      upperCase1 = name[0].substring(0, 1)
      upperCase2 = name[1].substring(0, 1)

      return `https://eu.ui-avatars.com/api/?name=${upperCase1}+${upperCase2}&size=250&background=${colors[name[0].length]}&color=fff`
    }
    return `https://eu.ui-avatars.com/api/?name=kohn+Dsose&size=250`
  }
}
