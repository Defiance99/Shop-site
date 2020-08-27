import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Product, BreadCrumb } from '../shared/interfaces'
import { CrudDataServerService } from '../shared/services/crud-data-server.service'
import { ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationEnd, Event } from '@angular/router'
import {Subscription, Observable} from 'rxjs'
import { switchMap, filter, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  items$: Observable<Product[]>
  category: string

  tileView: boolean = false
  searchProduct: string
  searchByProductCategory: string

  constructor(private crud: CrudDataServerService, private route: ActivatedRoute, private router: Router) {
    /* this.breadcrumbs = this.buildBreadCrumb(this.route.root) */
  }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => params.getAll('categoryName'))
      )
      .subscribe(data => {
        this.category = data
        this.items$ = this.crud.getProductsByCategory(this.category)
      })
  }

  showTileView(type: boolean) {
    this.tileView = type
  }
}
