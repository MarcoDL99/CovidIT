export class Grafico{
   positivi: number[] = [];
   decessi: number[] = [];
   terapie: number[] = [];
   tamponi: number[] = [];
   giorni: string[] = [];
   dati = [this.positivi,this.decessi,this.terapie,this.tamponi];
}
export const POSITIVI = 'Nuovi Casi';
export const TERAPIE_INTENSIVE= 'Terapie Intensive';
export const DECESSI= 'Decessi';
export const TAMPONI= 'Tamponi';
