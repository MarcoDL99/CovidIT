import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  region: any;
  paths: any;
  nomeregione: any;



  bindClick(){
    let obj: any = document.getElementById("mapReg");
    let svgDoc = obj.contentDocument;
    this.paths = svgDoc.getElementsByTagName("path");

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click", () => {
        this.router.navigate(['/province']);
      }
      );
    }
  }

  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute) {

  }



  goToProvince(){
  }
  gotoGrafici(){
    let NavigationExtras: NavigationExtras = {state: {sourceData: this.nomeregione}};
    this.router.navigate(['/grafici'], NavigationExtras);
  }

  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.region = this.getSafeUrl(this.router.getCurrentNavigation().extras.state.regionSVG);
        this.nomeregione = this.router.getCurrentNavigation().extras.state.nomeReg;
      }
     });
  }

  ionViewDidEnter(){
    this.bindClick();
  }


  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}


}
