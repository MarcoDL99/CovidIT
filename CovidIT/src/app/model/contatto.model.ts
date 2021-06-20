import { ContattoComponent } from "./contattoComponent.model";

export class Contatto{
  nomeRegione: string;
  listacontatti: ContattoComponent[];
  constructor(nome: string, contatti?: ContattoComponent[]) {
    this.nomeRegione=nome;
    this.listacontatti=contatti;
  }
}
