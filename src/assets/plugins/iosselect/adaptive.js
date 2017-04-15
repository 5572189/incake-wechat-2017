
(function (win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    // 我们设置的布局视口与理想视口的像素比
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    var scale = parseFloat(match[1]);
    var dpr = parseInt(1 / scale);
    var newBase = 10;

    function setRem() {
        // 布局视口
        // var layoutView = docEl.clientWidth; 也可以 获取布局视口的宽度
        var layoutView;
        if (lib.maxWidth) {
            layoutView = Math.min(docEl.getBoundingClientRect().width, lib.maxWidth * dpr);
        }
        else {
            layoutView = docEl.getBoundingClientRect().width;
        }
        newBase = 75 * layoutView / lib.desinWidth;
        // 重新设置rem后的回调方法
        lib.setRemCallback&&lib.setRemCallback();
        lib.newBase = newBase;
    }
    var tid;
    lib.desinWidth = 750;
    lib.init = function () {
        // resize的时候重新设置rem基准值
        // 触发orientationchange 事件时也会触发resize，故不需要再添加此事件了
        win.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(setRem, 300);
        }, false);
        // 浏览器缓存中读取时也需要重新设置rem基准值
        win.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(setRem, 300);
            }
        }, false);
        // 设置rem值
        setRem();
    };
})(window, window['adaptive'] || (window['adaptive'] = {}));
