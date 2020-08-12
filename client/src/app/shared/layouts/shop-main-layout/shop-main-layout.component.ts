import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { MaterializeService } from '../../classes/materialilze.service'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-shop-main-layout',
  templateUrl: './shop-main-layout.component.html',
  styleUrls: ['./shop-main-layout.component.css']
})
export class ShopMainLayoutComponent implements OnInit {

  login: any

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router,) {
  }

  ngOnInit() {
      MaterializeService.collapsible()
    }


  triggerLogOut() {
      this.auth.logOut()
      this.router.navigate([''])
  }

}
