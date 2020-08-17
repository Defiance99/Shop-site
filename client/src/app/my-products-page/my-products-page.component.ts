import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
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

  constructor(private user: UserOperationService) {}

  ngOnInit(): void {
    this.items$ = this.user.getMyProducts()
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
