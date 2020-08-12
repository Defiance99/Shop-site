var M

function collapsiblePopout() {
  alert(2);
  document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelector('.collapsible.popout');
    var instance = M.Collapsible.init(elem, {
    accordion: false
    });
  });
}
