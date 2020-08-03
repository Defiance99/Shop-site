import { Component, OnInit } from '@angular/core';
import { CrudDataServerService } from '../shared/services/crud-data-server.service'
import { Product } from '../shared/services/interfaces'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  items: Product

  constructor(private crud: CrudDataServerService) { }

  ngOnInit(): void {
    this.crud.getProducts().subscribe(
      (data: Product) => this.items = data,
      (err) => console.log(err))
  }

}
