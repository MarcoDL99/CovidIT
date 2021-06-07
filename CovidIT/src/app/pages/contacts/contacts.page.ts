import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {Contatto, ContattoComponent} from '../../model/contatto.model';
import {Observable} from "rxjs";
import {ContattoService} from "../../services/contatto.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  private callNumber: CallNumber;
  /* Test
  private con1: Contatto = new Contatto('Abruzzo', [new ContattoComponent('Protezione Civile','urp.emergenza@regione.sardegna.it','mail'),
    new ContattoComponent('Marco De Luca ciao','marcodl722@gmail.com','mail'),
    new ContattoComponent('Numero Verde Regionale','800 595 459','numero'),
    new ContattoComponent('Informazioni Piano Vaccinale:','0961 789775','numero') ]);
  private con2: Contatto = new Contatto('Basilicata', [new ContattoComponent('Protezione Civile',
    'urp.emergenza@regione.sardegna.it','mail'),
      new ContattoComponent('Marco De Luca ciao','marcodl722@gmail.com','mail'),
    new ContattoComponent('Numero Verde Regionale','800 595 459','numero'),
      new ContattoComponent('Informazioni Piano Vaccinale:','0961 789775','numero') ]);
  private contacts$: Contatto[]=[this.con1,this.con2];

   */
  private contacts$: Observable<Contatto[]>;
  constructor(private contactService: ContattoService) { }
  ngOnInit() {
    this.contacts$=this.contactService.list();
  }
  chiama(numero: string){
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }
}
