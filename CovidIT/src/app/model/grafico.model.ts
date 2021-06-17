export class Grafico{
   _nomeDato: string;
   _dati: [] =[];

  get nomeDato(): string {
    return this._nomeDato;
  }

  get dati(): any {
    return this._dati;
  }
}
export const POSITIVI = 'Nuovi Casi';
export const TERAPIE_INTENSIVE= 'Terapie Intensive';
export const DECESSI= 'Decessi';
export const TAMPONI= 'Tamponi';
