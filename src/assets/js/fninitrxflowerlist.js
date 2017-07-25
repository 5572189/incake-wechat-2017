(function($, window, document) {
    $(function() {
        // 瑞雪检测 --- 详情页
        fnInitRxflowerlist();
    });

    function fnInitRxflowerlist() {
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
        //加入购物车
        $('#normsShade').on('click', '.add_shopCart', function(e) {
            var b_productname = '',
                b_product_size = '',
                b_productCount_d = '',
                b_productprice_d =0,
                b_productprice_m =0,
                b_productstyle = '';

            b_productstyle = '常规款';
            b_productname = $('#cakeName').val();
            b_product_size = $(this).closest('div').find('.colors li').filter('.active').html();
            b_productCount_d = $(this).closest('div').find('ul').find('.number-flower').html();
            b_productprice_d = $('#cakePirce').val();
            b_productprice_m = parseFloat(b_productprice_d, 10).toFixed(2);

            rxStream.track('add_shoppingcart', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_productstyle: b_productstyle,
                    b_productname: b_productname,
                    b_product_size: b_product_size,
                    b_productCount_d: b_productCount_d,
                    b_productprice_d: b_productprice_d,
                    b_productprice_m:b_productprice_m,
                    b_device: b_device
                }
            });

            e.stopPropagation();
        });
        //立即购买
        $('#normsShade').on('click', '.buy_Now', function(e) {
            var b_productname = '',
                b_product_size = '',
                b_productstyle ='',
                b_productprice_d =0,
                b_productprice_m =0,
                b_productCount_d = '';

            b_productstyle = '常规款';
            b_productname = $('#cakeName').val();
            b_product_size = $(this).closest('div').find('.colors li').filter('.active').html();
            b_productCount_d = $(this).closest('div').find('ul').find('.number-flower').html();
            b_productprice_d =$('#cakePirce').val();
            b_productprice_m = parseFloat(b_productprice_d, 10).toFixed(2);

            rxStream.track('buy_Now', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_productstyle: b_productstyle,
                    b_productname: b_productname,
                    b_product_size: b_product_size,
                    b_productCount_d: b_productCount_d,
                    b_productprice_d : b_productprice_d,
                    b_productprice_m : b_productprice_m,
                    b_device: b_device
                }
            });

            e.stopPropagation();
        });

        $('#flower-list').on('click', '.like', function(e) {
            var b_productname = '',
                b_linkornot = '';

            b_productname = $(this).closest('li').find('.change').html();
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

        // 继续购物
        $('#shade').on('click', '.visit_again', function(e) {

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
