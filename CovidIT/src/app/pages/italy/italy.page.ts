import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-italy',
  templateUrl: './italy.page.html',
  styleUrls: ['./italy.page.css'],
})
export class ItalyPage implements OnInit {

  constructor(private router: Router) {
    
   }

  ngOnInit() {
    //const sardinia = document.getElementById("sardinia");
    //sardinia.addEventListener("click", this.prova);
  }

  prova(): void{
    this.router.navigate(['/region'])
  }
  

}
