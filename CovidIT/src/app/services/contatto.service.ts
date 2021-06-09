import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../constants';
import {Contatto} from '../model/contatto.model';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class ContattoService{
  constructor(private http: HttpClient) {
  }
  list(): Observable<Contatto[]> {
    return this.http.get<Contatto[]>(URL.CONTATTI);
  }
}
