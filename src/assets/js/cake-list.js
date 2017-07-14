(function($, window, document) {

    /**
     * 对规格备注进行格式化
     * @param  spec    要格式化的规格备注
     * @param  format  进行格式化的规格备注字符串
     * @return [description]
     */
    template.helper('commentFormat', function(comment) {
        var str = '';
        if (!!comment && $.isArray(comment)) {
            str += comment.join('*||*');
        }
        return str;
    });


    template.helper('specFormat', function(specs) {
        var str = '';
        if (!!specs && $.isArray(specs)) {
            for (var i = 0, len = specs.length; i < len; i++) {
                var spec = specs[i];
                var comment = spec.comment.join('===');
                if (i !== specs.length - 1) {
                    str += spec.pound + '||' + spec.price + '||' + comment + '|***|';
                } else {
                    str += spec.pound + '||' + spec.price + '||' + comment;
                }
            }
        }
        return str;
    });
    /*end*/
    $(function() {
        var tl = new TimelineLite();

        // 图片懒加载
        var imgLazyLoad = new LazyLoad({
            elements_selector: ".lazy"
        });

        // 节流函数，减少更新频率
        var imgsThrottle = _.throttle(updateViewport, 200);
        $(window).on('scroll', imgsThrottle);

        function updateViewport() {
            imgLazyLoad.update();
        }

        fnBindCakeData(updateViewport);

        // 瑞雪检测 --- 列表页
        fnInitRxList();

        $("#flower-list").on('click', '.car', function() {
            var change = $(this).closest('li').find('.change').html();

            var strSc = $(this).closest('li').attr('data-sc').trim(),
                strRegular = $(this).closest('li').attr('data-regular').trim(),
                hasSc = strSc === '' ? false : true,
                hasRegular = strRegular === '' ? false : true;

            var data = {
                sc: [],
                regular: []
            };

            var groupTmp = [],
                itemTmp
                 = [];

            if (hasSc) {
                groupTmp = strSc.split('|***|');
                for (var i = 0, len = groupTmp.length; i < len; i++) {
                    itemTmp = groupTmp[i].split('||');
                    data.sc.push({
                        pound: itemTmp[0],
                        price: itemTmp[1],
                        comment: itemTmp[2].split('===')
                    });
                }
            }

            if (hasRegular) {
                groupTmp = strRegular.split('|***|');
                for (var i = 0, len = groupTmp.length; i < len; i++) {
                    itemTmp = groupTmp[i].split('||');
                    data.regular.push({
                        pound: itemTmp[0],
                        price: itemTmp[1],
                        comment: itemTmp[2].split('===')
                    });
                }
            }

            handle4BindShade(data,change);

        })

        // 绑定加入购物车弹框数据
        function handle4BindShade(data,change) {
            var _html = template('tplNormsShade', data);
            $('#normsShade').html(_html);
            $(".norms-shade").fadeIn(function(){
                $('.hid_htmlname').val(change);
            });
        }

        //惊喜常规规格
        $("#normsShade").on('click', '.poundage-surprised li', function() {
            $(this).addClass("active").siblings().removeClass("active");
            var data = $(this).attr('data-comment');
            var prices = $(this).attr('data-prices');
            var data_norms = $(this).attr('data-comment').split("||");
            var li_one = $(".pound-surprised").find('li:eq(0)');
            var li_two = $(".pound-surprised").find('li:eq(1)');
            var li_three = $(".pound-surprised").find('li:eq(2)');
            li_one.text(data_norms[0]);
            li_two.text(data_norms[1]);
            li_three.text(data_norms[2]);
            $(".subtract-surprised").removeClass('active');
            $(".number-surprised").text(1);
            $(".cost").text(prices);
        });

        //常规
        $("#normsShade").on('click', '.poundage-normal li', function() {
            $(this).addClass("active").siblings().removeClass("active");
            var data = $(this).attr('data-comment');
            var prices = $(this).attr('data-prices');
            var data_norms = $(this).attr('data-comment').split("||");
            var li_one = $(".pound-normal").find('li:eq(0)');
            var li_two = $(".pound-normal").find('li:eq(1)');
            var li_three = $(".pound-normal").find('li:eq(2)');
            li_one.text(data_norms[0]);
            li_two.text(data_norms[1]);
            li_three.text(data_norms[2]);
            $(".subtract-normal").removeClass('active');
            $(".number-normal").text(1);
            $(".prices").text(prices);
        });

        //蛋糕规则切换
        $("#normsShade").on('click', '#surprised', function() {
            $(this).addClass("active").siblings().removeClass("active");
            $('.poundage-surprised li:first-child').click();
            tl.clear();
            tl.to($(".parcel"), 0.5, {
                'left': 0
            });
        });

        $("#normsShade").on('click', '#normal', function() {
            if ($(this).attr('disabled') === "disabled") {
                return false;
            }
            $('.poundage-normal li:first-child').click();
            $(this).addClass("active").siblings().removeClass("active");
            tl.clear();
            tl.to($(".parcel"), 0.5, {
                'left': '-100%'
            });

        });

        //关闭
        $("#normsShade").on('click', '.close', function() {
            $(".norms-shade").fadeOut();
        });

        $("#flower-list").on("click", '.like', function() {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

        //加减惊喜
        $("#normsShade").on("click", '.add-surprised', function() {
            amout = parseInt($(".number-surprised").text());
            amout++;
            if (amout > 1) {
                $(".subtract-surprised").removeClass('disabled').addClass('active');
            }
            $(".number-surprised").text(amout);
        });
        $("#normsShade").on("click", '.subtract-surprised', function() {
            if ($(this).hasClass("disabled")) {
                return false;
            }
            amout = parseInt($(".number-surprised").text());
            if (amout === 1) {
                $(this).addClass('disabled').removeClass('active');
                return false;
            }
            amout--;
            if (amout <= 1) {
                $(this).addClass('disabled').removeClass('active');
            }
            $(".number-surprised").text(amout);
        });
        //加减常规
        $("#normsShade").on("click", '.add-normal', function() {
            amout = parseInt($(".number-normal").text());
            amout++;
            if (amout > 1) {
                $(".subtract-normal").removeClass('disabled').addClass('active');
            }
            $(".number-normal").text(amout);
        });
        $("#normsShade").on("click", '.subtract-normal', function() {
            if ($(this).hasClass("disabled")) {
                return false;
            }
            amout = parseInt($(".number-normal").text());
            if (amout === 1) {
                $(this).addClass('disabled').removeClass('active');
                return false;
            }
            amout--;
            if (amout <= 1) {
                $(this).addClass('disabled').removeClass('active');
            }
            $(".number-normal").text(amout);
        });
    });

    function fnBindCakeData(cb4Updateviewport) {
        var data = {
            list: [{
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About LoveLoveLoveLoveLoveLove',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }, {
                linkimg: "assets/imgs/index/cake.png",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个',
                specs: {
                    sc: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ],
                    regular: [{
                            pound: 1.5,
                            price: 189,
                            comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
                        },
                        {
                            pound: 2.5,
                            price: 279,
                            comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
                        },
                        {
                            pound: 3.5,
                            price: 429,
                            comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
                        },
                        {
                            pound: 5.5,
                            price: 709,
                            comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
                        }
                    ]
                }
            }]
        }

        var $cake = $("#flower-list");
        var _html = template('tplCake', data);
        $cake.append(_html);

        cb4Updateviewport && cb4Updateviewport();
    }

    //瑞雪检测 --- 列表页
    function fnInitRxList(){
        if(!rxStream){
            return false;
        }
        var $hid_username = $('#hid_username');

        var o_username = '',
            o_mobile = '',
            b_device = 'wap';

        if($hid_username.length > 0){
            o_username = $hid_username.val();
            o_mobile = $hid_username.val();
        }

        //加入购物车
        $('#normsShade').on('click','.buy',function(e){
            var b_productname = '',
                b_product_size = '',
                b_productprice_d = '',
                b_productprice_m = 0,
                b_productCount_d = 0,
                b_productstyle = '';

            var $norms = $(this).closest('.norms'),
                $item = $norms.find('.headline'),
                $wrapper = $norms.find('.parcel'),
                currType = $item.find('li').filter('.active').index(),
                $specbox = $wrapper.find('.spec-box').eq(currType),
                $pounditem = $specbox.find('.item-rule li').filter('.active');

            b_productname = $norms.find('.hid_htmlname').val();
            b_product_size = $pounditem.html();
            b_productprice_d = $pounditem.attr('data-prices');
            b_productprice_m = parseFloat(b_productprice_d, 10).toFixed(2);
            b_productCount_d = $specbox.find('.number_en').html();
            b_productstyle = $item.find('li').filter('.active').html().trim();
            // console.log(b_productname)
            // console.log(b_product_size)
            // console.log(b_productprice_d)
            // console.log(b_productprice_m)
            // console.log(b_productCount_d)
            // console.log(b_productstyle)
            // send to rxstream server
			rxStream.track('add_shoppingcart', {
				subject: {
					o_username: o_username,
					o_mobile: o_mobile
				},
				properties: {
                      b_productname: b_productname,
                      b_product_size: b_product_size,
                      b_productprice_d: b_productprice_d,
                      b_productprice_m: b_productprice_m,
                      b_productCount_d: b_productCount_d,
                      b_productstyle: b_productstyle,
					  b_device: b_device
				}
			});

            e.stopPropagation();

        });

        //立即购买
        $('#normsShade').on('click','.add-shop',function(e){
            var b_productname = '',
                b_product_size = '',
                b_productprice_d = '',
                b_productprice_m = 0,
                b_productCount_d = 0,
                b_productstyle = '';

            var $norms = $(this).closest('.norms'),
                $item = $norms.find('.headline'),
                $wrapper = $norms.find('.parcel'),
                currType = $item.find('li').filter('.active').index(),
                $specbox = $wrapper.find('.spec-box').eq(currType),
                $pounditem = $specbox.find('.item-rule li').filter('.active');

            b_productname = $norms.find('.hid_htmlname').val();
            b_product_size = $pounditem.html();
            b_productprice_d = $pounditem.attr('data-prices');
            b_productprice_m = parseFloat(b_productprice_d, 10).toFixed(2);
            b_productCount_d = $specbox.find('.number_en').html();
            b_productstyle = $item.find('li').filter('.active').html().trim();
            // console.log(b_productname)
            // console.log(b_product_size)
            // console.log(b_productprice_d)
            // console.log(b_productprice_m)
            // console.log(b_productCount_d)
            // console.log(b_productstyle)
            // send to rxstream server
			rxStream.track('add_shoppingcart', {
				subject: {
					o_username: o_username,
					o_mobile: o_mobile
				},
				properties: {
                      b_productname: b_productname,
                      b_product_size: b_product_size,
                      b_productprice_d: b_productprice_d,
                      b_productprice_m: b_productprice_m,
                      b_productCount_d: b_productCount_d,
                      b_productstyle: b_productstyle,
					  b_device: b_device
				}
			});

            e.stopPropagation();

        });

        //喜欢
        $('#flower-list').on('click','.like',function(e){
            var b_productname = '',
                b_linkornot = '';
            var $item = $(this).closest('li');

            b_productname = $item.find('.change').html();
            b_linkornot = $(this).hasClass('active') ? '取消喜欢' : '喜欢';
            // console.log(b_productname)
            // console.log(b_linkornot)
            // send to rxstream server
			rxStream.track('like', {
    				subject: {
    					o_username: o_username,
    					o_mobile: o_mobile
    				},
    				properties: {
                        b_productname: b_productname,
                        b_linkornot: b_linkornot,
    					b_device: b_device
    				}
    			});

          e.preventDefault();
          e.stopPropagation();
        });
    }
})(jQuery, window, document);
