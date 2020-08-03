import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from '../shared/services/interfaces'
import { UserOperationService } from '../shared/services/user-operation.service'

@Component({
  selector: 'app-product-form-page',
  templateUrl: './product-form-page.component.html',
  styleUrls: ['./product-form-page.component.css']
})
export class ProductFormPageComponent implements OnInit, OnDestroy {

  product: Product

  constructor(private route: ActivatedRoute, private userService: UserOperationService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.userService.myProductById(id).subscribe(
      (data) => this.product = data
    )
  }

  ngOnDestroy() {

  }

}
