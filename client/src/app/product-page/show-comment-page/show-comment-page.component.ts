import { Component, OnInit, Input } from '@angular/core'
import { ProductOperationsService } from '../../shared/services/product-operations.service'
import { Observable } from 'rxjs'
import { Comment } from '../../shared/services/interfaces'

@Component({
  selector: 'app-show-comment-page',
  templateUrl: './show-comment-page.component.html',
  styleUrls: ['./show-comment-page.component.css']
})
export class ShowCommentPageComponent implements OnInit {

  @Input() productId: string
  comments$: Observable<Comment>

  constructor(private productService: ProductOperationsService) { }

  ngOnInit(): void {
    this.comments$ = this.productService.getCommentsByProductId(this.productId)
  }

  showCommentBlock() {
    /* this.showComment = !this.showComment */
  }

  zzz(qq: any) {
    console.log(qq)
  }
}
