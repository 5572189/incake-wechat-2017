;(function(){
	
	var rating = (function(){
		//点亮
		var lightOn = function($item,num){
			$item.each(function(index){
				if(index<num){
					$(this).addClass('active');
				}else{
					$(this).removeClass('active');
				}
			});
		}
		var init = function(el,num){
			var $rating = $(el),
				$item = $rating.find('.rating-item');
			
			//初始化
			lightOn($item,num);
			//事件绑定
			$rating.on('mouseover','.rating-item',function(){
				lightOn($item,$(this).index()+1);
			}).on('click','.rating-item',function(){
				num = $(this).index()+1;
			}).on('mouseout',function(){
				lightOn($item,num);
			});
		}
		//jQuery插件
		jQuery.fn.extend({
			rating:function(num){
				return this.each(function(){
					init(this,num)
				});
			}
		});
		return {
			init:init
		}
		
	})();
	rating.init('#rating01',1);
	$("#rating02").rating(1);
	$("#rating03").rating(1);
	$("#rating04").rating(1);
})();
