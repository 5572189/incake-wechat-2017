;(function($, window, document){
    $(function(){
        // 瑞雪检测 --- 订单提交
    	fnInitRxOrderSubmit();
    });
    // 瑞雪检测 --- 订单提交
	function fnInitRxOrderSubmit(){
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
        $('#content').on('click','.affirm-pay',function(index, item){
            var $content =$(this).closest('.data'),
                $items = $content.find('.cake-li'),
                pay_order_detail =[],
                b_order_count = 0,
                b_orderprice = 0,
                b_payment = '';

                b_order_count = $('#content').find('.num').find('span').html();
                b_orderprice = $('#content').find('.price').find('.cakePrice').html();
                b_payment = $('.pay-shade').find('.pay').find('ul li.active').html();

            rxStream.track('pay_order', {
                subject: {
                    o_username: o_username,
                    o_mobile: o_mobile
                },
                properties: {
                    b_order_count: b_order_count,
                    b_orderprice: b_orderprice,
                    b_payment : b_payment,
                    b_device: b_device
                }
            });

            $items.each(function(index, item){
                var b_productname = '',
                    b_product_size = '',
                    b_allproductprice_d = '',
                    b_order_count = 0,
                    b_allproductprice_m ='';

                b_productname = $(item).find('.cakeNake').html();
                b_product_size = $(item).find('p:last-child').find('span:first-child').find('span').html();
                b_order_count = $(item).find('.cakeNumber').html();
                b_allproductprice_d = $(item).find('.oneCakePirce').html();
                b_allproductprice_m = Math.floor(b_allproductprice_d.substring(1)).toFixed(2);

                pay_order_detail.push({
                  b_productname: b_productname,
                  b_product_size: b_product_size,
                  b_allproductprice_d: b_allproductprice_d,
                  b_order_count : b_order_count,
                  b_allproductprice_m: b_allproductprice_m,
                  b_device: b_device
                });
            });
            $.each(pay_order_detail, function(index, detail) {
              rxStream.track('pay_order_detail', {
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
