import { Component, OnInit } from '@angular/core';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
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

  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.startDate='2020-02-24T23:39:03.342+02:00';
    this.endDate=new Date().toISOString();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.sourceType = this.router.getCurrentNavigation().extras.state.sourceData;
        console.log(this.sourceType);
      }
    });
    //this.getData();
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
  /*
  getData(){
  let sito: string;
  if(this.sourceType=='italia'){
    sito= URL.ITALY_FOR_GRAPHS;
  }
  else{
    sito= URL.REGION_FOR_GRAPHS + this.sourceType;}
  sito= sito+URL_FROM_PART+this.startDate.substring(0,9)+URL_TO_PART+this.endDate.substring(0,9);
  console.log(sito);
  }
  */
}
