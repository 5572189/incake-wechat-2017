(function(){
	
	var data = {
			list:[{
				linkimg:"assets/imgs/cake-gift/flower-like.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				description:'经典永生花吊饰，被心灵手巧的花艺师采撷到调色盘中。',
				english:'The classic life flower ornaments, is the ingenuity of the designer to pick the palette.'
			},{
				linkimg:"assets/imgs/cake-gift/flower-like.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				description:'经典永生花吊饰，被心灵手巧的花艺师采撷到调色盘中。',
				english:'The classic life flower ornaments, is the ingenuity of the designer to pick the palette.'
			},{
				linkimg:"assets/imgs/cake-gift/flower-like.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				description:'经典永生花吊饰，被心灵手巧的花艺师采撷到调色盘中。',
				english:'The classic life flower ornaments, is the ingenuity of the designer to pick the palette.'
			}]
	}
	
	var $cake = $("#me-like");
		var _html = template('tplCake', data);
		$cake.append(_html);
		
	$("#me-like").on('click','.like',function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	});
	
})();
