import {Component, OnInit, ViewChild} from '@angular/core';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GoogleChartInterface} from 'ng2-google-charts';
import {Grafico, DECESSI, TERAPIE_INTENSIVE, TAMPONI, POSITIVI} from '../../model/grafico.model';
import {GraficoService} from '../../services/grafico.service';
import * as HighCharts from 'highcharts';
import {IonLoaderService} from "../../Utilty/GraphLoaderNotification/ion-loader.service";
import {waitForAsync} from "@angular/core/testing";
import {URL_BASE, URL_DATE_FROM, URL_DATE_TO} from "../../constants";
import {HttpClient} from "@angular/common/http";
import {resolve} from "chart.js/helpers";

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.page.html',
  styleUrls: ['./grafici.page.scss'],
})
export class GraficiPage implements OnInit {
  private positiviChart = 'positiviChart';
  private decessiChart = 'decessiChart';
  private terapieChart = 'terapieChart';
  private tamponiChart = 'tamponiChart';
  private charts$ = [this.positiviChart, this.decessiChart, this.terapieChart, this.tamponiChart];
  private titoli$ = [POSITIVI, DECESSI, TERAPIE_INTENSIVE, TAMPONI];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private PRIMOGIORNO = '2020-02-24T23:39:03.342+02:00';
  private oggi: string;
  private startDate: string;
  private endDate: string;
  private sourceType: any;
  private hidden = true;
  private chartPositivi: HighCharts.Chart;
  private chartDecessi: HighCharts.Chart;
  private chartTerapie: HighCharts.Chart;
  private chartTamponi: HighCharts.Chart;
  private charts: HighCharts.Chart[];
  private grafico: Grafico;

  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute,
              private graficoService: GraficoService,
              private ionLoaderService: IonLoaderService,
              private http: HttpClient) {
  }

  createChart() {
    this.hidden = false;
    for (let i = 0; i <= 3; i++) {
      this.chartPositivi = HighCharts.chart((this.charts$[i]), {
        chart: {
          type: 'area',
          backgroundColor: '#FFFFFF',
        },
        plotOptions: {
          scatter: {
            lineWidth: 2
          }
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: this.grafico.giorni,
          showEmpty: true
        },
        yAxis: {
          title: {
            text: ''
          },
          showEmpty: true
        },
        legend: {
          enabled: false
        },
        series: [{
          type: undefined,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2,
            color: '#ff0000',
            lineColor: '#ff0000',
            lineWidth: 3,
          },
          data: this.grafico.dati[i],
          color: '#ff0000',
          pointWidth: 8,
          opacity: 1
        }]
      });
    }

  }


  ngOnInit() {
    this.charts=[this.chartPositivi,this.chartDecessi,this.chartTerapie,this.chartTamponi];
    this.startDate = this.PRIMOGIORNO;
    this.oggi = new Date().toISOString();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.sourceType = this.router.getCurrentNavigation().extras.state.sourceData;
        console.log(this.sourceType);
      }
    });
  }

  createMenu(event: Event) {
    this.popover.create({event, component: PopovermenuPage, showBackdrop: false}).then((popoverElement) => {
      popoverElement.present();
    });
  }

  async doRefresh() {
    await this.getDati();
    console.log(this.grafico);
    this.createChart();
  }

  async getDati(){
      let grafico=new Grafico();
      await this.graficoService.getDati(this.sourceType, this.startDate, this.endDate);

      this.grafico=this.graficoService.getGrafico();

  }
}
