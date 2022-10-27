import { Component, inject, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'trensfer-contact',
  templateUrl: './trensfer-contact.component.html',
  styleUrls: ['./trensfer-contact.component.scss']
})
export class TrensferContactComponent implements OnInit {
  userService = inject(UserService)
  constructor() { }

  @Input() contact!: Contact
  user!: User
  coinsToTransfer!: number
  messege!: string
  transferSucceeded!:boolean
  ngOnInit(): void {
    console.log(this.contact);
    this.user = this.userService.getLoggedInUser()
    console.log(this.user);
    this.coinsToTransfer = this.user.coins
  }
  onTransfer() {
    if (this.user.coins <= 0) {
      this.messege = 'Your wallet is empty!'
      setTimeout(()=>{
        this.messege =''
      },3000)
      return
    }
    if (this.user.coins-this.coinsToTransfer > 0) {
      this.transferSucceeded=true
      this.messege = `You Transfer ${this.coinsToTransfer}$ to ${this.contact.name}!`
      setTimeout(()=>{
        this.transferSucceeded=false
        this.messege =''
      },3000)
    }
    if (this.user.coins-this.coinsToTransfer < 0) {
      this.messege = "Your can't transfer more then you have!"
      setTimeout(()=>{
        this.messege =''
      },3000)
      return
    }
    
    if (this.user._id===this.contact._id) {
      this.messege = "Your can't transfer money yourself!"
      setTimeout(()=>{
        this.messege =''
      },3000)
      return
    }
    const user = this.userService.onTransferCoins(this.contact, this.coinsToTransfer)
    if (user) this.user = user
  }

}
