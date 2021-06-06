import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  private callNumber: CallNumber;
  constructor() { }
  ngOnInit() {}
  chiama(numero: string){
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }
}
