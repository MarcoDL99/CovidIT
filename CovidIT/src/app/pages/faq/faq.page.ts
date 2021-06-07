import { Component, OnInit } from '@angular/core';
import {Faq} from '../../model/faq.model';
import {Observable} from 'rxjs';
import {FaqService} from '../../services/faq.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  /* Test iniziale
  private faq1: FaqModel= new FaqModel('Chi siamo',
    'Ciao, siamo Marco e Lorenzo, due studenti dell\'Università degli Studi de L\'Aquila.\n ' +
    'Abbiamo realizzato quest\'app per fornire un mezzo semplice e rapido per reperire i dati relativi al Covid.');
  private faq2: FaqModel = new FaqModel('Posso fidarmi dei dati che mostrate?',
    'Certo! I dati vengono presi da una fonte affidabile messa a disposizione dal Dipartimento della Protezione' +
    ' Civile. Noi ci limitiamo a prelevarli e mostrarli.');
  private faq3: FaqModel = new FaqModel('Perché non riesco a visualizzare i dati di oggi? ',
    'L\'app preleva i dati inviati dalla Protezione Civile intorno alle 18:30 di ogni giorno, ma potrebbero sempre esserci dei ritardi e ' +
    'quindi può darsi che non siano ancora stati pubblicati. Ti conviene ricontrollare più tardi!');
  private faq4: FaqModel = new FaqModel('Perché a livello provinciale vedo solo i contagi e non riesco a visualizzare altri dati?',
    'Purtroppo la nostra fonte non ci mette a disposizione altri dati a livello provinciale. ');
  private faq5: FaqModel = new FaqModel('Perché tra i grafici non posso visualizzare dati precedenti al 24/2/2020?',
    'Prima del 24/2/2020 non sono stati raccolti dati.');
  private faqs$=[this.faq1,this.faq2,this.faq3,this.faq4, this.faq5];
*/
  private faqs$: Observable<Faq[]>;
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.faqs$=this.faqService.list();
  }

}
