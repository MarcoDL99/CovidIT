import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {Contatto} from '../../model/contatto.model';
import {ContattoService} from "../../services/contatto.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts$: Contatto[];
  private callNumber: CallNumber;
  constructor(private contactService: ContattoService) { }

  ngOnInit() {
    this.contacts$=this.contactService.list();
  }
  chiama(numero: string){
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }
  inviamail(mail: string){

  }
}
