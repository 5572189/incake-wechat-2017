(function(window, document, $, undefined) {
  $(function() {
    // 新品
    fnBindExpress();
  });

  // 绑定当日送列表
  function fnBindExpress() {
    var $oContainer = $('#expressContainer');
    var _data = {
      list: [
        {
          img: 'assets/imgs/express/cake_01.jpg',
          cn: '女王芝士',
          en: 'QUEEN CHEESE CAKE',
          pounds: [1.5, 2.5],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_02.jpg',
          cn: '提拉米苏',
          en: 'TIRAMISU',
          pounds: [1.5, 2.5],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_03.jpg',
          cn: '浓情巧克力',
          en: 'LOVE IN CHOCOLATE',
          pounds: [1.2, 2.2],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_04.jpg',
          cn: '蓝莓优格',
          en: 'BLUEBERRY CHEESE CAKE',
          pounds: [1.5, 2.5],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_05.jpg',
          cn: '抹茶利兹',
          en: 'MATCHA LEEDS',
          pounds: [1.2, 2.2],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_06.jpg',
          cn: '经典双拼',
          en: 'CLASSIC TWO-IN-ONE',
          pounds: [1.2],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_07.jpg',
          cn: '经典奶香',
          en: 'CLASSIC CREAM',
          pounds: [1.2, 2.2],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/express/cake_08.jpg',
          cn: '奶香巧克力',
          en: 'CHOCOLATE CAKE',
          pounds: [1.2, 2.2],
          unit: '磅',
          link: 'javascript:;'
        }
      ]
    };

    var _html = template('tplExpress', _data);
    $oContainer.append(_html);
  }
})(window, document, jQuery);
