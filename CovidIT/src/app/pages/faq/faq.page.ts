import { Component, OnInit } from '@angular/core';
import {Faq} from '../../model/faq.model';
import {FaqService} from '../../services/faq.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  private faqs$: Faq[];
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.faqs$=this.faqService.list();
  }

}
