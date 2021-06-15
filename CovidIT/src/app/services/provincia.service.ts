import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {URL} from '../constants';
import { Provincia, URL_LATEST_DATA_PROVINCE } from "../model/provincia.model";


@Injectable({
    providedIn: 'root'
  })
  
export class ProvinciaService{

    private dato$: Provincia;

    loadDati(): any{
        //Trasformo l'Observable ritornato dalla richiesta get in una promise perchè viene fatta una sola volta.
        let dataPromise = this.http.get(URL_LATEST_DATA_PROVINCE).toPromise();
        return dataPromise;
      }

    bindDati(nomeProvincia: string){
        this.dato$ = new Provincia();
        this.loadDati().then(data => {
            let provinciaObj = this.getOggettoProvincia(data, nomeProvincia)
            this.dato$.totaleContagi = provinciaObj['totale_casi'];
            let dataUltimoAggiornamento = this.getData(provinciaObj['data']);
            this.dato$.ultimoAggiornamento = dataUltimoAggiornamento;
        })
        return this.dato$;

    }

    getData(dataObj: string): string{
        let dataAmericana = dataObj.substring(0,11);
        let from= dataAmericana;
        let temp = from.split("-");
        let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
        return dataItaliana;

    }

    getOggettoProvincia(arrayProvince: Array<Object>, nomeProvincia: string){
        
        for(let element of arrayProvince){
            if (element['denominazione_provincia']==nomeProvincia){
                return element;
            }
        }
    }


    constructor(private http: HttpClient) {
    }


    

}