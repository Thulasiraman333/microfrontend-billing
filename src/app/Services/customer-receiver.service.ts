import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerReceiverService {

  private customerSubject = new BehaviorSubject<any>(null);
  customer$ = this.customerSubject.asObservable();

  constructor() {
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'SET_CUSTOMER') {
        console.log('[Billing] Received customer message:', event.data.payload);
        this.customerSubject.next(event.data.payload);
      }
    });
  }
}
