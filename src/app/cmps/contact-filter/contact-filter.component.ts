import { Component, inject, OnInit } from '@angular/core';
import { ContactFilter } from 'src/app/models/contact-filter';
import { ContactService } from 'src/app/service/contact-service.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {


  contactService: ContactService
  constructor() {
    this.contactService = inject(ContactService)
  }


  filterBy: ContactFilter = { term: '' }


  ngOnInit(): void {
    this.contactService.filterBy$.subscribe(filterBy => {
      this.filterBy = filterBy
    })
  }
  onSetFilter() {
    this.contactService.setFilter(this.filterBy)
  }
}
