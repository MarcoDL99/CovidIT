import { Component, OnInit } from '@angular/core';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GoogleChartInterface} from 'ng2-google-charts';
import {Grafico, DECESSI, TERAPIE_INTENSIVE, TAMPONI, POSITIVI} from '../../model/grafico.model';
import {GraficoService} from '../../services/grafico.service';
import React from 'react';
import { Line } from 'react-chartjs-2';

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.page.html',
  styleUrls: ['./grafici.page.scss'],
})
export class GraficiPage implements OnInit {
private titoli = [POSITIVI,DECESSI,TERAPIE_INTENSIVE,TAMPONI];
  private PRIMOGIORNO ='2021-06-10T23:39:03.342+02:00'; //'2020-02-24T23:39:03.342+02:00'
  private oggi: string;
  private startDate: string;
  private endDate: string;
  private sourceType: any;
  private graficiPronti= false;
  private chartCasi: GoogleChartInterface;
  private chartDecessi: GoogleChartInterface;
  private chartTerapie: GoogleChartInterface;
  private chartTamponi: GoogleChartInterface;

  private grafici: Grafico[];
  private charts$: GoogleChartInterface[];
  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute,
              private graficoService: GraficoService) {}
  ngOnInit() {
    this.startDate = this.PRIMOGIORNO;
    this.oggi= new Date().toISOString();
    let ieri: Date = new Date();
    ieri.setDate(new Date().getDate()-1);
    this.endDate = ieri.toISOString();
    this.charts$= [this.chartCasi, this.chartDecessi, this.chartTerapie, this.chartTamponi];
    const data = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const LineChart = () => (
      <>
        <div className='header'>
      <h1 className='title'>Line Chart</h1>
    <div className='links'>
    <a
      className='btn btn-gh'
    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
      >
      Github Source
    </a>
    </div>
    </div>
    <Line data={data} options={options} />
    </>
  );

    for (let i = 0; i <= 3; i++){
      this.charts$[i]= {
        chartType: 'LineChart',
        dataTable:  [[0,0],[1,1]],
        firstRowIsData: true,
        options: {
          legend: 'none',
          colors: ['black'],
          backgroundColor: {},
          title: this.titoli[i],
          chartArea: {left: '15%', width: '64.5%', backgroundColor: {stroke: '#F1B739', strokeWidth: 2}},
          crosshair: {trigger: 'selection',}, //serve per mostrare i dati quando si seleziona un punto
          forceIFrame: 'true'//Serve per togliere l'ombra sotto il grafico.
        }
      };}
      this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.sourceType = this.router.getCurrentNavigation().extras.state.sourceData;
        console.log(this.sourceType);
      }
    });
  }
  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }
  doRefresh(){
     this.grafici=this.graficoService.getDati(this.sourceType,this.startDate,this.endDate);
    for (let i = 0; i < 4; i++){
      /*
      this.charts$[i]={
          chartType: 'LineChart',
          dataTable:  this.grafici[i].dati,
          firstRowIsData: true,
          options: {
            legend: 'none',
            colors: ['black'],
            backgroundColor: {},
            title: this.titoli[i],
            chartArea: {left: '15%', width: '64.5%', backgroundColor: {stroke: '#F1B739', strokeWidth: 2}},
            crosshair: {trigger: 'selection',}, //serve per mostrare i dati quando si seleziona un punto
            forceIFrame: 'true'//Serve per togliere l'ombra sotto il grafico.
          }
        };
      this.graficiPronti=true;
      console.log(this.charts$[i].dataTable);
      this.charts$[i].component.draw(this.charts$[i]);*/
    }
  }



}
