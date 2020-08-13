import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { MaterializeService, MaterialInstance } from '../../classes/materialilze.service'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-shop-main-layout',
  templateUrl: './shop-main-layout.component.html',
  styleUrls: ['./shop-main-layout.component.css']
})
export class ShopMainLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild("sidenav") sidenavRef: ElementRef
  @ViewChild("collapsible") collapsibleRef: ElementRef
  sidenav: MaterialInstance
  collapsible: MaterialInstance
  login: any

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router,) {
  }

  ngOnInit() {

    }

  ngOnDestroy() {
    /* this.sidenav.destroy()
    this.collapsible.destroy() */
  }

  ngAfterViewInit() {
    this.collapsible = MaterializeService.initCollapsiblePopout(this.collapsibleRef)
    this.sidenav = MaterializeService.initSideNav(this.sidenavRef)
  }

  triggerLogOut() {
      this.auth.logOut()
      this.router.navigate([''])
  }

}
