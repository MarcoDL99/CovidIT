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
  public static r: Router;
  nomeregione: any;



  bindClick(region){
    let obj: any = document.getElementById("mapReg");
    let svgDoc = obj.contentDocument;
    this.paths = svgDoc.getElementsByTagName("path");
    /*
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click", () => {
        this.router.navigate(['/province']);
      }
      );
    }*/

    
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click", function(){
        let provinceSelectedId = this.getAttribute("id");
        prova(provinceSelectedId, region);
      });
    }
  }

  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute) {
                RegionPage.r = this.router;
    
  }


  goToProvince(){
    console.log(this);
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
    this.bindClick(this.region);
  }


  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}


}

function prova(id: String, region){
  let NavigationExtras: NavigationExtras = {state: {regionSVG: region, idProvince: id}};
    RegionPage.r.navigate(['/province'], NavigationExtras);
};
