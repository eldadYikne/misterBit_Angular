import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { lastValueFrom, Observable, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<Observable<void|Contact>> {
  contactService = inject(ContactService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void|Contact> {
      
      const id = route.params['id']
      
      const contact =  this.contactService.getContactById(id)
      console.log('rout',contact);
    return contact;

  }
}
