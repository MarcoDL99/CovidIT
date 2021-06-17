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


    getTodayDate(): string{
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      let todayString: any;
      todayString = yyyy + '-' + mm + '-' + dd;
      return todayString;
    }

    showErrorToast(): void{
      this.toastr.error("C'è stato un errore nel caricamento dei dati, controllare la propria connessione e riprovare.","ERRORE");
    }

    

    

    

}
