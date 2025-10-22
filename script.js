$(document).ready(function() {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $('#reset');
    var overlay = $('.overlay');
    var isExpanded = false;

    btn_open.on("click", function() {
        if(!envelope.hasClass('open')) {
            envelope.addClass('open').removeClass('close');
        }
    });

    btn_reset.on("click", function() {
        if(envelope.hasClass('expanded')) {
            returnLetter();
        } else {
            envelope.removeClass('open').addClass('close');
        }
    });


    envelope.on("click", function() {
        if(envelope.hasClass('open') && !envelope.hasClass('expanded') && !isExpanded) {
            envelope.addClass('expanded');
            overlay.fadeIn(300);
            isExpanded = true;
        } else if(envelope.hasClass('expanded') && isExpanded) {
            returnLetter();
        }
    });


    overlay.on("click", returnLetter);

    function returnLetter() {
        envelope.addClass('returning');
        
        setTimeout(function() {
            envelope.removeClass('expanded returning');
            overlay.fadeOut(300);
            isExpanded = false;
        }, 800); 
    }
});

(function() {
  const overlay = document.getElementById('rotate-overlay');

 
  const MOBILE_WIDTH_MAX = 900; // px — sesuaikan bila perlu

  function isMobileWidth() {
    return window.innerWidth <= MOBILE_WIDTH_MAX;
  }


  function isLandscape() {

    if (window.screen && window.screen.orientation && typeof window.screen.orientation.type === 'string') {
      return window.screen.orientation.type.startsWith('landscape');
    }
    return window.matchMedia && window.matchMedia('(orientation: landscape)').matches;
  }

  function updateOverlay() {

    if (isMobileWidth() && !isLandscape()) {
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }


  window.addEventListener('load', updateOverlay, { passive: true });

 
  window.addEventListener('resize', function() {
    
    clearTimeout(window.__rotateDebounce);
    window.__rotateDebounce = setTimeout(updateOverlay, 120);
  }, { passive: true });


  window.addEventListener('orientationchange', function() {
    setTimeout(updateOverlay, 200);
  }, { passive: true });


  overlay.addEventListener('touchmove', function(e) {

    e.preventDefault();
  }, { passive: false });

})();
