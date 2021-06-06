import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController} from '@ionic/angular';
import { PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';

@Component({
  selector: 'app-italy',
  templateUrl: './italy.page.html',
  styleUrls: ['./italy.page.scss'],
})
export class ItalyPage implements OnInit {

  constructor(private popover: PopoverController, private router: Router) {
  }
   createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
   }

   gotoGrafici(){
     let NavigationExtras: NavigationExtras = {state: {sourceData: 'italia'}};
     this.router.navigate(['/grafici'], NavigationExtras);
   }
   goToRegion(event: Event){
    let s: any;
    let nomeRegione = (<HTMLInputElement> event.target).getAttribute('title');
    if (nomeRegione=="Abruzzo"){
      s = "../assets/svg/regions/abruzzo.svg";
    }
    else if (nomeRegione=="Basilicata"){
      s = "../assets/svg/regions/basilicata.svg";
    }
    else if (nomeRegione=="Calabria"){
      s = "../assets/svg/regions/calabria.svg";
    }
    else if (nomeRegione=="Campania"){
      s = "../assets/svg/regions/campania.svg";
    }
    else if (nomeRegione=="Emilia-Romagna"){
      s = "../assets/svg/regions/emiliaRomagna.svg";
    }
    else if (nomeRegione=="Friuli-Venezia Giulia"){
      s = "../assets/svg/regions/friuliVeneziaGiulia.svg";
    }
    else if (nomeRegione=="Lazio"){
      s = "../assets/svg/regions/lazio.svg";
    }
    else if (nomeRegione=="Liguria"){
      s = "../assets/svg/regions/liguria.svg";
    }
    else if (nomeRegione=="Lombardia"){
      s = "../assets/svg/regions/lombardia.svg";
    }
    else if (nomeRegione=="Marche"){
      s = "../assets/svg/regions/marche.svg";
    }
    else if (nomeRegione=="Molise"){
      s = "../assets/svg/regions/molise.svg";
    }
    else if (nomeRegione=="Piemonte"){
      s = "../assets/svg/regions/piemonte.svg";
    }
    else if (nomeRegione=="Puglia"){
      s = "../assets/svg/regions/puglia.svg";
    }
    else if (nomeRegione=="Sardegna"){
      s = "../assets/svg/regions/sardegna.svg";
    }
    else if (nomeRegione=="Sicilia"){
      s = "../assets/svg/regions/sicilia.svg";
    }
    else if (nomeRegione=="Toscana"){
      s = "../assets/svg/regions/toscana.svg";
    }
    else if (nomeRegione=="Trentino-Alto Adige"){
      s = "../assets/svg/regions/trentinoAltoAdige.svg";
    }
    else if (nomeRegione=="Umbria"){
      s = "../assets/svg/regions/umbria.svg";
    }
    else if (nomeRegione=="Valle d'Aosta"){
      s = "../assets/svg/regions/valleDAosta.svg";
    }
    else if (nomeRegione=="Veneto"){
      s = 'veneto';
    }
    let NavigationExtras: NavigationExtras = {state: {regionSVG: s, nomeReg: nomeRegione}};
    this.router.navigate(['/region'], NavigationExtras);
   }

  ngOnInit() {
  }

}


