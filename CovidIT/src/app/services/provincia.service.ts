import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {URL} from '../constants';
import { ProvinciaModel } from "../model/provincia.model";


@Injectable({
    providedIn: 'root'
  })
  
export class ProvinciaService{


    constructor(private http: HttpClient) {
    }

    //Restituisce i contagi della provincia selezionata
    loadContagi(provincia: string): Observable<ProvinciaModel>{
        return this.http.get<ProvinciaModel>(URL.PROVINCE + "/" + provincia);

    }

    

}