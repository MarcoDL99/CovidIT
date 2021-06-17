import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL, URL_BASE, URL_DATE_FROM, URL_DATE_TO} from '../constants';
import {Injectable} from '@angular/core';
import {Grafico} from '../model/grafico.model';
import {Italia} from '../model/italia.model';

@Injectable({
    providedIn: 'root'
})


export class GraficoService{
  constructor(private http: HttpClient) {
  }

  async loadDati(nomeTerritorio: string, startDate: string, endDate: string): Promise<any> {
    let sito: string= URL_BASE;
   // if(nomeTerritorio!=='italia') {
   //   sito = sito + URL.REGION;
      //AGGIUNGI REGIONE
    //    }

    let start: string = startDate.substring(0,10);
    if (start[9]==='T'){ start=start.slice(0,-1);}
    let end: string = endDate.substring(0,10);
    if (end[9]==='T'){ end=end.slice(0,-1);}
    sito= sito+URL_DATE_FROM+start+URL_DATE_TO+end;
    console.log(sito);
    //Trasformo l'Observable ritornato dalla richiesta get in una promise perchè viene fatta una sola volta.
    const dataPromise = await this.http.get(sito).toPromise();
    return dataPromise;
  }

  getArrayDate(startDate, endDate): string[]{
    const dates: string[] = [];
      let currentDate = new Date(startDate);
      const addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString());
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  getDati(nomeTerritorio: string, startDate: string, endDate: string): any {
    const grafici: Grafico[] = [new Grafico(),new Grafico(), new Grafico(), new Grafico()];
    let datiObj;
    let datiPerGiorno;
    this.loadDati(nomeTerritorio, startDate, endDate).then(data =>{
      const dates: string[] = this.getArrayDate(startDate, endDate);
      if(nomeTerritorio==='italia'){
        datiObj = data.dates;
      }
      else{
        //datiObj = data.dates[datestring].countries.Italy.regions[0];
      }
      for (let i = 0; i < dates.length; i++){
        let datestring = dates[i].slice(0,10);
        if (datestring[9]==='T'){ datestring=datestring.slice(0,-1);}
        datiPerGiorno=datiObj[datestring].countries.Italy;
        grafici[0].dati.push([datestring, datiPerGiorno.today_new_confirmed]);
        grafici[1].dati.push([datestring, datiPerGiorno.today_new_deaths]);
        grafici[2].dati.push([datestring, datiPerGiorno.today_new_tests]);
        grafici[3].dati.push([datestring, datiPerGiorno.today_new_intensive_care]);
      }
    });
    return grafici;
  }
}
