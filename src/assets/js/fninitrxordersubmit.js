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
        $('.closes').on('click','#submitOrder',function(index, item){

            var $cake_list = $('#cake_list'),
				$sinfo = $('.order-information'),
                $items = $cake_list.find('.item'),
                submit_order_detail = [],
				submit_order = {},
		        s_total = 0,
		        s_money = 0,
		        s_count = 0,
		        s_coupon = 0,
		        s_sales = 0,
                s_cakeCard =0,
		        discount_price = 0,
		        discount_type = '无',
                b_order_count = 0,
                b_orderprice = 0,
                b_payment = '';

				//商品总金额
				s_total = parseFloat($sinfo.find('#totalPrice').html().trim()).toFixed(2);
				//去结算时的金额
				s_money = parseFloat($(this).closest('.closes').find('#cashPay').html()).toFixed(2);
				//优惠券
				s_coupon = parseFloat($sinfo.find('#coupons').html().trim()).toFixed(2);
				//促销价
				s_sales = parseFloat($sinfo.find('#salesPromotion').html().trim()).toFixed(2);
                //蛋糕卡
                s_cakeCard = parseFloat($sinfo.find('#cakeCard').html().trim()).toFixed(2)
				if(s_coupon != 0) {
			        discount_price = s_coupon;
			        discount_type = '优惠券';
			    } else if(s_sales != 0) {
			        discount_price = s_sales;
			        discount_type = '促销';
			    } else if(s_cakeCard != 0){
                    discount_price =s_cakeCard;
                    discount_type = '蛋糕卡';
                }else {
			        discount_price = 0;
			        discount_type = '无';
			    }

			$items.each(function(index, item) {
                var b_productstyle = '',
                    b_productname = '',
                    b_product_size = '',
                    b_productprice_d = '',
                    b_productprice_m = 0,
                    b_order_count = 0;

                    b_productstyle = $(item).attr('data-style').trim();
                    b_productname = $(item).attr('data-name').trim();
                    b_product_size = $(item).attr('data-size');
                    b_productprice_d = $(item).attr('data-price');
                    b_productprice_m = parseFloat($(item).attr('data-price').trim()).toFixed(2);
                    b_order_count = parseInt($(item).attr('number').trim(), 10);

                    s_count += b_order_count;

                    submit_order_detail.push({
                      b_productstyle: b_productstyle,
                      b_productname: b_productname,
                      b_product_size: b_product_size,
                      b_productprice_d: b_productprice_d,
                      b_productprice_m: b_productprice_m,
                      b_order_count: b_order_count,
                      b_device: b_device
                    });
              });
                // send submit_shoppingcart to rxstream server
                 $.each(submit_order_detail, function(index, detail) {
                   rxStream.track('submit_order_detail', {
                           subject: {
                               o_username: o_username,
                               o_mobile: o_mobile
                           },
                           properties: detail
                       });
                 });
                 $.each(submit_order_detail, function(index, detail) {
                   rxStream.track('pay_order_detail', {
                           subject: {
                               o_username: o_username,
                               o_mobile: o_mobile
                           },
                           properties: detail
                       });
                 });
		   // b_orderprice 订单金额
	       // b_order_amount 实际支付金额
	       // b_order_count 商品件数
	       // b_discountprice 优惠金额
	       // b_discounttype 优惠类型
	       submit_order.b_orderprice = s_total;
	       submit_order.b_order_amount = s_money;
	       submit_order.b_order_count = s_count;
	       submit_order.b_discountprice = discount_price;
	       submit_order.b_discounttype = discount_type;
	       submit_order.b_device = b_device;
	       // send submit_order to rxstream server
 			rxStream.track('submit_order', {
 				subject: {
 					o_username: o_username,
 					o_mobile: o_mobile
 				},
 				properties: submit_order
 			});

            //商品件数，金额，方式
                b_order_count = s_count;
                b_orderprice = s_total;
                b_payment = $('.pay-method').find('span').html().trim();

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

        });

	}
})(jQuery, window, document);
