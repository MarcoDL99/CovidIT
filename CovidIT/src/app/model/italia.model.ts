import {NOMI_REGIONI} from './regioni.model';
import { TerritorioModel } from './territorio.model';

export class ItaliaModel implements TerritorioModel{
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
