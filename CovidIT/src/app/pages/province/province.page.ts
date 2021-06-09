import { Component, OnInit, NgZone } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { Territorio } from 'src/app/model/territorio.model';

import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { Provincia } from 'src/app/model/provincia.model';
import { ProvinciaService } from 'src/app/services/provincia.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-province',
  templateUrl: './province.page.html',
  styleUrls: ['./province.page.scss'],
})
export class ProvincePage implements OnInit {

  region: any;
  paths: any;
  //DA SCOMMENTARE
  //private data$: Observable<Provincia>;
  private data$: Provincia;
  private svgDoc: any;
  provinceId: any;


  constructor(private popover: PopoverController,
               private router: Router,
               private route: ActivatedRoute,
               private provinciaService: ProvinciaService,
               private zone: NgZone) {

  }

  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }


  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.region = this.router.getCurrentNavigation().extras.state.regionSVG;
        this.provinceId = this.router.getCurrentNavigation().extras.state.idProvince;
      }
     });

     //PER PROVA, DA TOGLIERE!!!!
     this.data$ = new Provincia();
     this.data$.nome="prova";
     this.data$.totaleContagi=300;
     this.data$.ultimoAggiornamento="10/10/20";

  }

  ionViewDidEnter(){
    let obj: any = document.getElementById("mapRegProvince");
    this.svgDoc = obj.contentDocument;
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#F1B739");

    this.bindClick();
  }



  bindClick(){
    this.paths = this.svgDoc.getElementsByTagName("path");
    let scope= this;
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click", function(){
        let provinceSelectedId = this.getAttribute("id");
        scope.zone.run(()=>{
          scope.doRefresh(provinceSelectedId);
        });
      });
    }
  }

  doRefresh(id: string){
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#9DA3B3");
    this.provinceId = id;
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#F1B739");
    //Carica i contagi a partire dall'id della provincia, ovvero il suo nome DA SCOMMENTARE
    //this.data$ = this.provinciaService.loadContagi(this.provinceId);
  }

}

