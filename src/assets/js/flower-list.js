(function($, window, documnet){
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
		$("#flower-list").on('click','.like',function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
			}else{
				$(this).removeClass('active');
			}
		});

		var data = {
				list:[{
					linkimg:"assets/imgs/flower-list/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/flower-list/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/flower-list/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/flower-list/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				}]
		}
		var $cake = $("#flower-list");
			var _html = template('tplCake', data);
			$cake.append(_html);

		$(".car").click(function(){
			$(".flower-shade").fadeIn();
			touchmove();
		})
		$(".colors").on('click','li',function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
		$(".flower-close").click(function(){
			$(".flower-shade").fadeOut();
			removeTouchmove();
		});

		var $add_flower = $(".add-flower"),
			$subtract_flower = $(".subtract-flower"),
			$number_flower = $(".number-flower");
		function poundage($add,$subtract,$number){
			$add.click(function(){
				amout = parseInt($number.text());
				amout++;
				if(amout > 1){
					$subtract.removeClass('disabled').addClass('active');
				}
				$number.text(amout);
			});
			$subtract.click(function(){
				if($(this).hasClass("disabled")){
					return false;
				}
				amout = parseInt($number.text());
				if(amout === 1){
					return false;
				}
				amout--;
				if(amout <= 1){
					$(this).addClass('disabled').removeClass('active');
				}
				$number.text(amout);
			})
		};
		poundage($add_flower,$subtract_flower,$number_flower);
	});

})(jQuery, window, document);
