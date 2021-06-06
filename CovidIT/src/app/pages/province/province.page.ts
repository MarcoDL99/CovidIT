import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';

import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';

@Component({
  selector: 'app-province',
  templateUrl: './province.page.html',
  styleUrls: ['./province.page.scss'],
})
export class ProvincePage implements OnInit {

  region: any;
  provinceId: any;
  paths: any;
  public static r: Router;

  constructor(private popover: PopoverController,
               private router: Router,
               private route: ActivatedRoute,) {
                ProvincePage.r = this.router;
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
    let svgDoc = obj.contentDocument;
    svgDoc.getElementById(this.provinceId).setAttribute("style","fill:#F1B739");

    this.bindClick(this.region);
  }

  bindClick(region){
    let obj: any = document.getElementById("mapRegProvince");
    let svgDoc = obj.contentDocument;
    this.paths = svgDoc.getElementsByTagName("path");

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click", function(){
        let provinceSelectedId = this.getAttribute("id");
        prova(provinceSelectedId, region);
      });
    }
  }

  tasto(){
    console.log(this.provinceId);
  }


}

function prova(id: String, region){
  let NavigationExtras: NavigationExtras = {state: {regionSVG: region, idProvince: id}};
    ProvincePage.r.navigate(['/province'], NavigationExtras);
};
