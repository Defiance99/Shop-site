import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { MaterializeService } from '../shared/classes/materialilze.service'
import { UserOperationService } from '../shared/services/user-operation.service'
import { AuthService } from '../shared/services/auth.service'
import { Profile } from '../shared/services/interfaces'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  @ViewChild('submit') submitRef: ElementRef
  form: FormGroup
  upSub
  edit: boolean = false
  userInfo: Profile


  constructor(private userService: UserOperationService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data[0]
        this.initForm()
        console.log(this.userInfo)
      }
    )
  }

  ngOnDestroy() {
    if(this.upSub) {
      this.upSub.unsubscribe()
    }
  }

  initForm() {
    this.form = new FormGroup({
      password: new FormControl({value: "password", disabled: true}, [Validators.required, Validators.minLength(2)]),
      login: new FormControl({value: this.userInfo.login, disabled: true}, [Validators.required, Validators.minLength(2)]),
      name: new FormControl({value: this.userInfo.name, disabled: true}, [Validators.required, Validators.minLength(2)])
    })
  }

  triggerSubmit() {
    this.submitRef.nativeElement.click()
  }

  editing() {
    this.edit = !this.edit
    if (this.edit) this.form.enable()
    else this.form.disable()
  }

  onSubmit() {
    this.upSub = this.auth.updateUser(this.form.value).subscribe(
      () => {
        MaterializeService.toast("Обновлено")
      },
      (err) => {
        MaterializeService.toast(err.error.message)
        this.form.enable()
      }
    )
  }
}
