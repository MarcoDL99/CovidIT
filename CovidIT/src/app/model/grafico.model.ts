export class Grafico{
   positivi: number[] = [];
   nuoviPositivi: number[] = [];
   decessi: number[] = [];
   nuoviDecessi: number[] = [];
   terapie: number[] = [];
   nuoviTerapie: number[] = [];
   tamponi: number[] = [];

  giorni: string[] = [];
  dati = [this.nuoviPositivi,this.positivi,this.nuoviDecessi,this.decessi,this.nuoviTerapie,this.terapie,  this.tamponi] ;
}
export const POSITIVI = 'Totale Positivi';
export const TERAPIE_INTENSIVE= 'Occupazione Terapie Intensive';
export const DECESSI= 'Totale Decessi';
export const NPOSITIVI = 'Variazione Giornaliera Positivi';
export const NTERAPIE_INTENSIVE= 'Variazione Giornaliera Terapie Intensive';
export const NDECESSI= 'Variazione Giornaliera Decessi';
export const TAMPONI= 'Tamponi giornalieri';
