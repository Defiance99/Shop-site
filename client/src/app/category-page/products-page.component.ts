import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/services/interfaces';
import { CrudDataServerService } from '../shared/services/crud-data-server.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  items: Product

  constructor(private crud: CrudDataServerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let category = this.route.snapshot.paramMap.get('categoryName')
    this.crud.getProductsByCategory(category).subscribe(
      (data: Product) => this.items = data,
      (err) => console.log(err)
    )
  }

}
