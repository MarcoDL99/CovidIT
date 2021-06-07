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

  //QUESTO E' DA SCOMMENTARE!!!!!!!!!!!!!!!
  //private data$: Observable<TerritorioModel[]>;

  //SOLO PER PROVARE!!!!!!!!!!!!!!!!!!
  private data$: Territorio;

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

    //SOLO PER PROVARE, DA CANCELLARE!!!
    this.data$ = new Italia();
    this.data$.nuoviPositivi = 4;
    this.data$.totPositivi = 2;
    this.data$.nuoviDecessi = 9;
    this.data$.totDecessi = 10;
    this.data$.nuoviTamponi = 4;
    this.data$.totTamponi = 99;
    this.data$.nuoviTerapieIntensive = 1;
    this.data$.totTerapieIntensive = 111;
  }

}


