export class Grafico{
   positivi: number[] = [];
   decessi: number[] = [];
   terapie: number[] = [];
   tamponi: number[] = [];
   giorni: string[] = [];
   dati = [this.positivi,this.decessi,this.terapie,this.tamponi];
}
export const POSITIVI = 'Totale Positivi';
export const TERAPIE_INTENSIVE= 'Occupazione Terapie Intensive';
export const DECESSI= 'Totale Decessi';
export const TAMPONI= 'Tamponi giornalieri';
