import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { UserOperationService } from '../shared/services/user-operation.service'
import { Product } from '../shared/services/interfaces'
import { MaterializeService, MaterialInstance } from '../shared/classes/materialilze.service'
import { FilterMyCatalogDirective } from '../shared/directives/filterMyCatalog.directive'
import { SearchPipe } from '../shared/Pipes/search.pipe'
import { SearchPipeByCategory } from '../shared/Pipes/searchByCategory.pipe'

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
  evenT
  constructor(private user: UserOperationService, private router: Router) {}

  ngOnInit(): void {
    this.items$ = this.user.getMyProducts()

    this.router.events
      .pipe(event => this.evenT = event)
      console.log(this.evenT)
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
