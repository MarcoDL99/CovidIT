import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController} from '@ionic/angular';
import { PopovermenuPage} from '../../Utilty/popovermenu/popovermenu.page';
import { TerritorioService } from 'src/app/services/territorio.service';
import { Observable } from 'rxjs';
import { ITALIA } from 'src/app/constants';
import { ItaliaService } from 'src/app/services/italia.service';

@Component({
  selector: 'app-italy',
  templateUrl: './italy.page.html',
  styleUrls: ['./italy.page.scss'],
})
export class ItalyPage implements OnInit {

  private data$: Observable<number[]>;

  constructor(private popover: PopoverController,
              private router: Router,
              private territorioService: TerritorioService,
              private italiaService: ItaliaService) {
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
   // this.data$ = this.territorioService.loadDatiOdierni(ITALIA);
  }

}


