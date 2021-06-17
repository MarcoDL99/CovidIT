import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {URL} from '../constants';
import { Provincia, URL_LATEST_DATA_PROVINCE } from "../model/provincia.model";
import { TerritorioService } from "./territorio.service";


@Injectable({
    providedIn: 'root'
  })
  
export class ProvinciaService{

    private dato$ = new Provincia();

    constructor(private http: HttpClient, private territorioService: TerritorioService) {
    }

    /*
    Funzione che esegue la richiesta http alle api per i dati e li trasforma in una promise catturata da bindDati()
    */
    loadDati(): any{
        //Trasformo l'Observable ritornato dalla richiesta get in una promise perchè viene fatta una sola volta.
        let dataPromise = this.http.get(URL_LATEST_DATA_PROVINCE).toPromise();
        return dataPromise;
      }
      
      /*
    Funzione che serve a restituire i dati scaricati alla page
    */
    bindDati(nomeProvincia: string){
        this.loadDati().then(data => {
            let provinciaObj = this.getOggettoProvincia(data, nomeProvincia);
            this.dato$.totaleContagi = provinciaObj['totale_casi'];
            let dataUltimoAggiornamento = this.getData(provinciaObj['data']);
            this.dato$.ultimoAggiornamento = dataUltimoAggiornamento;
        })
        .catch(()=>{
          this.territorioService.showErrorToast();
          });

        return this.dato$;

        

    }

    getData(dataObj: string): string{
        let dataAmericana = dataObj.substring(0,10);
        let from= dataAmericana;
        let temp = from.split("-");
        let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
        return dataItaliana;

    }

    //Funzione che prende in ingresso l'array restituito dalle api e ne restituisce l'oggetto che corrisponde alla provincia passata
    getOggettoProvincia(arrayProvince: Array<Object>, nomeProvincia: string){
        
        for(let element of arrayProvince){
            if (element['denominazione_provincia']==nomeProvincia){
                return element;
            }
        }
    }




    

}