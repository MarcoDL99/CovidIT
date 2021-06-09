import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Faq} from '../model/faq.model';
import {URL} from '../constants';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class FaqService{
  constructor(private http: HttpClient) {
  }
  list(): Observable<Faq[]> {
    return this.http.get<Faq[]>(URL.FAQ);
  }
}
