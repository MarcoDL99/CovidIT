import {HttpClient} from '@angular/common/http';
import {URL, URL_BASE, URL_DATE_FROM, URL_DATE_TO} from '../constants';
import {Injectable} from '@angular/core';
import {Grafico} from '../model/grafico.model';
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})


export class GraficoService{
  private grafico: Grafico;
  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }
   loadDati(nomeTerritorio: string, startDate: string, endDate: string): Promise<any> {
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
    return this.http.get(sito).toPromise();
  }

  getArrayDate(startDate, endDate): string[]{
    const dates: string[] = [];
      let currentDate = new Date(startDate);
      const addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
       const end= new Date(endDate);
      end.setDate(end.getDate()+1);
    while (currentDate <= end) {
      dates.push(currentDate.toISOString());
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

   getDati(nomeTerritorio: string, startDate: string, endDate: string) {
    return new Promise(resolve => {
      this.grafico = new Grafico();
      let datiObj;
      let datiPerGiorno;
      this.loadDati(nomeTerritorio, startDate, endDate).then(data =>{
        const date: string[] = this.getArrayDate(startDate, endDate);
        if(nomeTerritorio==='italia'){
          datiObj = data.dates;
        }
        else{
          //datiObj = data.dates[datestring].countries.Italy.regions[0];
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        this.grafico=this.bindDati(datiObj,date);
        resolve(this.grafico);
      }).catch(()=>{
        this.showErrorToast();
      });
    });
  }
  bindDati(datiObj: any, giorni: string[] ){
    let datiPerGiorno;
    const grafico: Grafico = new Grafico();
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < giorni.length; i++){
      let datestring = giorni[i].slice(0,10);
      if (datestring[9]==='T'){ datestring=datestring.slice(0,-1);}
      datiPerGiorno=datiObj[datestring].countries.Italy;
      grafico.giorni.push(datiPerGiorno['date']);
      grafico.positivi.push(Number.parseInt(datiPerGiorno.today_new_confirmed, 10));
      grafico.decessi.push(Number.parseInt(datiPerGiorno.today_new_deaths,10));
      grafico.tamponi.push(Number.parseInt(datiPerGiorno.today_new_tests,10));
      grafico.terapie.push(Number.parseInt(datiPerGiorno.today_new_intensive_care,10));
    }
    if (grafico.giorni[-1]===grafico.giorni[-2]){
      grafico.giorni.pop();
      grafico.positivi.pop();
      grafico.decessi.pop();
      grafico.tamponi.pop();
      grafico.terapie.pop();
    }
    return grafico;
  }
  getGrafico(): Grafico{
    return this.grafico;
  }
  showErrorToast(): void{
    this.toastr.error("C'è stato un errore nel caricamento dei dati, controllare la propria connessione e riprovare.","ERRORE");
  }
}
