import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';
import { ContactService } from './contact-service.service';
import { storageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  contactService = inject(ContactService)
  constructor() { }
  usersDb: User[] = storageService.loadFromStorage('userDB') || []
  user: User = this.getLoggedInUser() || null


  private _user$ = new BehaviorSubject<User | null>(this.user)
  public user$ = this._user$.asObservable()

  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()


  signup(name: string) {
    let user = this.usersDb.find(user => user.name === name)
    if (!user) {
      user = this._createUser(name) as User
      this.usersDb.push(user)
      this._users$.next(this.usersDb)
      const contact = this.contactService.getEmptyContact()
      contact.name = name
      contact.email = `${name}@gmail.com`
      contact.phone = '+9725698481'
      contact.coins = 1000
      contact.moves = []
      this.contactService.saveContact(contact)
    }
    this.setLoggedInuser(user)
    this._user$.next(user)
    storageService.saveToStorage('userDB', this.usersDb)

  }
  onTransferCoins(toContact: Contact, amount: number) {
    const newContact = toContact
    if (!this.user) return
    if (this.user?.coins <= 0) return
    if (newContact?.coins) {
      newContact.coins += amount
    } else {
      newContact.coins = 1000+amount
    }
    this.user.coins -= amount

    let newContacts: Contact[]
    let newContactToUpdate
    this.contactService.contacts$.subscribe(contacts => {
      if (contacts !== newContacts) {
        //FIND IDX        
        let toContactIdx = contacts.findIndex(contact => contact._id === toContact._id)
        let fromContactIdx = contacts.findIndex(contact => contact._id === this.user._id)

        //USER TO CONTACT
        const newFromContact = new Contact(this.user._id, this.user.name, `${this.user.name}@gmail.com`, '+97265985623', this.user.coins, this.user.moves);
        const userIdx = this.usersDb.findIndex(user => user._id === newFromContact._id)

        // CLOSER
        newContacts = contacts
        newContactToUpdate = newFromContact

        // ADD MOVE

        const newMove = this.addMove(newContact, amount)
        if (!newFromContact.moves) {
          newFromContact.moves = []
        } else {
          newFromContact.moves.unshift(newMove)
        }
        
        // SPLICE AND REPLACE
        console.log('newContact', newContact)
        console.log('newFromContact', newFromContact)


        newContacts.splice(toContactIdx, 1, newContact)
        newContacts.splice(fromContactIdx, 1, newFromContact)
        this.usersDb.splice(userIdx, 1, this.user)
        this.contactService.updateContacts(newContacts)
        storageService.saveToStorage('userDB', this.usersDb)
        this._user$.next(this.user)
        storageService.saveToStorage('contactDB', newContacts)
        this.setLoggedInuser(this.user)

      }
    })

    return newContactToUpdate
  }

  addMove(contact: Contact, amount: number) {
    const move = {
      toId: contact._id,
      to: contact.name,
      at: new Date(),
      amount,
    }
    return move
  }

  setLoggedInuser(user: User | null) {
    const newUser = JSON.stringify(user)
    sessionStorage.setItem('LoggedInUser', newUser)
  }
  getLoggedInUser() {
    const user = sessionStorage.getItem('LoggedInUser')
    if (user) return JSON.parse(user)
    else null
  }
  logout() {
    this.setLoggedInuser(null)
    this._user$.next(null)

  }
  _createUser(name: string) {
    return {
      _id: this._makeId(),
      name,
      coins: 1000,
      moves: []
    }
  }


  _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
  }
}


