import {Contatto, ContattoComponent} from '../model/contatto.model';
import {Injectable} from "@angular/core";
import {
  ABRUZZO,  BASILICATA,  CALABRIA,  CAMPANIA,  EMILIA_ROMAGNA,  FRIULI_VENEZIA_GIULIA,  LAZIO,  LIGURIA,  LOMBARDIA,  MARCHE,
  MOLISE,  PIEMONTE,  PROVAUT_BOLZANO,  PROVAUT_TRENTO,  PUGLIA,  SARDEGNA,  SICILIA,  TOSCANA, UMBRIA, VALLE_D_AOSTA, VENETO
} from "../model/regione.model";

@Injectable({
    providedIn: 'root'
})


export class ContattoService{
  constructor() {
  }
  list(): Contatto[] {
    let contacts: Contatto[];
    let abruzzo: Contatto = new Contatto(ABRUZZO, [new ContattoComponent('Numero Verde Regionale','800 595 459','numero')]);
    let basilicata: Contatto = new Contatto(BASILICATA, [new ContattoComponent('Numero Verde Regionale','800 595 459','numero')]);
    let calabria: Contatto = new Contatto(CALABRIA, [new ContattoComponent('Numero Verde Regionale','800 841 289','numero'),
      new ContattoComponent('Informazioni piano vaccinale','0961 789775','numero')]);
    let campania: Contatto = new Contatto(CAMPANIA, [new ContattoComponent('Numero Verde Regionale','800 909 699','numero')]);
    let emiliaRomagna: Contatto = new Contatto( EMILIA_ROMAGNA, [new ContattoComponent('Numero Verde Regionale','800 033 033','numero')]);
    let friuliVeneziaGiulia: Contatto = new Contatto(FRIULI_VENEZIA_GIULIA,
      [new ContattoComponent('Numero Verde Regionale','800 909 060','numero')]);
    let lazio: Contatto = new Contatto(LAZIO, [new ContattoComponent('Numero Verde Regionale','800 118 800','numero')]);
    let liguria: Contatto = new Contatto(LIGURIA, [new ContattoComponent('Contatto e-mail','sonoinliguria@regione.liguria.it','mail')]);
    let lombardia: Contatto = new Contatto(LOMBARDIA, [new ContattoComponent('Numero Verde Regionale','800 894 545','numero')]);
    let marche: Contatto = new Contatto(MARCHE, [new ContattoComponent('Numero Verde Regionale','800 936 677','numero')]);
    let molise: Contatto = new Contatto(MOLISE, [new ContattoComponent('Contatto e-mail','coronavirus@asrem.org','mail')]);
    let piemonte: Contatto = new Contatto(PIEMONTE, [new ContattoComponent('Numero Verde Regionale','800 957 795','numero'),
      new ContattoComponent('Numero Verde Regionale','800 333 444','numero')]);
    let provBolzano: Contatto = new Contatto(PROVAUT_BOLZANO, [new ContattoComponent('Non Disponibili','','')]);
    let provTrento: Contatto = new Contatto(PROVAUT_TRENTO, [new ContattoComponent('Numero Verde Regionale','800 867 388','numero')]);
    let puglia: Contatto = new Contatto(PUGLIA, [new ContattoComponent('Numero Verde Regionale','800 713 931','numero')]);
    let sardegna: Contatto = new Contatto(SARDEGNA, [new ContattoComponent('Informazioni Sanitarie','800 311 377','numero'),
      new ContattoComponent('Protezione Civile','800 894 530','numero'),
      new ContattoComponent('Viaggiatori in ingresso','800 180 977','numero'),
      new ContattoComponent('Viaggiatori in ingresso','urp.emergenza@regione.sardegna.it','mail')]);
    let sicilia: Contatto = new Contatto(SICILIA, [new ContattoComponent('Numero Verde Regionale','800 458 787','numero')]);
    let toscana: Contatto = new Contatto(TOSCANA, [new ContattoComponent('Numero Verde Regionale','055 90 77 77 7','numero')]);
    let umbria: Contatto = new Contatto(UMBRIA, [new ContattoComponent('Numero Verde Regionale','800 636 363','numero')]);
    let valdAosta: Contatto = new Contatto(VALLE_D_AOSTA, [new ContattoComponent('Numero Verde Regionale','800 122 121','numero')]);
    let veneto: Contatto = new Contatto(VENETO, [new ContattoComponent('Numero Verde Regionale','800 462 340','numero')]);
    contacts =[abruzzo, basilicata, calabria, campania, emiliaRomagna, friuliVeneziaGiulia, lazio, liguria,
      lombardia, marche, molise,piemonte,provBolzano,provTrento,puglia,sardegna,sicilia,toscana,umbria,valdAosta,veneto];
    return contacts;
  }
}
