import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController} from '@ionic/angular';
import { PopovermenuPage} from '../popovermenu/popovermenu.page';
@Component({
  selector: 'app-italy',
  templateUrl: './italy.page.html',
  styleUrls: ['./italy.page.css'],
})
export class ItalyPage implements OnInit {

  constructor(private popover: PopoverController, private router: Router) {
  }
   createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
   }
  ngOnInit() {
    //const sardinia = document.getElementById("sardinia");
    //sardinia.addEventListener("click", this.prova);
  }

  prova(): void{
    this.router.navigate(['/region']);
  }
}
