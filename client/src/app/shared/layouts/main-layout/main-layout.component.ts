import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { MaterialInstance, MaterializeService } from '../../classes/materialilze.service'


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild("sidenav") sidenavRef: ElementRef
  @ViewChild("collapsible") collapsibleRef: ElementRef
  sidenav: MaterialInstance
  collapsible: MaterialInstance

  constructor() { }

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


}

