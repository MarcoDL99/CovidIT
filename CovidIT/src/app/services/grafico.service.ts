import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../constants';
import {Injectable} from "@angular/core";
import {Grafico} from "../model/grafico.model";

@Injectable({
    providedIn: 'root'
})


export class GraficoService{
  constructor(private http: HttpClient) {
  }
  getDati(nomeTerritorio: string, nomeDati: string, startDate: string, endDate: string): Observable<Grafico[]> {
    return this.http.get<Grafico[]>(URL.TERRITORIO+'/'+nomeTerritorio+'/' + nomeDati+'/' + startDate+'/' + endDate);
    //vedere come realizzare la url
  }
}
