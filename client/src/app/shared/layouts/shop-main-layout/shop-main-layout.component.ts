import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-shop-main-layout',
  templateUrl: './shop-main-layout.component.html',
  styleUrls: ['./shop-main-layout.component.css']
})
export class ShopMainLayoutComponent implements OnInit {

  login

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
      )
    }


  triggerLogOut() {
      this.auth.logOut()
      this.router.navigate([''])
  }

}
