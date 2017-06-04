;(function($, window, document) {
	$(function(){
		intiData();
	});
	
	function intiData(){
		var $surprised_ul=$("#surprised-ul");
		var data = {
	        list: [{
	            link: 'javascript:;',
	            img: 'assets/imgs/shopping-cart/order-cake.png',
	            name: {
					cn: '芒果拿破仑',
					en: 'Mango Napoleon'
				},
	            cost:'￥189',
	            poundage:'2.5',
	            attrs:['免费赠送5套餐具','可切分']
	        }]
	    };
	    var surprised_ul = template('tplSurprise', data);
	    $surprised_ul.html(surprised_ul);
	}
})(jQuery, window, document);