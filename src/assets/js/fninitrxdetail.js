;(function($, window, document){
    $(function(){
        // 瑞雪检测 --- 详情页
        fnInitRxDetail();

        $('#footer').on('click','.heart',function(){
            var isFavored =$(this).hasClass("active");
            fnInitRxFavor(isFavored);
        });
    });
    // 瑞雪检测 --- 详情页
    function fnInitRxDetail(){
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

        // 访问详情页
      (function() {
        var b_productname = '';

        b_productname = $('.name').find('.change').html().trim();

        // send to rxstream server
            rxStream.track('view_detail', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_productname: b_productname,
                    b_device: b_device
                }
            });
      })();
        //立即购买
        $('#footer').on('click','.buy',function(e){
            var $specifics = $('.name_content').find('.first_ul').find('.first_li'),
                $name = $('.name_content').find('.first_ul').find('.two_li'),
                $amount = $('.name_content').find('.first_ul').find('.last_li');

            var b_productname = '',
                b_product_size = '',
                b_productprice_d = '',
                b_productprice_m = 0,
                b_productCount_d = 0,
                b_productstyle = '';

            b_productname = $('.name').find('.change').html().trim();
            b_product_size = $specifics.find('.content_li').find('li').filter('.active').html().trim();
            b_productprice_d = $('.name').find('#title').html();
            b_productprice_m = parseFloat(b_productprice_d, 10).toFixed(2);
            b_productCount_d = parseInt($amount.find('.number').val(), 10);
            b_productstyle = $name.find('li.active').find('.name').html().trim();

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
        //加入购物车
        $('#footer').on('click','.add-shop',function(e){
            var $specifics = $('.name_content').find('.first_ul').find('.first_li'),
                $name = $('.name_content').find('.first_ul').find('.two_li'),
                $amount = $('.name_content').find('.first_ul').find('.last_li');

            var b_productname = '',
                b_product_size = '',
                b_productprice_d = '',
                b_productprice_m = 0,
                b_productCount_d = 0,
                b_productstyle = '';

            b_productname = $('.name').find('.change').html().trim();
            b_product_size = $specifics.find('.content_li').find('li').filter('.active').html().trim();
            b_productprice_d = $('.name').find('#title').html();
            b_productprice_m = parseFloat(b_productprice_d, 10).toFixed(2);
            b_productCount_d = parseInt($amount.find('.number').val(), 10);
            b_productstyle = $name.find('li.active').find('.name').html().trim();

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
    }

    function fnInitRxFavor(isFavored) {
        if(!rxStream){
          return false;
      }
      var $hid_username = $('#userName');

      var o_username = '',
          o_mobile = '',
          b_device = 'wap';

      if($hid_username.length > 0){
          o_username = $hid_username.val();
          o_mobile = $hid_username.val();
      }

      // 喜欢
      var b_productname = '',
        b_linkornot = '';

      b_productname = $('.name').find('.change').html().trim();
      b_linkornot = isFavored ? '喜欢' : '取消喜欢';

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
    }

})(jQuery, window, document);
