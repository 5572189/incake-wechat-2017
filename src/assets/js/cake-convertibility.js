(function($, window, document){
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
		var tl = new TimelineLite();
		$(".candle-dish").click(function(){
			tl.clear();
			tl.to($(".parcel"), 0.5, {
				bottom: "0%",
				onStart: function() {
					$(".shade").fadeIn();
				}
			});
			touchmove();
		});
		$(".cancel").click(function(){
			tl.clear();
			tl.to($('.parcel'),0.5,{
				bottom: "-100%",
				onComplete:function(){
					$(".shade").fadeOut();
				}
			});
			removeTouchmove();
		});
		$(".shade").click(function(e){
			if(e.target===$(".shade")[0]){
				tl.clear();
				tl.to($('.parcel'),0.5,{
					bottom: "-100%",
					onComplete:function(){
						$(".shade").fadeOut();
					}
				});
			}
			removeTouchmove();
		});

		//为每个li添加点击事件
		$("#cake-list").on('click','li',function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
			}else{
				$(this).removeClass('active');
			}
		});

		//蜡烛加减
		;(function(){
			var amout = 0;
			$(".candle").on("click",".addNumber",function(event){
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this);
				amout = parseInt($this.siblings('.number').text());
				amout++;

				if(amout > 0){
					$this.siblings('.subtract').removeClass('disabled').addClass('active');
				}
				$this.siblings('.number').text(amout);
			});
			$(".candle").on("click",".subtract",function(event){
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this);

				if($this.hasClass("disabled")) {
					return false;
				}
				amout = parseInt($this.siblings('.number').text());
				if(amout === 0) {
					$this.addClass('disabled').removeClass('active');
					return false;
				}
				amout--;
				if(amout <= 0) {
					$this.addClass('disabled').removeClass('active');
				}
				$this.siblings('.number').text(amout);
			});
		})();
		//盘叉加减
		;(function(){
			var amout = 0;
			$(".dish").on("click",".addNumber",function(event){
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this);
				amout = parseInt($this.siblings('.number').text());
				amout++;

				if(amout > 0){
					$this.siblings('.subtract').removeClass('disabled').addClass('active');
				}
				$this.siblings('.number').text(amout);
			});
			$(".dish").on("click",".subtract",function(event){
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this);

				if($this.hasClass("disabled")) {
					return false;
				}
				amout = parseInt($this.siblings('.number').text());
				if(amout === 0) {
					$this.addClass('disabled').removeClass('active');
					return false;
				}
				amout--;
				if(amout <= 0) {
					$this.addClass('disabled').removeClass('active');
				}
				$this.siblings('.number').text(amout);
			});
		})();

		var data = {
				list:[{
					linkimg:"assets/imgs/index/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个',
					like:true
				},{
					linkimg:"assets/imgs/index/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/index/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/index/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/index/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				},{
					linkimg:"assets/imgs/index/cake.png",
					na:'以爱之名',
					en:'All About Love',
					price:'￥69',
					number:'1个'
				}]
		}

		var $cake = $("#cake-list");
			var _html = template('tplCake', data);
			$cake.append(_html);
	});

})(jQuery, window, document);
