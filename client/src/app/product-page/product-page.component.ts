import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked, AfterViewInit, ɵɵgetInheritedFactory } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from '../shared/services/interfaces'
import { UserOperationService } from '../shared/services/user-operation.service'
import { OrderService } from '../shared/services/order.service'
import { MaterializeService, MaterialInstance } from '../shared/classes/materialilze.service'
import { Subscription, Observable } from 'rxjs'
import { materialize } from 'rxjs/operators'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("modal") modalRef: ElementRef
  @ViewChild("edit") editRef: ElementRef
  product: Product
  id: string
  productSub: Subscription
  isEdit: boolean = false
  canEdit: boolean = false
  isLeaveComment: boolean = false
  isShowComment: boolean = false
  modal: MaterialInstance

  constructor(private route: ActivatedRoute,
    private userService: UserOperationService,
    private order: OrderService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.id = id
    /* this.product$ = this.userService.getProductById(id) */
    this.userService.getProductById(id).subscribe(
      (data) => {
        this.isEdit = data.isEdit
        this.product = data
      }
    )
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe()
    }
    /* this.modal.destroy() */
  }
  ngAfterViewInit() {
    setTimeout( () => {
      this.modal = MaterializeService.initModal(this.modalRef)
      this.canEdit = true
    },  2000)
  }

  addToOrder(name: string, cost: number, description: string) {
    let product = {
      "productId": this.id,
      "name": name,
      "cost": cost,
      "description": description,
    }
    this.productSub = this.order.addToOrder(product).subscribe(
      () => MaterializeService.toast("Успешно добавлено"),
      (err) => MaterializeService.toast(err.error.message)
    )
  }

  open() {
    this.modal.open()
  }

  save() {
    MaterializeService.toast("Сохранено")
  }

  delete() {
    this.userService.delete(this.id).subscribe(
      (message) => {
        this.router.navigate(["/myProducts"])
        MaterializeService.toast(message.message)
      }
    )
  }

  leaveComment() {
    this.isShowComment = false
    this.isLeaveComment = !this.isLeaveComment
  }
  showComment() {
    this.isLeaveComment = false
    this.isShowComment = !this.isShowComment
  }

}
