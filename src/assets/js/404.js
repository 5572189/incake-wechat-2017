(function(window, $, undefined) {
  $(function() {
    fnInitClock();
  });

  function fnInitClock() {
    var $page = $('#project'),
      $msg = $page.find('.catch-msg'),
      $time = $msg.find('span'),
      iSecond = 5,
      timer = null;

    timer = setInterval(function() {
      iSecond = iSecond - 1;
      $time.html(iSecond);

      if(iSecond === 0) {
        clearInterval(timer);
        // window.location.href = 'http://www.incake.net';
      }
    }, 1000);

  }
})(window, jQuery);
