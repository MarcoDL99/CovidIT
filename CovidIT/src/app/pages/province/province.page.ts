import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { TerritorioModel } from 'src/app/model/territorio.model';

import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { ProvinciaModel } from 'src/app/model/provincia.model';
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
  private data$: Observable<ProvinciaModel>;
  private svgDoc: any;
  provinceId: any;


  constructor(private popover: PopoverController,
               private router: Router,
               private route: ActivatedRoute,
               private provinciaService: ProvinciaService) {
                
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
        scope.doRefresh(provinceSelectedId);
      });
    }
  }

  doRefresh(id: string){
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#9DA3B3");
    this.provinceId = id;
    this.svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#F1B739");
    //Carica i contagi a partire dall'id della provincia, ovvero il suo nome
    this.data$ = this.provinciaService.loadContagi(this.provinceId);
  }

}

