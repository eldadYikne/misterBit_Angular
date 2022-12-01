import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable, subscribeOn } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/service/bitcoin-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private bitCoinService: BitcoinService) { }
  bitcoinValue!: any
  userBitcoinValue!: any
  currUser!: User|null
  currCoin: string = 'USD'
  coinsOption!:string[]
  showCoinsOptions:boolean=false
  bitcoinToUsd!:number

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if(user?.moves){
        user?.moves.splice(3,user.moves.length)
      }
      this.currUser = user

    })
    this.currUser = this.userService.getLoggedInUser()
    this.getUserBit()
    this.getRate()
    this.getBitRate()
    this.getExchangeRates()
  }
  async getRate() {
    const bitcoin = await lastValueFrom(this.bitCoinService.getRate(this.currCoin))
    bitcoin
    console.log('bitcoin', bitcoin)

    this.bitcoinValue = bitcoin
  }
  async getUserBit() {
    if(this.currUser){
      const bitcoin = await lastValueFrom(this.bitCoinService.getUserBitcoin(this.currUser.coins))
      this.userBitcoinValue = bitcoin
    }
  }
  async getBitRate() {
    const bitcoin = await this.bitCoinService.getBitRate()
    // bitcoin[this.currCoin  as keyof typeof ]
    console.log('bitcoin', bitcoin)
    this.coinsOption= Object.keys(bitcoin)
  }
  async getExchangeRates() {
    const rate:any = await this.bitCoinService.getBitRate()
    const bitcoinToUSD = rate['USD']
    this.bitcoinToUsd = bitcoinToUSD.buy
  }

  onChooseCoins(coin:string){
    this.currCoin=coin
    this.getRate()
    this.showCoinsOptions=!this.showCoinsOptions
  }
  

    onShowCoinsOptions(){
      this.showCoinsOptions=!this.showCoinsOptions
    }
  }
