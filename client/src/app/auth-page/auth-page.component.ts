import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'
import { Subscription } from 'rxjs'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { MaterializeService } from '../shared/classes/materialilze.service'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  authSub: Subscription

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })

    this.route.queryParams.subscribe( (params: Params) => {
      if (params['registered']) {
        MaterializeService.toast("Успешно зареган")
      } else if (params['accessDenied']) {
        MaterializeService.toast("Требуется вход!")
      }
    })
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    const user = {
      login: this.form.value.login,
      password: this.form.value.password
    }
    this.authSub = this.auth.login(user).subscribe(
      () => {
        MaterializeService.toast("Вы вошли")
        this.router.navigate(['profile'])
      },
      (err) => {
        MaterializeService.toast(err.error.message)
        this.form.enable()
      }
    )
  }
}
