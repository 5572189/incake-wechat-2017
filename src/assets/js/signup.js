(function(window, document, $, undefined) {
  $(function() {
    init();
    fnInitSlideLock();
  });

  function init() {
    var $formEl = $('#signupForm'),
      $mobileInput = $formEl.find('.txt-mobile'),
      $vcodeInput = $formEl.find('.txt-vcode'),
      $vcodeButton = $formEl.find('.btn-vcode'),
      $confirmButton = $formEl.find('.btn-confirm'),
      $tipEl = $('#succTip'),
      $tipButton = $tipEl.find('.btn-ok');

    // 点击领取按钮点击事件
    $confirmButton.on('click', function(e) {
      $tipEl.fadeIn();
    });

    // 弹出框确定按钮点击事件
    $tipButton.on('click', function(e) {
      $tipEl.fadeOut();
    });
  }

  // 滑动解锁
  function fnInitSlideLock() {
    var $oMaskAction = $('#signupForm').find('.action-slider'),
      $oBtn = $oMaskAction.find('.button'),
      $oSlider = $oMaskAction.find('.slider'),
      $oTrack = $oMaskAction.find('.track'),
      $bgGreen = $oMaskAction.find('.bg-green'),
      disX, iLeft,
      time = 10,
      isMoving = false,
      isCompleted = false;

    $oBtn.on('touchstart.action', function(e) {
      if (isCompleted || isMoving) {
        return false;
      }

      var touches = e.originalEvent.touches[0];
      disX = touches.clientX - $oBtn.position().left;
      $oBtn.removeClass('button-on');
      $oTrack.removeClass('track-on');

      document.addEventListener("touchmove", defaultEvent, false); //阻止页面的滑动默认事件
    });

    $oBtn.on("touchmove.action", function(e) {
      if (isCompleted) {
        return false;
      }

      isMoving = true;

      var touches = e.originalEvent.touches[0];
      iLeft = touches.clientX - disX;
      var disW = $oSlider.width() - $oBtn.width();
      if (iLeft <= 0) {
        iLeft = 0;
        $oBtn.addClass('avtive');
      } else if (iLeft > disW) {
        iLeft = disW;
      }

      $oBtn.css({
        left: iLeft + 'px'
      });
      $oTrack.css({
        width: iLeft + 'px'
      });
    });

    $oBtn.on("touchend.action", function() {
      if (isCompleted) {
        return false;
      }
      isMoving = false;
      var disW = $oSlider.width() - $oBtn.width();
      if (iLeft >= disW) {
        $oBtn.removeClass('active').css({
          left: disW + 'px'
        });
        $oTrack.width(disW);
        isCompleted = true;

        verification();
      } else {
        $oBtn.addClass('active').css({
          left: '0'
        });
        $oTrack.css({
          width: '0'
        });
      }
      $oBtn.addClass('button-on');
      $oTrack.addClass('track-on');
      document.removeEventListener("touchmove", defaultEvent, false); //阻止页面的滑动默认事件
    });

    function defaultEvent(e) {
      e.preventDefault();
    }

    // 滑动到最右边时处理函数
    function verification() {
      var $mobile = $('.txt-mobile'),
        txtMobile = $mobile.val().trim(),
        mobileReg = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/;

      // 手机号合法性验证
      if (txtMobile === '') {
        $bgGreen.text('手机号码不能为空');
        setTimeout(fnReset, 2000);
        return false;
      }

      // 手机号合法性验证
      if (!mobileReg.test(txtMobile)) {
        $bgGreen.text('请输入正确的手机号码');
        setTimeout(fnReset, 2000);
        return false;
      }

      // TODO 处理发送短信验证码逻辑
      handler4CountDown($bgGreen, 90, fnReset);
    }

    function fnReset() {
      $oBtn.addClass('active').css({
        left: '0'
      });
      $oTrack.css({
        width: '0'
      });
      $bgGreen.empty();
      isCompleted = false;
    }
  }

  /**
  * 倒计时处理程序
  * @param  {[type]} $oTarget        [目标元素]
  * @param  {[type]} timeToCountDown [倒计时秒数]
  * @param  {[type]} callback        [倒计时结束后回调函数]
  * @return {[type]}                 [description]
  */
  function handler4CountDown($oTarget, timeToCountDown, callback) {
    var timer = null;
    var beginTime = new Date().getTime();
    var endTime = beginTime + timeToCountDown * 1000;
    var curShowTimeSeconds = 0;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    timer = setInterval(function() {
      render();
      update();
    }, 50);

    function update() {
      var nextShowTimeSeconds = getCurrentShowTimeSeconds();
      var nextSeconds = nextShowTimeSeconds;
      var curSeconds = curShowTimeSeconds;
      if (nextSeconds !== curSeconds) {
        curShowTimeSeconds = nextShowTimeSeconds;
      }
    }

    function render() {
      var seconds = curShowTimeSeconds;
      if (seconds === 0) {
        clearInterval(timer);

        // 倒计时完成把isSend设成空字符串
        $oTarget.text('');

        callback && callback();
      } else {
        $oTarget.html('短信验证码已发送，' + seconds + 's 后重新获取');
      }
    }

    function getCurrentShowTimeSeconds() {
      var curTime = new Date().getTime();
      var ret = endTime - curTime;
      ret = Math.round(ret / 1000);
      return ret >= 0 ? ret : 0;
    }
  }
})(window, document, jQuery);