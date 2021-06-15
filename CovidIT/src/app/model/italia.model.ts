
import {NOMI_REGIONI} from './regione.model';
import {Territorio} from './territorio.model';

export class Italia implements Territorio{
  totale_positivi: number;
  nuovi_positivi: number;
  totale_terapia_intensiva: number;
  nuovi_terapia_intensiva: number;
  totale_decessi: number;
  nuovi_decessi: number;
  totale_tamponi: number;
  nuovi_tamponi: number;
  ultimo_aggiornamento: string;
  regioni: string[] = NOMI_REGIONI;
}

export const URL_LATEST_DATA_ITALY = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json';
