(function(window, document, $, undefined) {
  $(function() {
    // 新品
    fnBindNew();

    // 热卖
    fnBindHot();

    // 下午茶
    fnBindTea();
  });

  // 绑定新品列表
  function fnBindNew() {
    var $oNewList = $('#newList');
    var _data = {
      list: [
        {
          img: 'assets/imgs/szone/cake_01.jpg',
          name: {
            cn: '芒果绵绵雪',
            en: 'MANGO CREAM CAKE'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_02.jpg',
          name: {
            cn: '红茶玛奇朵',
            en: 'BLACK TEA MACCHIATO'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_03.jpg',
          name: {
            cn: '洛丽塔',
            en: 'LOLITA'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_04.jpg',
          name: {
            cn: '少女棒棒糖',
            en: 'LOLIPOP'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        }
      ]
    };

    var _html = template('tplList', _data);
    $oNewList.html(_html);
  }

  // 绑定热卖列表
  function fnBindHot() {
    var $oHotList = $('#hotList');
    var _data = {
      list: [
        {
          img: 'assets/imgs/szone/cake_05.jpg',
          name: {
            cn: '挚爱红丝绒',
            en: 'LOVE RED VELVET'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_06.jpg',
          name: {
            cn: '经典奶香',
            en: 'CLASSIC CREAM'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_07.jpg',
          name: {
            cn: '经典双拼',
            en: 'CLASSIC TWO-IN-ONE'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_08.jpg',
          name: {
            cn: '哈尼小熊',
            en: 'HONEY BEAR'
          },
          units: [
            {
              pound: '1.2磅',
              currentPrice: 129,
              originalPrice: 189
            },
            {
              pound: '2.2磅',
              currentPrice: 190,
              originalPrice: 279
            }
          ],
          link: 'javascript:;'
        }
      ]
    };

    var _html = template('tplList', _data);
    $oHotList.html(_html);
  }

  // 绑定下午茶列表
  function fnBindTea() {
    var $oTeaList = $('#teaList');
    var _data = {
      list: [
        {
          img: 'assets/imgs/szone/cake_09.jpg',
          name: {
            cn: '小凤鲜',
            en: 'PINEAPPLE PASTRY'
          },
          units: [
            {
              pound: '盒',
              currentPrice: 50,
              originalPrice: 189
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_10.jpg',
          name: {
            cn: '小黄酥',
            en: 'NOUGAT BISCUIT'
          },
          units: [
            {
              pound: '盒',
              currentPrice: 50,
              originalPrice: 189
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_11.jpg',
          name: {
            cn: '小奶喵',
            en: 'LITTLE MILK CAT'
          },
          units: [
            {
              pound: '盒',
              currentPrice: 50,
              originalPrice: 189
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_12.jpg',
          name: {
            cn: '半熟芝士',
            en: 'HANJUKE CHEESE'
          },
          units: [
            {
              pound: '2盒',
              currentPrice: 68,
              originalPrice: 189
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_13.jpg',
          name: {
            cn: '榴莲千层',
            en: 'MANGO CREAM CAKE'
          },
          units: [
            {
              pound: '个',
              currentPrice: 109,
              originalPrice: 189
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_14.jpg',
          name: {
            cn: '香草瑞士卷',
            en: 'VANILLA SWISS ROLL'
          },
          units: [
            {
              pound: '4只',
              currentPrice: 58,
              originalPrice: 68
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_15.jpg',
          name: {
            cn: '巧克力瑞士卷',
            en: 'CHOCOLATE SWISS ROLL'
          },
          units: [
            {
              pound: '4只',
              currentPrice: 58,
              originalPrice: 68
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_16.jpg',
          name: {
            cn: '经典小方',
            en: 'CLASSIC SLICES'
          },
          units: [
            {
              pound: '4只',
              currentPrice: 58,
              originalPrice: 68
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_17.jpg',
          name: {
            cn: '甜心',
            en: 'SWEET HEART'
          },
          units: [
            {
              pound: '4只',
              currentPrice: 58,
              originalPrice: 68
            }
          ],
          link: 'javascript:;'
        },
        {
          img: 'assets/imgs/szone/cake_18.jpg',
          name: {
            cn: '草莓甜心',
            en: 'STRAWBERRY SWEET HEART'
          },
          units: [
            {
              pound: '4只',
              currentPrice: 58,
              originalPrice: 68
            }
          ],
          link: 'javascript:;'
        }
      ]
    };

    var _html = template('tplList', _data);
    $oTeaList.html(_html);
  }
})(window, document, jQuery);
