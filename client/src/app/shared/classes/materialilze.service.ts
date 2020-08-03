declare var M

export class MaterializeService {
  static collapsibleA() {
    document.addEventListener('DOMContentLoaded', function() {
      var elem = document.querySelector('.collapsible.popout');
    var instance = M.Collapsible.init(elem, {
      accordion: false
      });
    });
  }



  static toast(message: string) {
    M.toast({html: message})
  }
}

