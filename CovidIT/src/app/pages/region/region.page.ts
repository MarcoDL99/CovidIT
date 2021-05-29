import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../popovermenu/popovermenu.page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  region: any;
  paths: any;

  goToProvince(){
    console.log("funziona");
  }

  bindClick(){
    let obj: any = document.getElementById("mapReg");
    let svgDoc = obj.contentDocument;
    this.paths = svgDoc.getElementsByTagName("path");
    console.log(this.paths.length);
    console.log("SI");
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click",this.goToProvince);
    }
  }

  constructor(private sanitizer: DomSanitizer, private popover: PopoverController, private router: Router, private route: ActivatedRoute) {
    
     
  }

  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.region = this.getSafeUrl(this.router.getCurrentNavigation().extras.state.regionSVG);
      }
     });
    
  }

  ionViewDidEnter(){
    this.bindClick();
  }


  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
}

  
}
