(function($, window, document) {
	
	function touchmove() {
            $("body").on('touchmove.mask', function(event) {
                //去掉默认
                event.preventDefault();
                //终止事件的传播
                event.stopPropagation();
            });
        }

        function removeTouchmove() {
            //解绑事件：
            $("body").off(".mask");
        }
	$(function(){
		$("#nav ul").on("click", "li", function() {
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			if($(".no-evaluate").hasClass('active')){
				$("#content").fadeOut(function(){
					$("#await").fadeIn();
				});
			}else{
				$("#await").fadeOut(function(){
					$("#content").fadeIn()
				})
			}

		});
	    //取消弹框
		$("#content").on('click','.cancel-order',function(){
			$(".cancel-shade").fadeIn();
			touchmove();
		});
		$(".affirm").click(function(){
			$(".cancel-shade").fadeOut();
			removeTouchmove();
		});
		$(".abolish").click(function(){
			$(".cancel-shade").fadeOut();
			removeTouchmove();
		});

		$(".cancel").on('click','span',function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});
		$(".pay").on('click','li',function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});
		//支付弹框
		$("#content").on('click','.affirm-pay',function(){
			$(".pay-shade").fadeIn();
			touchmove();
		});
		$(".affirm-buy").click(function(){
			$(".pay-shade").fadeOut();
			removeTouchmove();
		});
		$(".cancel-buy").click(function(){
			$(".pay-shade").fadeOut();
			removeTouchmove();
		});

		Data();
	});
	function Data() {

		var data = {
			list: [{
				link: 'javascript:;',
				ordernumber: 'ABC23443214',
				textlink: 'javascript:;',
				textimg: 'assets/imgs/me-order/cake02.png',
				img: 'assets/imgs/index/cake.png',
				name: {
					cn: '爱丁保之恋'
				},
				price: '169',
				pound: '1.2磅',
				count: 'x1',
				countnumber: '2',
				paid: {
					yj: '189.00',
					wz: '338.00'
				}
			}, {
				link: 'javascript:;',
				ordernumber: 'ABC23443214',
				textlink: 'javascript:;',
				textimg: 'assets/imgs/me-order/cake01.png',
				img: 'assets/imgs/index/cake.png',
				name: {
					cn: '爱丁保之恋'
				},
				price: '169',
				pound: '1.2磅',
				count: 'x1',
				countnumber: '2',
				paid: {
					yj: '189.00',
					wz: '338.00'
				}
			}]
		};

		var $content = $("#content");
		var _html = template('tplList', data);
		$content.append(_html);

		var $content = $("#await");
		var await = template('tplAwait', data);
		$content.append(await);
	}
})(jQuery, window, document);
