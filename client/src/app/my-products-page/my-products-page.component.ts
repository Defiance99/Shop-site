import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UserOperationService } from '../shared/services/user-operation.service'
import { Product } from '../shared/services/interfaces'
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-products-page',
  templateUrl: './my-products-page.component.html',
  styleUrls: ['./my-products-page.component.css']
})
export class MyProductsPageComponent implements OnInit {

  items$: Observable<Product[]>

  constructor(private user: UserOperationService) {}

  ngOnInit(): void {
    this.items$ = this.user.getMyProducts()
  }

}
