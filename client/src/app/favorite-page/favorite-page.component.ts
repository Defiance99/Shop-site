import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css'],
  animations: [
    trigger('expandedPanel', [
      state('initial', style({height: 0})),
      state('expanded', style({height: '*'})),
      transition('initial <=> expanded', animate('1s'))
    ])
  ]
})
export class FavoritePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  isExpanded: boolean = false;
  state: string = 'initial';

  expand() {
    this.isExpanded = !this.isExpanded;
    this.state = this.isExpanded ? 'expanded' : 'initial';
  }

}
