import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { MaterializeService, MaterialInstance } from '../../classes/materialilze.service'
import { switchMap } from 'rxjs/operators'
import { ViewportScroller } from '@angular/common'

@Component({
  selector: 'app-shop-main-layout',
  templateUrl: './shop-main-layout.component.html',
  styleUrls: ['./shop-main-layout.component.css']
})
export class ShopMainLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild("sidenav") sidenavRef: ElementRef
  @ViewChild("collapsible") collapsibleRef: ElementRef
  @ViewChild("floatButt") floatButtRef: ElementRef
  @ViewChild("chatComponent") chatComponentRef: any
  sidenav: MaterialInstance
  collapsible: MaterialInstance
  floatButt: MaterialInstance
  login: any

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
    ) {}

  ngOnInit() {

    }

  ngOnDestroy() {
    /* this.sidenav.destroy()
    this.collapsible.destroy() */
  }

  ngAfterViewInit() {
    this.collapsible = MaterializeService.initCollapsiblePopout(this.collapsibleRef)
    this.sidenav = MaterializeService.initSideNav(this.sidenavRef)
    this.floatButt = MaterializeService.initFloatButt(this.floatButtRef)
  }

  scrollToAnchor($anchor: any) {
    /* this.viewportScroller.scrollToPosition([0, 0]) */
   /*  this.viewportScroller.scrollToAnchor('top') */
   $anchor.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }

  triggerLogOut() {
    this.auth.logOut()
    this.router.navigate([''])
  }

  callChat() {
    this.chatComponentRef.stateName()
  }

}
