;(function($, window, document) {
	
	function touchmove(){
		$("body").on('touchmove.mask', function(event) {
			//去掉默认
			event.preventDefault();
			//终止事件的传播
			event.stopPropagation();
		});
	}
	function removeTouchmove(){
		//解绑事件：
		$("body").off(".mask");
	}
	var $certificate = $("#coin-certificate"),
		$cake_exchange=$(".cake-exchange"),
		$skip=$(".skip"),
		$layout=$(".layout");
	$skip.click(function(){
		$cake_exchange.fadeOut(function(){
			$layout.fadeIn();
		});
	});
	$certificate.on("click","li",function(){
		$(this).addClass("active").find(".immediately").text("取消购买");
		$(this).siblings().removeClass("active").find(".immediately").text("立即购买");
//		if(!$(this).hasClass("active")){
//			$(this).addClass("active");
//			$(this).find(".immediately").text("取消购买");
//		}else{
//			$(this).removeClass("active");
//			$(this).find(".immediately").text("立即购买");
//		}
	});
	
	//数量增加减少
	(function(){
		var $add = $(".dish-add"),
			$subtract = $(".dish-subtract"),
			num = 0;
		
		$add.click(function(){
			amout = parseInt($(".dish-number").val());
			amout++;
			if(amout > 1){
				$subtract.removeClass('disabled').css("background","#45515e");
			}
			$(".dish-number").val(amout);
		});
		$subtract.click(function(){
			if(amout === 1){
				return false;
			}
			if($(this).hasClass("disabled")){
				return false;
			}
			amout = parseInt($(".dish-number").val());
			amout--;
			
			if(amout <= 1){
				$(this).addClass('disabled').css("background","#b5c6d1");
			}
			$(".dish-number").val(amout);
		});
	})();
	
	
	
	(function(){
		var $coin_certificate = $("#coin-certificate"),
			$look_over=$(".look-over"),
			$more=$(".more");
			
		var data ={
			list:[{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5',
		        collect:true
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			}]
		}
		var coin_certificate = template('tplCoin-certificate', data);
		
		
		$coin_certificate.html(coin_certificate);
		
		if(data.list.length > 6){
			$look_over.show();
			$more.click(function(){
				if(!$(this).hasClass("active")){
					$(this).addClass("active");
				}else{
					$(this).removeClass("active");
				}
				if($coin_certificate.find(".conceal").hasClass("hide")){
					$coin_certificate.find(".conceal").slideDown().removeClass("hide");
				}else{
					$coin_certificate.find(".conceal").slideUp().addClass("hide");
				}
			});
		}
		if(data.list.length <= 6){
			$look_over.hide();
		}	
		
	})();
	
	(function(){
		var $cake_mountings=$("#cake-mountings"),
			$dish_shade=$(".dish-shade"),
			$dish=$(".dish"),
			$dish_cancel=$(".dish-cancel"),
			$dish_confirm=$(".dish-confirm"),
			$candle_shade=$(".candle-shade"),
			$candle=$(".candle"),
			$candle_cancl=$(".candle-cancl"),
			$candle_confirm=$(".candle-confirm");
			
		var data ={
			list:[{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5',
		        dish:true
			},{
				img:'assets/imgs/coin-certificate/cake.png',
				name:{
					cn: '百变魔方',
					en: 'Rubik Cube'
				},
				cost:'198',
		        poundage:'1.5'
			}]
		}
		var cake_mountings = template('tplCake-mountings', data);
		$cake_mountings.html(cake_mountings);
//		叉盘弹框
		$cake_mountings.on("click",'.dish-buy',function(){
			$dish_shade.fadeIn(function(){
				$dish.animate({'bottom':'0px'});
			});
			touchmove();
		});
//		取消叉盘
		$dish_cancel.click(function(){
			$dish.animate({'bottom':'-100%'},function(){
				$dish_shade.fadeOut();
			});
		});
//		确定叉盘
		$dish_confirm.click(function(){
			$dish.animate({'bottom':'-100%'},function(){
				$dish_shade.fadeOut();
			});
		});
//		数字蜡烛弹框
		$cake_mountings.on("click",'.candle-buy',function(){
			$candle_shade.fadeIn(function(){
				$candle.animate({'bottom':'0px'});
			});
		});
//		取消蜡烛
		$candle_cancl.click(function(){
			$candle.animate({'bottom':'-100%'},function(){
				$candle_shade.fadeOut();
			});
		});
//		确定蜡烛
		$candle_confirm.click(function(){
			$candle.animate({'bottom':'-100%'},function(){
				$candle_shade.fadeOut();
			});
		});
	})();
//	数字蜡烛
	(function(){
		var $number_candle=$("#number-candle");
		var data = {
			list:[{
				img:'assets/imgs/coin-certificate/candle00.png'
			},{
				img:'assets/imgs/coin-certificate/candle01.png'
			},{
				img:'assets/imgs/coin-certificate/candle02.png'
			},{
				img:'assets/imgs/coin-certificate/candle03.png'
			},{
				img:'assets/imgs/coin-certificate/candle04.png'
			},{
				img:'assets/imgs/coin-certificate/candle05.png'
			},{
				img:'assets/imgs/coin-certificate/candle06.png'
			},{
				img:'assets/imgs/coin-certificate/candle07.png'
			},{
				img:'assets/imgs/coin-certificate/candle08.png'
			},{
				img:'assets/imgs/coin-certificate/candle09.png'
			}]
		}
		var $number = template('tplCandle', data);
		$number_candle.html($number);
		
		
		
		$number_candle.on("click",".add",function(){
			var amout = parseInt($(this).closest('ul').find(".number").val());
			amout++;
			if(amout > 1){
				$(this).siblings(".subtract").removeClass('disabled').css("background","#45515e");
			}
			$(this).closest('ul').find(".number").val(amout);
			if(amout <= 1){
				$(this).addClass('disabled').css("background","#b5c6d1");
			}
			$(this).closest('ul').find(".number").val(amout);
		});
		$number_candle.on("click",".subtract",function(){
			if($(this).hasClass("disabled")){
				return false;
			}
			var amout = parseInt($(this).closest('ul').find(".number").val());
			if(amout == 1){
				return false;
			}
			amout--;
			if(amout <= 1){
				$(this).addClass('disabled').css("background","#b5c6d1");
			}
			$(this).closest('ul').find(".number").val(amout);
		});
	})();
	

})(jQuery, window, document);
