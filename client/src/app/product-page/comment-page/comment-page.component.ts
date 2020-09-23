import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/index'
import { ProductOperationsService } from '../../shared/services/product-operations.service'
import { MaterializeService } from '../../shared/classes/materialilze.service'

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})
export class CommentPageComponent implements OnInit, OnDestroy {

  /* @Input() isLeaveComment: boolean */
  @Input() productName: string
  @Input() productId: string
  @Output() onChanged = new EventEmitter()
  form: FormGroup
  productSub: Subscription
  stars: number

  constructor(private productService: ProductOperationsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      advantages: new FormControl(null),
      weaknesses: new FormControl(null),
      comment: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)])
    })
  }

  ngOnDestroy() {
    if (this.productSub) this.productSub.unsubscribe()
  }

  leaveComment() {
  }

  addComent() {
  }

  showComment() {}

  onSubmit() {
    this.form.disable()
    this.productSub = this.productService.addCommentToProduct(this.form.value, this.productId, this.stars).subscribe(
      (message) => {
        MaterializeService.toast("Комментарий оставлен")
        this.onChanged.emit()
      },
      (error) => {
        this.form.enable()
      }
    )
  }
}
