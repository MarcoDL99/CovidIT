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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  regionSVGURL: any;
  paths: any;
  nomeregione: any;

  private dato$: Territorio;

  private nome: string;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.regionSVGURL = this.getSafeUrl(this.router.getCurrentNavigation().extras.state.regionSVG);
        this.nomeregione = this.router.getCurrentNavigation().extras.state.nomeReg;
      }
     });
     this.nome = this.regionService.getNomeRegione(this.nomeregione);
    
      let todayString = this.territorioService.getTodayDate();

      
      this.dato$=new Regione();{
      this.regionService.loadDati().then(data =>{
        console.log(todayString);
        let arrayRegioni = data['dates'][todayString]['countries']['Italy']['regions'];
        let regionDatiObj = this.regionService.getOggettoRegione(arrayRegioni, this.nomeregione);
        this.dato$.nuovi_decessi = regionDatiObj.today_new_deaths;
        this.dato$.nuovi_positivi = regionDatiObj.today_new_confirmed;
        this.dato$.nuovi_terapia_intensiva = regionDatiObj.today_new_intensive_care;
        this.dato$.nuovi_tamponi = regionDatiObj.today_new_tests;
        this.dato$.totale_decessi = regionDatiObj.today_deaths;
        this.dato$.totale_positivi = regionDatiObj.today_confirmed;
        this.dato$.totale_terapia_intensiva = regionDatiObj.today_intensive_care;
        this.dato$.totale_tamponi = regionDatiObj.today_tests;
        let dataAmericana = regionDatiObj.date;
        let from= dataAmericana;
        let temp = from.split("-");
        let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
        this.dato$.ultimo_aggiornamento = dataItaliana;
      })
      .catch(() =>{
        this.territorioService.showErrorToast();
      });
    }
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
              private toastr: ToastrService
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

