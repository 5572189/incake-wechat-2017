;(function($, window, document){
    $(function(){
        // 瑞雪检测 --- 购物车
        fnInitRxShoppingCar();
    });

    function fnInitRxShoppingCar(){
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

        //去结算
        $('.close').on('click','#submitOrder',function(index, item){
            var $cake_list = $('#cake_list'),
                $items = $cake_list.find('.item'),
                shoppingcart = [];
                var $ckbox = $items.find('.icons.active').closest('li');

            $ckbox.each(function(index, item) {
                var b_productstyle = '',
                    b_productname = '',
                    b_product_size = '',
                    b_productprice_d = '',
                    b_productprice_m = 0,
                    b_productCount_d = 0;

                    b_productstyle = $(item).attr('data-style').trim();
                    b_productname = $(item).attr('data-name').trim();
                    b_product_size = $(item).attr('data-size').trim();
                    b_productprice_d = $(item).attr('data-price').trim();
                    b_productprice_m = parseFloat($(item).attr('data-price').trim()).toFixed(2);
                    b_productCount_d = $(item).find('.number').html();

                    shoppingcart.push({
                      b_productstyle: b_productstyle,
                      b_productname: b_productname,
                      b_product_size: b_product_size,
                      b_productprice_d: b_productprice_d,
                      b_productprice_m: b_productprice_m,
                      b_productCount_d: b_productCount_d,
                      b_device: b_device
                    });
              });
                // send submit_shoppingcart to rxstream server
                 $.each(shoppingcart, function(index, detail) {
                   rxStream.track('submit_shoppingcart', {
                           subject: {
                               o_username: o_username,
                               o_mobile: o_mobile
                           },
                           properties: detail
                       });
                 });

        });

    }
})(jQuery, window, document);
