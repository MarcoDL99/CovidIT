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
        ['Task', 'Hours per Day'],
        ['27/05/2021', 700],
        ['28/05/2021', 789],
        ['29/05/2021', 711],
        ['30/05/2021', 799],
        ['31/05/2021', 788],
        ['01/06/2021', 754],
        ['02/06/2021', 764],
        ['03/06/2021', 728],
        ['04/06/2021', 714],
        ['05/06/2021', 732],
        ['06/06/2021', 700]
      ],
      //firstRowIsData: true,
      options: {title: 'Nuovi Casi',
        legend: 'none',
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
