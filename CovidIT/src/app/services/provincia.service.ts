import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from '../constants';


export class ProvinciaService{


    constructor(private http: HttpClient) {
    }

    //Restituisce i contagi della provincia selezionata
    loadContagi(provincia: string): Observable<number[]>{
        return this.http.get<number[]>(URL.PROVINCE + "/" + provincia);

    }

}