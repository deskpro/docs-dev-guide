// LiveReload does not keep track of the scroll position when the
// page is reloaded, which is a pain while editing. The following
// two events will restore the position.
window.addEventListener('beforeunload', function() {
  if (!window.LiveReload) {
    return;
  }
  
  var location = document.location.href;
  var element  = document.querySelector('.body-inner');
  localStorage.setItem('scrollPosition', JSON.stringify({
    location:  location,
    scrollTop: element.scrollTop
  }));
});

window.addEventListener("load", function() {
  if (!window.LiveReload) {
    return;
  }
  
  var pos = localStorage.getItem('scrollPosition');
  if (pos) {
    localStorage.removeItem('scrollPosition');
    
    pos = JSON.parse(pos);
    if (pos.location === document.location.href) {
      var element = document.querySelector('.body-inner');
      element.scrollTop = pos.scrollTop;
    }
  }
});
