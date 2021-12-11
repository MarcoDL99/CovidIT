import {Component, OnInit} from '@angular/core';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Grafico, DECESSI, TERAPIE_INTENSIVE, TAMPONI, POSITIVI, NPOSITIVI, NDECESSI, NTERAPIE_INTENSIVE} from '../../model/grafico.model';
import {GraficoService} from '../../services/grafico.service';
import * as HighCharts from 'highcharts';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.page.html',
  styleUrls: ['./grafici.page.scss'],
})
export class GraficiPage implements OnInit {
  private positiviID = 'positiviChart';
  private decessiID = 'decessiChart';
  private terapieID = 'terapieChart';
  private tamponiID = 'tamponiChart';
  private npositiviID = 'npositiviChart';
  private ndecessiID = 'ndecessiChart';
  private nterapieID = 'nterapieChart';
  private charts$ = [this.npositiviID, this.positiviID, this.ndecessiID,
    this.decessiID, this.nterapieID,this.terapieID, this.tamponiID];
  private titoli$ = [NPOSITIVI, POSITIVI, NDECESSI, DECESSI, NTERAPIE_INTENSIVE,TERAPIE_INTENSIVE, TAMPONI];
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
  private chartNPositivi: HighCharts.Chart;
  private chartNDecessi: HighCharts.Chart;
  private chartNTerapie: HighCharts.Chart;
  private charts: HighCharts.Chart[];
  private grafico: Grafico;
  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute,
              private graficoService: GraficoService,
              private toastr: ToastrService,
              ) {
  }

  createChart() {
    this.hidden = false;
    for (let i = 0; i < this.grafico.dati.length; i++) {
      this.charts[i] = HighCharts.chart((this.charts$[i]), {
        chart: {
          type: 'line',
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
        tooltip:{
          pointFormat: '<b>{point.y}</b><br>'
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
            color: '#000914',
            lineColor: '#000914',
            lineWidth: 3,
          },
          data: this.grafico.dati[i],
          color: '#000914',
          pointWidth: 8,
          opacity: 1
        }]
      });
    }

  }


  ngOnInit() {
    this.charts=[this.chartNPositivi,this.chartPositivi,this.chartNDecessi,
      this.chartDecessi,this.chartNTerapie,this.chartTerapie,this.chartTamponi];
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
    this.createChart();
  }

  async getDati(){
    this.showDownloadToast();
      await this.graficoService.getDati(this.sourceType, this.startDate, this.endDate);
      this.grafico=this.graficoService.getGrafico();
  }
  showDownloadToast(): void{
    if (((Date.parse(this.startDate)) > Date.parse(this.endDate)) && (this.startDate!==this.endDate)) {
      this.toastr.error("Inserire un intervallo temporale valido.");
    }
    else {
        if (this.startDate && this.endDate) {
          this.toastr.info("Download in corso");
        }
        else {
          this.toastr.error("Per favore selezionare le date.",'ERRORE');
        }
    }
  }
}

