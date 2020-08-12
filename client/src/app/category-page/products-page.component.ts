import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Product } from '../shared/services/interfaces'
import { CrudDataServerService } from '../shared/services/crud-data-server.service'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import {Subscription, Observable} from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  items$: Observable<Product[]>
  category: string

  constructor(private crud: CrudDataServerService, private route: ActivatedRoute) {
    /* subscription = route.params.subscribe(params => this.category = params['categoryName']); */
  }

  ngOnInit(): void {
    /* let category = this.route.snapshot.paramMap.get('categoryName') */
    /* this.route.params.subscribe(params => this.category = params['categoryName']); */

    this.route.paramMap.pipe(
      switchMap(params => params.getAll('categoryName'))
      )
      .subscribe(data => {
        this.category = data
        this.items$ = this.crud.getProductsByCategory(this.category)
      })
  }


}
