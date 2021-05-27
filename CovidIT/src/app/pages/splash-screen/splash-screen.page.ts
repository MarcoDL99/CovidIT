import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    function goToItaly(): void{
      this.router.navigate(['/italy']);
    }

    setTimeout(goToItaly, 1000);
    
  }


}
