(function(window, document, $, undefined) {
  $(function() {
    init();
  });

  function init() {
    var $formEl = $('#signupForm'),
      $mobileInput = $formEl.find('.txt-mobile'),
      $vcodeInput = $formEl.find('.txt-vcode'),
      $vcodeButton = $formEl.find('.btn-vcode'),
      $confirmButton = $formEl.find('.btn-confirm'),
      $tipEl = $('#succTip'),
      $tipButton = $tipEl.find('.btn-ok');

    // TODO 手机号合法性验证

    // TODO 验证码合法性验证

    // TODO 获取验证码

    // 点击领取按钮点击事件
    $confirmButton.on('click', function(e) {
      $tipEl.fadeIn();
    });

    // 弹出框确定按钮点击事件
    $tipButton.on('click', function(e) {
      $tipEl.fadeOut();
    });
  }
})(window, document, jQuery);