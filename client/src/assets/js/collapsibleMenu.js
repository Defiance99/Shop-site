var M


function collaspsibleMenu() {
  alert(3)
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collaspsible');
    var instances = M.Collapsible.init(elems, {
      inDuration: 301
    });
  });
}
