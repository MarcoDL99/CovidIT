import { Component, OnInit } from '@angular/core';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GoogleChartInterface} from "ng2-google-charts";
import {Grafico, CASI, DECESSI, TERAPIE_INTENSIVE, TAMPONI} from "../../model/grafico.model";
import {GraficoService} from "../../services/grafico.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.page.html',
  styleUrls: ['./grafici.page.scss'],
})
export class GraficiPage implements OnInit {

  private PRIMOGIORNO ='2020-02-24T23:39:03.342+02:00';
  private oggi: string;
  private startDate: string;
  private endDate: string;
  private sourceType: any;
  private graficoCasi: Observable<Grafico[]>;
  private graficoDecessi: Observable<Grafico[]>;
  private graficoTerapie: Observable<Grafico[]>;
  private graficoTamponi: Observable<Grafico[]>;
  private chartCasi: GoogleChartInterface;
  private chartDecessi: GoogleChartInterface;
  private chartTerapie: GoogleChartInterface;
  private chartTamponi: GoogleChartInterface;
  private grafici: Observable<Grafico[]>[];
  private charts$: GoogleChartInterface[];
  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute,
              private graficoService: GraficoService) {}
  ngOnInit() {
    this.startDate = this.PRIMOGIORNO;
    this.oggi= new Date().toISOString();
    this.endDate = this.oggi;
    this.grafici= [this.graficoCasi, this.graficoDecessi,this.graficoTerapie,this.graficoTamponi];
    this.charts$= [this.chartCasi, this.chartDecessi, this.chartTerapie, this.chartTamponi];
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.sourceType = this.router.getCurrentNavigation().extras.state.sourceData;
        console.log(this.sourceType);
      }
    });
    this.doRefresh();
  }
  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }
  doRefresh(){//Nota: Controllare come deve arrivare la data al server
    this.grafici[0]=this.graficoService.getDati(this.sourceType,CASI,this.startDate,this.endDate);
    this.grafici[1]=this.graficoService.getDati(this.sourceType,DECESSI,this.startDate,this.endDate);
    this.grafici[2]=this.graficoService.getDati(this.sourceType,TERAPIE_INTENSIVE,this.startDate,this.endDate);
    this.grafici[3]=this.graficoService.getDati(this.sourceType,TAMPONI,this.startDate,this.endDate);
    for (let i = 0; i < 4; i++){
      let datiChart: any;
      let titolo: string;
      this.grafici[i].subscribe((dati: any)=> datiChart=dati); //Devi prendere i dati dal database
      this.grafici[i].subscribe((nomeDato: any)=> titolo=nomeDato);
      this.charts$[i]={
        chartType: 'LineChart',
        dataTable: datiChart, //Devi prendere i dati dal database
        firstRowIsData: true,
        options: {
          legend: 'none',
          colors:['black'],
          backgroundColor: {},
          title: titolo, //Prendi il titolo dal database
          chartArea: {left:'15%', width: '64.5%', backgroundColor: {stroke: '#F1B739', strokeWidth: 2}},
          crosshair: {trigger: 'selection',}, //serve per mostrare i dati quando si seleziona un punto
          forceIFrame: 'true',//Serve per togliere l'ombra sotto il grafico.
        },
      };
    }
  }



}
