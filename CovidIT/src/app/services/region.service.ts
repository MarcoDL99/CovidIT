import { REGIONI } from "../model/regione.model";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RegionService{

    constructor(){}

    getNomeRegione(nomeRegione: string): string{
        let s=""
        if (nomeRegione=="Abruzzo"){
            s = REGIONI.ABRUZZO;
          }
          else if (nomeRegione=="Basilicata"){
            s = REGIONI.BASILICATA;
          }
          else if (nomeRegione=="Calabria"){
            s = REGIONI.CALABRIA;
          }
          else if (nomeRegione=="Campania"){
            s = REGIONI.CAMPANIA;
          }
          else if (nomeRegione=="Emilia-Romagna"){
            s = REGIONI.EMILIA_ROMAGNA;
          }
          else if (nomeRegione=="Friuli-Venezia Giulia"){
            s = REGIONI.FRIULI_VENEZIA_GIULIA;
          }
          else if (nomeRegione=="Lazio"){
            s = REGIONI.LAZIO;
          }
          else if (nomeRegione=="Liguria"){
            s = REGIONI.LIGURIA;
          }
          else if (nomeRegione=="Lombardia"){
            s = REGIONI.LOMBARDIA;
          }
          else if (nomeRegione=="Marche"){
            s = REGIONI.MARCHE;
          }
          else if (nomeRegione=="Molise"){
            s = REGIONI.MOLISE;
          }
          else if (nomeRegione=="Piemonte"){
            s = REGIONI.PIEMONTE;
          }
          else if (nomeRegione=="Puglia"){
            s = REGIONI.PUGLIA;
          }
          else if (nomeRegione=="Sardegna"){
            s = REGIONI.SARDEGNA;
          }
          else if (nomeRegione=="Sicilia"){
            s = REGIONI.SICILIA;
          }
          else if (nomeRegione=="Toscana"){
            s = REGIONI.TOSCANA;
          }
          else if (nomeRegione=="Provincia Autonoma di Trento"){
            s = REGIONI.PROVAUT_TRENTO;
          }
          else if (nomeRegione=="Provincia Autonoma di Bolzano"){
            s = REGIONI.PROVAUT_BOLZANO;
          }
          else if (nomeRegione=="Umbria"){
            s = REGIONI.UMBRIA;
          }
          else if (nomeRegione=="Valle d'Aosta"){
            s = REGIONI.VALLE_D_AOSTA;
          }
          else if (nomeRegione=="Veneto"){
            s = REGIONI.VENETO;
          }
          return s;
    }
}
