import {HttpClient} from '@angular/common/http';
import {URL_BASE, URL_DATE_FROM, URL_DATE_TO, URL_REGION} from '../constants';
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
  //Scarica i dati nell'intervallo di tempo indicato dal sito https://api.covid19tracking.narrativa.com/
   loadDati(nomeTerritorio: string, startDate: string, endDate: string): Promise<any> {
    let sito: string= URL_BASE;
    if(nomeTerritorio!="Italia"){
      sito = URL_REGION + nomeTerritorio;
    }

    let start: string = startDate.substring(0,10);
    if (start[9]==='T'){ start=start.slice(0,-1);}
    let end: string = endDate.substring(0,10);
    if (end[9]==='T'){ end=end.slice(0,-1);}
    sito= sito+URL_DATE_FROM+start+URL_DATE_TO+end;
    
    return this.http.get(sito).toPromise();
  }
 //restituisce un array contenente tutte le date nell'intervallo indicato
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
  //Esegue tutto il procedimento necessario a recuperare i dati per i grafici
   getDati(nomeTerritorio: string, startDate: string, endDate: string) {
    return new Promise(resolve => {
      this.grafico = new Grafico();
      let datiObj={};
      const date: string[] = this.getArrayDate(startDate, endDate);
      //Variabile temporanea che contiene l'array di date
      let temp = date;
      let start;
      let end;
      let finito=false;
      //Array vuoti
      const startDates: string[]= [];
      const endDates: string[] =[];
      //Dal momento che le richieste possono esser fatte 30 giorni alla volta qui si spezzano i giorni di inizio con i giorni
      //di fine, andando a spezzare la data totale richiesta 30 a 30. Si mettono tutte le date iniziali e finali all'interno di
      //due array, cioè startDates e endDates
      while (!finito){
        //Data di inizio
        start=temp[0];
        //Aggiungi la data di inizio a start dates
        startDates.push(start);
        //Se si richiedono più di 30 giorni
        if (temp.length>30){
          //La fine è la trentesima data
          end = temp[30];
          //togli le prime trenta date da temp
          temp=temp.slice(31);
        }
        else {
          //La fine prende l'ultima data di tempo
          end= temp[(temp.length-1)];
          finito=true;
        }
        endDates.push(end);
      }
      //I dati vengono prelevati dal server eseguendo una richiesta ogni trenta giorni, altrimenti il server non riesce a fornirli.
      //Faccio un array di promise
      let promises: Promise<any>[] = [];
      //è necessario spezzare le richieste al server in due gruppi, o non è in grado di gestirle
      //Se la lunghezza delle date finali è maggiore di 10
      if (endDates.length>10){
        for(let i=0; i<11; i++) {
          
          //pusho le promise nell'array di promise
          promises.push(this.loadDati(nomeTerritorio, startDates[i], endDates[i]));
        }
        //The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.
        Promise.all(promises).then(data => {
          for (let k=0; k<data.length; k++) {
            datiObj = (data[k].dates);
            this.bindDati(datiObj, nomeTerritorio);
          }
          promises=[];
          for(let i=11; i<endDates.length; i++) {
            
            promises.push(this.loadDati(nomeTerritorio, startDates[i], endDates[i]));
          }
          Promise.all(promises).then(data2 => {
            for (let k=0; k<data2.length; k++) {
              datiObj = (data2[k].dates);
              this.bindDati(datiObj, nomeTerritorio);
            }
            resolve(this.grafico);  //La resolve si fa dopo aver fatto tutte le richieste necessarie.
          }).catch(() => {
            this.showErrorToast();
          });
        }).catch(() => {
          this.showErrorToast();
        });
      }
      //Avendo poche richieste da fare, si possono fare tutte insieme
      else{
        for(let i=0; i<endDates.length; i++) {
          
          promises.push(this.loadDati(nomeTerritorio, startDates[i], endDates[i]));
        }
        Promise.all(promises).then(data2 => {
          for (let k=0; k<data2.length; k++) {
            datiObj = (data2[k].dates);
            this.bindDati(datiObj, nomeTerritorio);
          }
          resolve(this.grafico);
        }).catch(() => {
          this.showErrorToast();
        });
      }
    });
  }
  //Riempie l'oggetto grafico con i dati scaricati
  bindDati(datiObj: any, nomeTerritorio: string){
    let datiPerGiorno;
    for (let i = 0; i < Object.keys(datiObj).length; i++){
      datiPerGiorno=datiObj[((Object.keys(datiObj))[i])].countries.Italy;
      if(nomeTerritorio!=='Italia'){
        datiPerGiorno= this.findRegione(datiPerGiorno.regions, nomeTerritorio);
        //datiObj = data.dates[datestring].countries.Italy.regions[0];
      }
      this.grafico.giorni.push(this.editGiorno(datiPerGiorno['date']));
      this.grafico.positivi.push(Number.parseInt(datiPerGiorno.today_confirmed, 10));
      this.grafico.decessi.push(Number.parseInt(datiPerGiorno.today_deaths,10));
      this.grafico.tamponi.push(Number.parseInt(datiPerGiorno.today_tests,10));
      this.grafico.terapie.push(Number.parseInt(datiPerGiorno.today_intensive_care,10));
    }
  }
  getGrafico(): Grafico{
    return this.grafico;
  }
  showErrorToast(): void{
    this.toastr.error("C'è stato un errore nel caricamento dei dati, controllare la propria connessione e riprovare.","ERRORE");
  }

  findRegione(arrayRegioni: Array<Object>, nomeRegione: string): any{

    for (let element of arrayRegioni){
      if (element['name']===nomeRegione){
        return element;
      }
    }

  }
  //Modifica la data per scriverla nel formato DD/MM/YYYY
  editGiorno(dataAmericana){
    let temp = dataAmericana.split("-");
    let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
    return dataItaliana;
  }
}
