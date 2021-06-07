export class Contatto{
  nomeRegione: string;
  listacontatti: ContattoComponent[];
  constructor(nome: string, contatti?: ContattoComponent[]) {
    this.nomeRegione=nome;
    this.listacontatti=contatti;
  }
}
export class ContattoComponent{
  nomecontatto: string;
  contatto: string;
  tipologiaContatto: string; // 'mail' oppure 'numero'
  constructor(nome: string, contatto: string, tipologiaContatto: string) {
    this.nomecontatto=nome;
    this.contatto=contatto;
    this.tipologiaContatto=tipologiaContatto;
  }
}
