import { Component, OnInit } from '@angular/core';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GoogleChartInterface} from "ng2-google-charts";
//import {URL_BASE, URL, URL_FROM_PART, URL_TO_PART} from '../../constants';

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.page.html',
  styleUrls: ['./grafici.page.scss'],
})
export class GraficiPage implements OnInit {

  private startDate: any;
  private endDate: any;
  private sourceType: any;
  private chart: GoogleChartInterface;
  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.startDate = '2020-02-24T23:39:03.342+02:00';
    this.endDate = new Date().toISOString();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.sourceType = this.router.getCurrentNavigation().extras.state.sourceData;
        console.log(this.sourceType);
      }
    });
    //this.getData();
    this.chart = {
      chartType: 'LineChart',
      dataTable: [
        [, 3 ],
        [, 0],
        [, 789],
        [, 711]
      ],
      firstRowIsData: true,
      options: {
        legend: 'none',
        title: '', // Titolo preso dalla proprietà scaricata dal database
        chartArea: {left:'10%', width: '70%'},
        crosshair: {trigger: 'selection'}, //serve per mostrare i dati quando si seleziona un punto
      },
    };
  }
  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }
  set(date, chooser: string){
    switch (chooser){
      case 'start':
        this.startDate=date;
        //console.log("CASO START "+this.startDate);
        break;
      case 'end':
        this.endDate=date;
        //console.log("CASO END"+this.endDate);
        break;
    }
  }

}
