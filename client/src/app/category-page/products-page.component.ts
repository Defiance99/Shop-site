import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Product, BreadCrumb } from '../shared/services/interfaces'
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

  breadcrumbs: BreadCrumb[]
  items$: Observable<Product[]>
  category: string

  tileView: boolean = false
  searchProduct: string
  searchByProductCategory: string

  constructor(private crud: CrudDataServerService, private route: ActivatedRoute, private router: Router) {
    this.breadcrumbs = this.buildBreadCrumb(this.route.root)
  }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => params.getAll('categoryName'))
      )
      .subscribe(data => {
        this.category = data
        this.items$ = this.crud.getProductsByCategory(this.category)
      })

      this.router.events.pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      ).subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.route.root);
    })
  }


  showTileView(type: boolean) {
    this.tileView = type
  }



  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : ""
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : ""

    const lastRoutePart = path.split('/').pop()
    const isDynamicRoute = lastRoutePart.startsWith(':')
    console.log("IS DYNAMIC ROUTE:", isDynamicRoute)
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1]
      console.log("PARAM NAME:", paramName)
      path = path.replace(lastRoutePart, route.snapshot.params[paramName])
      label = route.snapshot.params[paramName]
    }

    const nextUrl = path ? `${url}/${path}` : url

    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl
    }

    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs]

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return
  }
}
