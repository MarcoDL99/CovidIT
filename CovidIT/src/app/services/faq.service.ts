import {Faq} from '../model/faq.model';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FaqService{
  constructor() {
  }
  list(): Faq[] {
   let faq1: Faq= new Faq('Chi siamo',
      'Ciao, siamo Marco e Lorenzo, due studenti dell\'Università degli Studi dell\'Aquila.\n ' +
      'Abbiamo realizzato quest\'app per fornire un mezzo semplice e rapido per reperire i dati relativi al Covid.');
   let faq2: Faq = new Faq('Posso fidarmi dei dati che mostrate?',
      'Certo! I dati vengono presi da una fonte affidabile messa a disposizione dal Dipartimento della Protezione' +
      ' Civile. Noi ci limitiamo a prelevarli e mostrarli.');
   let faq3: Faq = new Faq('Perché non riesco a visualizzare i dati di oggi? ',
      'La Protezione Civile pubblica i dati intorno alle 18:30 di ogni giorno, ma potrebbero sempre esserci ' +
     'dei ritardi e quindi può darsi che non siano ancora stati pubblicati. Ti conviene ricontrollare più tardi!');
   let faq4: Faq = new Faq('Perché a livello provinciale vedo solo i contagi e non riesco a visualizzare altri dati?',
      'Purtroppo la nostra fonte non ci mette a disposizione altri dati a livello provinciale. ');
   let faq5: Faq = new Faq('Perché tra i grafici non posso visualizzare dati precedenti al 24/2/2020?',
      'Prima del 24/2/2020 non sono stati raccolti dati.');
   let faqs=[faq1,faq2,faq3,faq4, faq5];
  return faqs;
  }
}
