;(function(window, document, $, undefined) {
  $(function() {
    fnInit();
  });

  function fnInit() {
    var $promotion = $('#promotionSection'),
      $idscreen = $('#idscreen'),
      iTop = $idscreen.offset().top;

    $promotion.on('click', function(e) {
      $('html, body').animate({ scrollTop: (iTop - 60) }, 500);
    });
  }
})(window, document, jQuery);