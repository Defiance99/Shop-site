import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
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
