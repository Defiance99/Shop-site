import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { UserOperationService } from '../shared/services/user-operation.service'
import { Product } from '../shared/interfaces'

@Component({
  selector: 'app-my-products-page',
  templateUrl: './my-products-page.component.html',
  styleUrls: ['./my-products-page.component.css']
})
export class MyProductsPageComponent implements OnInit, OnDestroy ,AfterViewInit {

  items$: Observable<Product[]>
  searchProduct: string
  searchByProductCategory: string
  tileView: boolean = false
  constructor(private user: UserOperationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.items$ = this.user.getMyProducts()

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.route))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  filterByCategory() {}

  chocolateTileView={

  }

  showTileView(type: boolean) {
    this.tileView = type
  }
}
