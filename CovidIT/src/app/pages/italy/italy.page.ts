import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController} from '@ionic/angular';
import { PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { TerritorioService } from 'src/app/services/territorio.service';
import { Observable } from 'rxjs';
import { ITALIA } from 'src/app/constants';
import { ItaliaService } from 'src/app/services/italia.service';
import { Territorio } from 'src/app/model/territorio.model';
import { Italia } from 'src/app/model/italia.model';

@Component({
  selector: 'app-italy',
  templateUrl: './italy.page.html',
  styleUrls: ['./italy.page.scss'],
})
export class ItalyPage implements OnInit {

  private dato$: Italia;

  constructor(private popover: PopoverController,
              private router: Router,
              //private territorioService: TerritorioService,
              private italiaService: ItaliaService
  ) {
  }
   createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
   }

   gotoGrafici(){
     let NavigationExtras: NavigationExtras = {state: {sourceData: 'italia'}};
     this.router.navigate(['/grafici'], NavigationExtras);
   }


   goToRegion(event: Event){
    let nomeRegione = (<HTMLInputElement> event.target).getAttribute('title');
    let regionSVG = this.italiaService.getRegionSVG(nomeRegione);
    let NavigationExtras: NavigationExtras = {state: {regionSVG: regionSVG, nomeReg: nomeRegione}};
   this.router.navigate(['/region'], NavigationExtras);
   }

  ngOnInit() {
    //QUesto è da scommentare!!!!!!!!!!!!!
    //this.data$ = this.territorioService.loadDatiOdierni(ITALIA);

    //this.dataa$ = this.italiaService.loadDati();

    //SOLO PER PROVARE, DA CANCELLARE!!!
    let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      let todayString: any;
      todayString = yyyy + '-' + mm + '-' + dd;

      this.dato$=new Italia();
      this.italiaService.loadDati().then(data =>{
        let italyDatiObj = data['dates'][todayString]['countries']['Italy'];
        this.dato$.nuovi_decessi = italyDatiObj.today_new_deaths;
        this.dato$.nuovi_positivi = italyDatiObj.today_new_confirmed;
        this.dato$.nuovi_terapia_intensiva = italyDatiObj.today_new_intensive_care;
        this.dato$.nuovi_tamponi = italyDatiObj.today_new_tests;
        this.dato$.totale_decessi = italyDatiObj.today_deaths;
        this.dato$.totale_positivi = italyDatiObj.today_confirmed;
        this.dato$.totale_terapia_intensiva = italyDatiObj.today_intensive_care;
        this.dato$.totale_tamponi = italyDatiObj.today_tests;
        let dataAmericana = italyDatiObj.date;
        let from= dataAmericana;
        let temp = from.split("-");
        let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
        this.dato$.ultimo_aggiornamento = dataItaliana;
      });
    
    
  }

}


