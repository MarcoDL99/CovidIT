import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PopovermenuPage} from '../popovermenu/popovermenu.page';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  constructor(private popover: PopoverController, private router: Router) {
  }
  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }
  ngOnInit() {
  }

}
