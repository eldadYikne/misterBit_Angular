import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  public getRate(coin: string) {
    return this.http.get(`https://blockchain.info/tobtc?currency=${coin}&value=1`).pipe(map(res=>{
      console.log('res',res)
      const rate= (res as number).toFixed(7)
      return rate
    }))
  
  }

  public getUserBitcoin(balance: number) {

    return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${balance}`).pipe(map(res=>{
      const rate= (res as number).toFixed(7)
    return rate
  }
    ))
  }
  public getBitRate() {

        const coinsValue =  lastValueFrom(this.http.get<{answer:any}>('https://blockchain.info/ticker'))
        return coinsValue

}


}
