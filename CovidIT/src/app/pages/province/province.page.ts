import { Component, OnInit, NgZone } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { Territorio } from 'src/app/model/territorio.model';

import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { Provincia } from 'src/app/model/provincia.model';
import { ProvinciaService } from 'src/app/services/provincia.service';
import {Observable} from 'rxjs';
import { TerritorioService } from 'src/app/services/territorio.service';

@Component({
  selector: 'app-province',
  templateUrl: './province.page.html',
  styleUrls: ['./province.page.scss'],
})
export class ProvincePage implements OnInit {

  region: any;
  paths: any;
  private dato$ = new Provincia();
  private svgDoc: any;
  provinceId: any;
  private nomeProvincia: any;


  constructor(private popover: PopoverController,
               private router: Router,
               private route: ActivatedRoute,
               private provinciaService: ProvinciaService,
               private territorioService: TerritorioService,
               private zone: NgZone) {

  }

  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }



  ngOnInit() {

    //Prende i dati arrivati dal router per settare l'svg e il nome della provincia
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.region = this.router.getCurrentNavigation().extras.state.regionSVG;
        this.provinceId = this.router.getCurrentNavigation().extras.state.idProvince;
      }
     });


  }

  ionViewWillEnter(){
    //Funzione per il caricamento dei dati della provincia
    this.dato$ = this.provinciaService.bindDati(this.provinceId);

  }


  ionViewDidEnter(){

    //Cambio del colore della provincia scelta
    let obj: any = document.getElementById("mapRegProvince");
    this.svgDoc = obj.contentDocument;
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#0050B9");


    this.bindClick();

  }


  //A ogni provincia si associa un event listener sul click per cambiare provincia
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

  //doRefresh è usato per cambiare colore alla provincia selezionata e caricarne i dati
  doRefresh(id: string){
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#9DA3B3");
    this.provinceId = id;
    this.dato$ = this.provinciaService.bindDati(this.provinceId);
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#0050B9");
  }

}

