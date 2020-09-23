import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/index'
import { Router } from '@angular/router'
import { UserOperationService } from '../shared/services/user-operation.service'
import { MaterializeService } from '../shared/classes/materialilze.service'

@Component({
  selector: 'app-create-products-page',
  templateUrl: './create-products-page.component.html',
  styleUrls: ['./create-products-page.component.css']
})
export class CreateProductsPageComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  image: File
  imagePreview: any
  authSub: Subscription


  constructor(private product: UserOperationService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nameProduct: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
      category: new FormControl(null, [Validators.required]),
      describe: new FormControl(null),
      image: new FormControl(null)
    })
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    this.form.disable()
    console.log("Component: ",this.form.value)
    this.authSub = this.product.create(this.form.value, this.image).subscribe(
      () => {
        MaterializeService.toast("Успешно создано")
        this.router.navigate(['/myProducts'])
      },
      (err) => {
        MaterializeService.toast(err.error.message)
        console.log(err + " - Create Products err")
      },
    )
  }
}



