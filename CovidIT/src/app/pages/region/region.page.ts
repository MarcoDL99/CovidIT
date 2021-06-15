import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { DomSanitizer } from '@angular/platform-browser';
import { RegionService } from 'src/app/services/region.service';
import { TerritorioService } from 'src/app/services/territorio.service';
import { Observable } from 'rxjs';
import { Territorio } from 'src/app/model/territorio.model';
import { Regione } from 'src/app/model/regione.model';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  regionSVGURL: any;
  paths: any;
  nomeregione: any;
  //DA SCOMMENTARE
  //private data$: Observable<TerritorioModel[]>;

  //PER PROVARE
  private data$: Territorio;

  private nome: string;


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
     this.data$ = new Regione();
  }



  bindClick(){
    let obj: any = document.getElementById("mapReg");
    let svgDoc = obj.contentDocument;
    this.paths = svgDoc.getElementsByTagName("path");

    //this nella variabile scope per poterla usare all'interno di addEventListener
    let scope = this;

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].addEventListener("click", function(){
        let provinceSelectedId = this.getAttribute("id");
        let NavigationExtras: NavigationExtras = {state: {regionSVG: scope.regionSVGURL, idProvince: provinceSelectedId}};
        scope.router.navigate(['/province'], NavigationExtras);
      });
    }
  }


  constructor(private sanitizer: DomSanitizer,
              private popover: PopoverController,
              private router: Router,
              private route: ActivatedRoute,
              private regionService: RegionService,
              private territorioService: TerritorioService,
              ) {}


  gotoGrafici(){
    let NavigationExtras: NavigationExtras = {state: {sourceData: this.nomeregione}};
    this.router.navigate(['/grafici'], NavigationExtras);
  }

  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }




  ionViewDidEnter(){
    this.bindClick();
  }


  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

