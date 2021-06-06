
import {NOMI_REGIONI} from './regione.model';
export class Italia implements Territorio{
  nuoviDecessi: number;
  nuoviPositivi: number;
  nuoviTamponi: number;
  nuoviTerapieIntensive: number;
  totDecessi: number;
  totPositivi: number;
  totTamponi: number;
  totTerapieIntensive: number;
  regioni: string[] = NOMI_REGIONI;
  ultimoAggiornamento: string;
}
