var M

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelector('.collapsible');
  var instances = M.Collapsible.init(elems, {
    inDuration: 301
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var elem = document.querySelector('.collapsible.popout');
var instance = M.Collapsible.init(elem, {
  accordion: true
  });
});
