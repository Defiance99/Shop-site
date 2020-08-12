import {ElementRef} from '@angular/core'

declare var M:any

export interface MaterialInstance {
  open?(): void,
  close?(): void,
  destroy?(): void
  open?(elem: any): void,
  close?(elem: any): void
}


export class MaterializeService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static collapsible() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible')
      var instances = M.Collapsible.init(elems, {
        inDuration: 301
      })
    })
  }

  static collapsiblePopout() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelector('.collapsible popout')
      return M.Collapsible.init(elems, {
        accordion: false
      })
    })
  }

  static modalWindow() {
    var instance
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      return instance = M.Modal.init(elems, {

      })
    })
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initCollapsiblePopout(ref: ElementRef): MaterialInstance {
    return M.Collapsible.init(ref.nativeElement)
  }

}

