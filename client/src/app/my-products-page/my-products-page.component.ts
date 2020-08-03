import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UserOperationService } from '../shared/services/user-operation.service'
import { Product } from '../shared/services/interfaces'
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-my-products-page',
  templateUrl: './my-products-page.component.html',
  styleUrls: ['./my-products-page.component.css']
})
export class MyProductsPageComponent implements OnInit {

  items: Product
  visible = !!this.items

  constructor(private crud: UserOperationService) {}

  ngOnInit(): void {
    this.crud.getMyProducts().subscribe(
      (data: Product) => this.items = data,
      (err) => console.log(err)
      )
  }

}
