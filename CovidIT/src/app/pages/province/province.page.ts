import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PopovermenuPage} from '../popovermenu/popovermenu.page';

@Component({
  selector: 'app-province',
  templateUrl: './province.page.html',
  styleUrls: ['./province.page.scss'],
})
export class ProvincePage implements OnInit {

  constructor(private popover: PopoverController, private router: Router) {
  }
  createMenu(event: Event){
    this.popover.create({event,component: PopovermenuPage, showBackdrop:false}).then((popoverElement)=>{popoverElement.present();});
  }

  ngOnInit() {
  }

}
