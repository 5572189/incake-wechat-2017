template.helper('itemFormat', function(item) {
  return JSON.stringify(item);
});

(function(window, document, $, undefined) {
  $(function() {
    // 绑定当日送列表
    fnBindExpress();

    // 选择购买的磅数和数量
    fnInitListener();
  });

  // 绑定当日送列表
  function fnBindExpress() {
    var $oContainer = $('#expressContainer');
    var _data = {
      list: [
        {
          id: 1,
          img: 'assets/imgs/express/cake_01.jpg',
          cn: '女王芝士',
          en: 'QUEEN CHEESE CAKE',
          pounds: [
            {
              pound: 1.5,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约640g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.5,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约1kg',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 2,
          img: 'assets/imgs/express/cake_02.jpg',
          cn: '提拉米苏',
          en: 'TIRAMISU',
          pounds: [
            {
              pound: 1.5,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约640g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.5,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约1kg',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 3,
          img: 'assets/imgs/express/cake_03.jpg',
          cn: '浓情巧克力',
          en: 'LOVE IN CHOCOLATE',
          pounds: [
            {
              pound: 1.2,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约510g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.2,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约950g',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 4,
          img: 'assets/imgs/express/cake_04.jpg',
          cn: '蓝莓优格',
          en: 'BLUEBERRY CHEESE CAKE',
          pounds: [
            {
              pound: 1.5,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约640g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.5,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约1kg',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 5,
          img: 'assets/imgs/express/cake_05.jpg',
          cn: '抹茶利兹',
          en: 'MATCHA LEEDS',
          pounds: [
            {
              pound: 1.2,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约510g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.2,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约950g',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 6,
          img: 'assets/imgs/express/cake_06.jpg',
          cn: '经典双拼',
          en: 'CLASSIC TWO-IN-ONE',
          pounds: [
            {
              pound: 1.2,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约510g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 7,
          img: 'assets/imgs/express/cake_07.jpg',
          cn: '经典奶香',
          en: 'CLASSIC CREAM',
          pounds: [
            {
              pound: 1.2,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约510g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.2,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约950g',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        },
        {
          id: 8,
          img: 'assets/imgs/express/cake_08.jpg',
          cn: '奶香巧克力',
          en: 'CHOCOLATE CAKE',
          pounds: [
            {
              pound: 1.2,
              price: 189,
              desc: [
                '14CM*14CM*4.5CM≈6寸，约510g',
                '免费赠送5份餐具',
                '适合4~5人食用'
              ]
            },
            {
              pound: 2.2,
              price: 279,
              desc: [
                '17.5CM*17.5CM*4.5CM≈8寸，约950g',
                '免费赠送10份餐具',
                '适合7~8人食用'
              ]
            }
          ],
          unit: '磅',
          link: 'javascript:;'
        }
      ]
    };

    var _html = template('tplExpress', _data);
    $oContainer.html(_html);
  }

  // 选择购买的磅数和数量
  function fnInitListener() {
    var $container = $('#expressContainer'),
      $modal = $('#modal'),
      $header = $modal.find('.modal-header'),
      $spec = $modal.find('.spec'),
      $desc = $modal.find('.desc'),
      $minus = $modal.find('.minus'),
      $add = $modal.find('.add'),
      $amount = $modal.find('.amount'),
      $price = $modal.find('.price');

    // 立即购买点击事件
    $container.on('click', '.btn-buy', function(e) {
      var $this = $(this),
        item = JSON.parse($this.attr('data-item'));

      if (!!item) {
        fnBindModal(item, function() {
          $modal.fadeIn();
        });
      }
    });

    // 弹框关闭事件
    $modal.on('click', '.modal-close,.btn-cancel', function(e) {
      $modal.fadeOut();
    });

    // 切换规格
    $spec.on('click', 'li', function(e) {
      var $this = $(this);
      var price = $this.attr('data-price');
      var desc = JSON.parse($this.attr('data-desc'));

      $this
        .addClass('active')
        .siblings()
        .removeClass('active');

      fnBindDesc(desc);
      fnBindAmountAndPrice(1, price);
    });

    // 数量增减
    $minus.on('click', function(e) {
      var $this = $(this),
        amount = $amount.attr('data-amount'),
        price = $price.attr('data-price');

      amount = parseInt(amount, 10);
      price = parseInt(price, 10);

      if (amount == 1) {
        return false;
      }

      amount = amount - 1;
      if (amount <= 1) {
        amount = 1;
        $this.addClass('disabled');
      }

      $amount.text(amount).attr('data-amount', amount);
      $price.text('￥' + amount * price);
    });

    // 数量增加
    $add.on('click', function(e) {
      var $this = $(this),
        amount = $amount.attr('data-amount'),
        price = $price.attr('data-price');

      amount = parseInt(amount, 10);
      price = parseInt(price, 10);

      amount = amount + 1;
      if (amount > 1) {
        $minus.removeClass('disabled');
      }

      $amount.text(amount).attr('data-amount', amount);
      $price.text('￥' + amount * price);
    });

    // 去结算
    $modal.on('click', '.btn-pay', function(e) {
      var id = $header.attr('data-id'),
        name = $header.text(),
        pound = $spec.find('.active').attr('data-pound'),
        amount = $amount.attr('data-amount'),
        price = $price.attr('data-price');

      id = parseInt(id, 10); // 选中商品ID
      pound = parseFloat(pound, 10); // 选中商品磅数
      amount = parseInt(amount, 10); // 选中商品个数
      price = parseInt(price, 10); // 选中商品单价

      var model = {
        id: id,
        name: name,
        pound: pound,
        amount: amount,
        price: price,
        totalCost: amount * price
      };

      console.log(model);

      // TODO 处理计算逻辑
    });

    // 给 Modal 绑定数据
    function fnBindModal(item, callback) {
      // 蛋糕名称
      $header.text(item.cn).attr('data-id', item.id);

      // 磅数规格
      var specHtml = item.pounds.map(function(p, i) {
        var desc = JSON.stringify(p.desc);
        return i == 0
          ? "<li class='active' data-desc='" +
              desc +
              "' data-price='" +
              p.price +
              "' data-pound='" +
              p.pound +
              "'>" +
              p.pound +
              item.unit +
              '</li>'
          : "<li data-desc='" +
              desc +
              "' data-price='" +
              p.price +
              "' data-pound='" +
              p.pound +
              "'>" +
              p.pound +
              item.unit +
              '</li>';
      });
      $spec.html(specHtml);

      // 描述文字
      fnBindDesc(item.pounds[0].desc);

      // 数量和单价
      fnBindAmountAndPrice(1, item.pounds[0].price);

      callback && callback();
    }

    // 绑定描述信息
    function fnBindDesc(desc) {
      var descHtml = desc.map(function(d) {
        return '<li>' + d + '</li>';
      });
      $desc.html(descHtml);
    }

    // 绑定数量和单价
    function fnBindAmountAndPrice(amount, price) {
      $minus.addClass('disabled');
      $amount.text(amount).attr('data-amount', amount);
      $price.text('￥' + price).attr('data-price', price);
    }
  }
})(window, document, jQuery);
