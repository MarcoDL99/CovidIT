import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from '../constants';
import { Territorio } from "../model/territorio.model";
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class TerritorioService{




    constructor(private toastr: ToastrService) {
    }


    //Funzione che ottiene la data odierna per la richiesta alle API
    getTodayDate(): string{
      let today = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Rome"}));
      if (today.getHours()<10){
        today.setDate(today.getDate() - 1);
      }
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      

      let todayString: any;
      todayString = yyyy + '-' + mm + '-' + dd;
      return todayString;
    }

    //funzione per mostrare un toast di errore in caso di fallimento di caricamento dei dati
    showErrorToast(): void{
      this.toastr.error("C'è stato un errore nel caricamento dei dati, controllare la propria connessione e riprovare.","ERRORE");
    }

    

    

    

}
