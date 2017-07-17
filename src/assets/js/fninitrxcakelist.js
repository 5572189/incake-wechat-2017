;(function($, window, document){
    $(function(){
        // 瑞雪检测 --- 列表页
        fnInitRxList();
    });

    //瑞雪检测 --- 列表页
    function fnInitRxList(){
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
})(jQuery, window, document)
