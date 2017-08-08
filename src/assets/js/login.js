$(function() {

    var $oMaskAction = $('#maskAction'),
        $oBtn = $oMaskAction.find('.button'),
        $oSlider = $oMaskAction.find('.slider'),
        $oTrack = $oMaskAction.find('.track'),
        $bg_green = $oMaskAction.find('.bg-green'),
        iW, iLeft,
        count = 0, // 验证重复获取验证码
        time = 89,
        isMoving = false,
        isCompleted = false;



    $oBtn.on('touchstart.action', function(e) {
        if (isCompleted) {
                return false;
            }

        isMoving = true;

        var touches = e.originalEvent.touches[0];
        iW = touches.clientX - $oBtn.offset().left;
        $oBtn.removeClass('button-on');
        $oTrack.removeClass('track-on');

        document.addEventListener("touchmove", defaultEvent, false); //阻止页面的滑动默认事件
    });

    $oBtn.on("touchmove.action", function(e) {
        if (isCompleted || !isMoving) {
            return false;
        }

        $oBtn.removeClass('active');
        var touches = e.originalEvent.touches[0];
        iLeft = touches.clientX - iW;
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
            $oBtn.css({
                left: disW + 'px'
            });
            $oTrack.width(disW);

            verification($bg_green);
            isCompleted = true;
        } else {
            $oBtn.css({
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
    function verification(obj) {
        if (count == 0) {
            count = 1;
            obj.text('89" 后重新发送');

            var interval = setInterval(function() {
                obj.text(time-- + '" 后重新发送');
                if (time == -1) {
                    count = 0;
                    clearInterval(interval);
                    time = 89;
                    obj.text('向右滑动获取动态验证码');
                }
            }, 1000);
        }
    }
});
