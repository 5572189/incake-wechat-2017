(function($, window, document){
	function touchmove(){
		$(document).on('touchmove.mask', function(event) {
			//去掉默认
			event.preventDefault();
			//终止事件的传播
			event.stopPropagation();
		});
	}
	function removeTouchmove(){
		//解绑事件：
		$(document).off(".mask");
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
		$("#add-gift").on('click','li',function(){
			if(!$(this).hasClass('activeBorder')){
				$(this).addClass('activeBorder');
			}else{
				$(this).removeClass('activeBorder');
			}
		});

		//头部提示关闭
		$(".close").click(function(){
			$(".warm-hint").fadeOut();
		});

		//添加赠品模板渲染
		var cake_data = {
			list: [{
				linkimg:"assets/imgs/cake-gift/flower.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				like:true
			},{
				linkimg:"assets/imgs/cake-gift/chocolate.png",
				na:'黑巧克力',
				en:'Chocolate',
				price:'￥69',
				number:'1个'
			},{
				linkimg:"assets/imgs/cake-gift/cupcakes.png",
				na:'爱丽丝系列',
				en:'A&M Cupcakes',
				price:'￥69',
				number:'1个'
			},{
				linkimg:"assets/imgs/cake-gift/fruit-puffs.png",
				na:'水果泡芙圈',
				en:'Fruit puffs circle',
				price:'￥58',
				number:'2只'
			}]
		}
		var $cake_gift = $("#add-gift");
			var cake_html = template('tplCake-gift', cake_data);
			$cake_gift.append(cake_html);
		//商品加减
		(function(){
			var amout = 0;
			$("#add-gift").on("click",".addNumber",function(event){
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this);
				amout = parseInt($this.siblings('.number').text());
				amout++;

				if(amout > 1){
					$this.siblings('.subtract').removeClass('disabled').addClass('active');
				}
				$this.siblings('.number').text(amout);
			});
			$("#add-gift").on("click",".subtract",function(event){
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this);

				if($this.hasClass("disabled")) {
					return false;
				}
				amout = parseInt($this.siblings('.number').text());
				if(amout === 1) {
					$this.addClass('disabled').removeClass('active');
					return false;
				}
				amout--;
				if(amout <= 1) {
					$this.addClass('disabled').removeClass('active');
				}
				$this.siblings('.number').text(amout);
			});
		})();
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
	});

})(jQuery, window, document);
