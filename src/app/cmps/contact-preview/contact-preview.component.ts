import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  constructor(private router: Router) { }

  @Output() remove = new EventEmitter<string>
  @Input() contact!: Contact
  ngOnInit(): void {

  }
  onRemoveContact(ev: Event) {
    ev.stopPropagation()
    this.remove.emit(this.contact._id)

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
  onEditContact(ev: MouseEvent) {
    ev.stopPropagation()
    this.router.navigate(['/contact/edit', this.contact._id])

  }


}
