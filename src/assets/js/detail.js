;(function($, window, document) {

	$(function() {

		//swiper图片轮播
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			loop : true,
			spaceBetween: 30,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});

		// 瑞雪检测 --- 详情页
        fnInitRxDetail();

		$(".content_li").on("click","li",function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});

		$(".like").click(function(){
			if(!$(this).hasClass("active")){
				$(this).addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
		//数量增加减少
		(function(){
			var $add = $(".add"),
				$subtract = $(".subtract"),
				num = 0;

			$add.click(function(){
				amout = parseInt($(".number").val());
				amout++;
				if(amout > 1){
					$subtract.removeClass('disabled').addClass('active');
				}
				$(".number").val(amout);
			});
			$subtract.click(function(){
				if($(this).hasClass("disabled")){
					return false;
				}
				amout = parseInt($(".number").val());
				amout--;
				if(amout <= 1){
					$(this).addClass('disabled').removeClass('active');
				}
				$(".number").val(amout);
			})
		})();
		//收藏
		$(".heart").click(function(){
			var isFavored =$(this).hasClass("active");
			if($(this).hasClass("heart-shade")){
				return false;
			}
			if(!isFavored){
				$(this).addClass("active");
			}else{
				$(this).removeClass("active");
			}

			fnInitRxFavor(isFavored)
		})

		$(".next_page a").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		})
		//加入购物车
		$(".add-shop").click(function(){
			$("#shade").fadeIn(function(){
				$(".shade_shopping").fadeIn();
			});
			$("body").on('touchmove.mask', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});
		$(".visit_again").click(function(){
			$(".shade_shopping").fadeOut(function(){
				$("#shade").fadeOut();
			});
			$("body").off(".mask");
		})

		//换页
		$(".right").on("click.page",function(){
			var $right_active = $(".next_page").not("span").find("a.active");
			var $right = $(".next_page a").eq($(".next_page a").length-1);
			$right_active.removeClass("active").next().addClass("active");
			if($right.hasClass("active")){
				$(".right").addClass('disabled');
			}
		});
		$(".left").on("click.page",function(){
			var $left_active = $(".next_page").not("span").find("a.active");
			var $left = $(".next_page a").eq(0);

			$left_active.removeClass("active").prev().addClass("active");
			if($left.hasClass("active")){
				$(".left").off(".page");
			}

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
  	  var $hid_username = $('#hid_username');

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
      b_linkornot = isFavored ? '取消喜欢' : '喜欢';

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
