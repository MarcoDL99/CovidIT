import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { DomSanitizer } from '@angular/platform-browser';
import { RegionService } from 'src/app/services/region.service';
import { TerritorioService } from 'src/app/services/territorio.service';
import { Observable } from 'rxjs';
import { TerritorioModel } from 'src/app/model/territorio.model';
import { RegioniModel } from 'src/app/model/regioni.model';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  regionSVGURL: any;
  paths: any;
  public static r: Router;
  nomeregione: any;
  //DA SCOMMENTARE
  //private data$: Observable<TerritorioModel[]>;

  //PER PROVARE
  private data$: TerritorioModel;

  private nome: String



  bindClick(region){
    let obj: any = document.getElementById("mapReg");
    let svgDoc = obj.contentDocument;
    this.paths = svgDoc.getElementsByTagName("path");
    
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
              private route: ActivatedRoute,
              private regionService: RegionService,
              private territorioService: TerritorioService,
              ) {
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
        this.regionSVGURL = this.getSafeUrl(this.router.getCurrentNavigation().extras.state.regionSVG);
        this.nomeregione = this.router.getCurrentNavigation().extras.state.nomeReg;
      }
     });
     this.nome = this.regionService.getNomeRegione(this.nomeregione);

    //DA SCOMMENTARE!!!!
     //this.data$ = this.territorioService.loadDatiOdierni(this.nome);

     //PER PROVA
     this.data$ = new RegioniModel();
     this.data$.nuoviPositivi = 4;
     this.data$.totPositivi = 2;
      this.data$.nuoviDecessi = 9;
     this.data$.totDecessi = 10;
      this.data$.nuoviTamponi = 4;
     this.data$.totTamponi = 99;
     this.data$.nuoviTerapieIntensive = 1;
     this.data$.totTerapieIntensive = 111;
  }

  ionViewDidEnter(){
    this.bindClick(this.regionSVGURL);
  }


  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}


}

function prova(id: String, region){
  let NavigationExtras: NavigationExtras = {state: {regionSVG: region, idProvince: id}};
    RegionPage.r.navigate(['/province'], NavigationExtras);
};
