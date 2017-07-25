;
(function($, window, document) {
    $(function() {
        // 瑞雪检测 --- 首页
        fnInitRxHome();
    });

    function fnInitRxHome() {
        if (!rxStream) {
            return false;
        }
        var $hid_username = $('#userName');

        var o_username = '',
            o_mobile = '',
            b_device = 'wap';

        if ($hid_username.length > 0) {
            o_username = $hid_username.val();
            o_mobile = $hid_username.val();
        }
        //访问首页
        (function() {
            rxStream.track('visit_homepage', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_device: b_device
                }
            });
        })();

        //banner 广告
        $('.swiper-container').on('click', '.swiper-slide', function(e) {
            var slidelen = $(this).closest('.swiper-wrapper').find('.swiper-slide:not(.swiper-slide-duplicate)').length;
            b_ad_number = 0,
                b_ad_type = '';

            b_ad_number = $(this).index();
            if (b_ad_number > slidelen) {
                b_ad_number = b_ad_number - slidelen;
            }

            b_ad_title = $(this).children('a').attr('data-adtitle').trim();
            b_ad_type = $(this).children('a').attr('data-adtype').trim();
            // console.log(b_ad_title)
            // console.log(b_ad_type)
            // send to rxstream server
            rxStream.track('ad_banner', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_ad_title: b_ad_title,
                    b_ad_number: b_ad_number,
                    b_ad_type: b_ad_type,
                    b_device: b_device
                }
            });
        });

        // 首页分类入口
        $('#idxSection').on('click', 'a', function() {
            var b_menu = $(this).attr('data-name').trim();
            //console.log(b_menu)
            // send to rxstream server
            rxStream.track('ad_category', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_menu: b_menu,
                    b_device: b_device
                }
            });
        });

        //立即购买
        $('#normsShade').on('click', '.buy', function(e) {
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

            b_productname = $norms.find('.hid_name').val();
            b_product_size = $pounditem.html();
            b_productprice_d = $('.spec-box').find('.cost').html();
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
            rxStream.track('buy_Now', {
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

        //加入购物车
        $('#normsShade').on('click', '.add-shop', function(e) {
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

            b_productname = $norms.find('.hid_name').val();
            b_product_size = $pounditem.html();
            b_productprice_d = $('.spec-box').find('.cost').html();
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
        $('#main').on('click', '.collect', function(e) {
            var b_productname = '',
                b_linkornot = '';
            var $item = $(this).closest('.pic');

            b_productname = $item.find('.change').html();
            b_linkornot = $(this).hasClass('selected') ? '取消喜欢' : '喜欢';
            //console.log(b_productname)
            //console.log(b_linkornot)
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

        //定位城市
        $('.city-two').find('li').on('click', function() {
            var b_positioncity = '';

            b_positioncity = $(this).text().trim();
            //console.log(b_positioncity)
            // send to rxstream server
            rxStream.track('positioncity', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_positioncity: b_positioncity,
                    b_device: b_device
                }
            });
        });

        //首页筛选
        $('.list-two').find('.kind').click(function() {
            var b_menu = '';
            b_menu = $(this).text().trim();
            //console.log(b_menu);
            rxStream.track('positioncity', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_menu: b_menu,
                    b_device: b_device
                }
            });
        });

        // 继续购物
        $('.pop-up-layout').on('click', '.cancle_dialog', function(e) {
            // send to rxstream server
            rxStream.track('keepbuy', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_device: b_device
                }
            });
        });
    }
})(jQuery, window, document);
