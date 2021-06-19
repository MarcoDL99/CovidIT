import { Regione, REGIONI } from '../model/regione.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TerritorioService } from './territorio.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Territorio } from '../model/territorio.model';


@Injectable({
  providedIn: 'root'
})
export class RegionService{

  private dato$: Regione;
  private datoVuoto = new Regione();
  

    constructor(private http: HttpClient, private territorioService: TerritorioService){}

    
    loadDati(): any{
      //Trasformo l'Observable ritornato dalla richiesta get in una promise perchè viene fatta una sola volta.
      let todayDate = this.territorioService.getTodayDate()
      let dataPromise = this.http.get('https://api.covid19tracking.narrativa.com/api/' + todayDate + '/country/italy').toPromise()
      return dataPromise;
    }


    bindDati(nomeRegione: string): any{
      

      
      let todayString = this.territorioService.getTodayDate();

      
      this.dato$=new Regione();{
        this.loadDati().then(data =>{
          let arrayRegioni = data['dates'][todayString]['countries']['Italy']['regions'];
          let regionDatiObj = this.getOggettoRegione(arrayRegioni, nomeRegione);
          this.dato$.nuovi_decessi = regionDatiObj.today_new_deaths;
          this.dato$.nuovi_positivi = regionDatiObj.today_new_confirmed;
          this.dato$.nuovi_terapia_intensiva = regionDatiObj.today_new_intensive_care;
          this.dato$.nuovi_tamponi = regionDatiObj.today_new_tests;
          this.dato$.totale_decessi = regionDatiObj.today_deaths;
          this.dato$.totale_positivi = regionDatiObj.today_confirmed;
          this.dato$.totale_terapia_intensiva = regionDatiObj.today_intensive_care;
          this.dato$.totale_tamponi = regionDatiObj.today_tests;
          let dataAmericana = regionDatiObj.date;
          let from= dataAmericana;
          let temp = from.split("-");
          let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
          this.dato$.ultimo_aggiornamento = dataItaliana;
        })
        .catch(() =>{
          this.territorioService.showErrorToast();
        });
      }
    
      return this.dato$;
    }
    

    getOggettoRegione(arrayRegioni: Array<Object>, nomeRegione: string): any{
      
      for (let element of arrayRegioni){
        if (element['name']==nomeRegione){
          return element;
        }
      }

    }


    getNomeRegione(nomeRegione: string): string{
        let s=""
        if (nomeRegione=="Abruzzo"){
            s = REGIONI.ABRUZZO;
          }
          else if (nomeRegione=="Basilicata"){
            s = REGIONI.BASILICATA;
          }
          else if (nomeRegione=="Calabria"){
            s = REGIONI.CALABRIA;
          }
          else if (nomeRegione=="Campania"){
            s = REGIONI.CAMPANIA;
          }
          else if (nomeRegione=="Emilia-Romagna"){
            s = REGIONI.EMILIA_ROMAGNA;
          }
          else if (nomeRegione=="Friuli Venezia Giulia"){
            s = REGIONI.FRIULI_VENEZIA_GIULIA;
          }
          else if (nomeRegione=="Lazio"){
            s = REGIONI.LAZIO;
          }
          else if (nomeRegione=="Liguria"){
            s = REGIONI.LIGURIA;
          }
          else if (nomeRegione=="Lombardia"){
            s = REGIONI.LOMBARDIA;
          }
          else if (nomeRegione=="Marche"){
            s = REGIONI.MARCHE;
          }
          else if (nomeRegione=="Molise"){
            s = REGIONI.MOLISE;
          }
          else if (nomeRegione=="Piemonte"){
            s = REGIONI.PIEMONTE;
          }
          else if (nomeRegione=="Puglia"){
            s = REGIONI.PUGLIA;
          }
          else if (nomeRegione=="Sardegna"){
            s = REGIONI.SARDEGNA;
          }
          else if (nomeRegione=="Sicilia"){
            s = REGIONI.SICILIA;
          }
          else if (nomeRegione=="Toscana"){
            s = REGIONI.TOSCANA;
          }
          else if (nomeRegione == "Trentino-Alto Adige"){
            s = REGIONI.TRENTINO;
          }
          else if (nomeRegione=="P.A. Trento"){
            s = REGIONI.PROVAUT_TRENTO;
          }
          else if (nomeRegione=="P.A. Bolzano"){
            s = REGIONI.PROVAUT_BOLZANO;
          }
          else if (nomeRegione=="Umbria"){
            s = REGIONI.UMBRIA;
          }
          else if (nomeRegione=="Valle d'Aosta"){
            s = REGIONI.VALLE_D_AOSTA;
          }
          else if (nomeRegione=="Veneto"){
            s = REGIONI.VENETO;
          }
          return s;
    }


}
