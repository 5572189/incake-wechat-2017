(function(){
	
	/**
	 * 对规格备注进行格式化
	 * @param  spec    要格式化的规格备注
	 * @param  format  进行格式化的规格备注字符串
	 * @return [description]
	 */
    template.helper('commentFormat', function(comment) {
        var str = '';
        if (!!comment && $.isArray(comment)) {
            str += comment.join('*||*');
        }
        return str;
    });
	
	
	template.helper('specFormat', function(specs) {
		var str = '';
		if(!!specs && $.isArray(specs)) {
			for(var i = 0, len = specs.length; i < len; i++) {
				var spec = specs[i];
				var comment = spec.comment.join('===');
				if(i !== specs.length - 1) {
					str += spec.pound + '||' + spec.price + '||' + comment + '|***|';
				} else {
					str += spec.pound + '||' + spec.price + '||' + comment;
				}
			}
		}
		return str;
	});
	/*end*/
	
	var tl = new TimelineLite();
	
	$("#flower-list").on('click','.car',function(){
		
		var strSc = $(this).closest('li').attr('data-sc').trim(),
			strRegular = $(this).closest('li').attr('data-regular').trim(),
			hasSc = strSc === '' ? false : true,
			hasRegular = strRegular === '' ? false : true;
			
		var data = {
				sc: [],
				regular: []
			};
			
		var groupTmp = [],
			itemTmp = [];
			
		if(hasSc) {
			groupTmp = strSc.split('|***|');
			for(var i = 0, len = groupTmp.length; i < len; i++) {
				itemTmp = groupTmp[i].split('||');
				data.sc.push({
					pound: itemTmp[0],
					price: itemTmp[1],
					comment: itemTmp[2].split('===')
				});
			}
		}
		
		if(hasRegular) {
			groupTmp = strRegular.split('|***|');
			for(var i = 0, len = groupTmp.length; i < len; i++) {
				itemTmp = groupTmp[i].split('||');
				data.regular.push({
					pound: itemTmp[0],
					price: itemTmp[1],
					comment: itemTmp[2].split('===')
				});
			}
		}
		
		handle4BindShade(data);	
		
	})
	
	// 绑定加入购物车弹框数据
	function handle4BindShade(data) {
		var _html = template('tplNormsShade', data);
		$('#normsShade').html(_html);
		$(".norms-shade").fadeIn();
	}
	
	//惊喜常规规格
	$("#normsShade").on('click','.poundage-surprised li',function() {
			$(this).addClass("active").siblings().removeClass("active");
			var data = $(this).attr('data-comment');
			var prices = $(this).attr('data-prices');
			var data_norms = $(this).attr('data-comment').split("||");
			var li_one = $(".pound-surprised").find('li:eq(0)');
			var li_two = $(".pound-surprised").find('li:eq(1)');
			var li_three = $(".pound-surprised").find('li:eq(2)');
			li_one.text(data_norms[0]);
			li_two.text(data_norms[1]);
			li_three.text(data_norms[2]);
			$(".subtract-surprised").removeClass('active');
			$(".number-surprised").text(1);
			$(".cost").text(prices);
	});
	
	//常规
	$("#normsShade").on('click','.poundage-normal li',function() {
			$(this).addClass("active").siblings().removeClass("active");
			var data = $(this).attr('data-comment');
			var prices = $(this).attr('data-prices');
			var data_norms = $(this).attr('data-comment').split("||");
			var li_one = $(".pound-normal").find('li:eq(0)');
			var li_two = $(".pound-normal").find('li:eq(1)');
			var li_three = $(".pound-normal").find('li:eq(2)');
			li_one.text(data_norms[0]);
			li_two.text(data_norms[1]);
			li_three.text(data_norms[2]);
			$(".subtract-normal").removeClass('active');
			$(".number-normal").text(1);
			$(".prices").text(prices);
	});
	
	//蛋糕规则切换
	$("#normsShade").on('click', '#surprised', function() {
		$(this).addClass("active").siblings().removeClass("active");
		$('.poundage-surprised li:first-child').click();
		tl.clear();
		tl.to($(".parcel"),0.5,{
			'left':0
		});
	});
	
	$("#normsShade").on('click', '#normal', function() {
		if($(this).attr('disabled') === "disabled"){
			return false;
		}
		$('.poundage-normal li:first-child').click();
		$(this).addClass("active").siblings().removeClass("active");
		tl.clear();
		tl.to($(".parcel"),0.5,{
			'left':'-100%'
		});
		
	});
	
	//关闭
	$("#normsShade").on('click','.close',function() {
		$(".norms-shade").fadeOut();
	});

	$("#flower-list").on("click",'.like',function(){
		if(!$(this).hasClass("active")) {
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});
	
	
	
	var data = {
			list:[{
				linkimg:"assets/imgs/index/cake.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				specs: {
					sc: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					],
					regular: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					]
				}
			},{
				linkimg:"assets/imgs/index/cake.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				specs: {
					sc: [],
					regular: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					]
				}
			},{
				linkimg:"assets/imgs/index/cake.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				specs: {
					sc: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					],
					regular: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					]
				}
			},{
				linkimg:"assets/imgs/index/cake.png",
				na:'以爱之名',
				en:'All About Love',
				price:'￥69',
				number:'1个',
				specs: {
					sc: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					],
					regular: [{
							pound: 1.5,
							price: 189,
							comment: ['14CM*14CM*4.5CM≈6寸，约510g', '免费赠送5份餐具', '适合2~3人食用']
						},
						{
							pound: 2.5,
							price: 279,
							comment: ['17.5CM*17.5CM*4.5CM≈8寸，约1.0kg', '免费赠送10份餐具', '适合7~8人食用']
						},
						{
							pound: 3.5,
							price: 429,
							comment: ['23CM*23CM*4.5CM≈12寸，约1.5kg', '免费赠送15份餐具', '适合11~12人食用']
						},
						{
							pound: 5.5,
							price: 709,
							comment: ['30CM*30CM*4.5CM≈14寸，约2.4kg', '免费赠送20份餐具', '适合15~20人食用']
						}
					]
				}
			}]
	}
	
	var $cake = $("#flower-list");
		var _html = template('tplCake', data);
		$cake.append(_html);
		
	
	
	//加减惊喜
	$("#normsShade").on("click",'.add-surprised',function() {
		amout = parseInt($(".number-surprised").text());
		amout++;
		if(amout > 1) {
			$(".subtract-surprised").removeClass('disabled').addClass('active');
		}
		$(".number-surprised").text(amout);
	});
	$("#normsShade").on("click",'.subtract-surprised',function() {
		if($(this).hasClass("disabled")) {
			return false;
		}
		amout = parseInt($(".number-surprised").text());
		if(amout === 1) {
			$(this).addClass('disabled').removeClass('active');
			return false;
		}
		amout--;
		if(amout <= 1) {
			$(this).addClass('disabled').removeClass('active');
		}
		$(".number-surprised").text(amout);
	});
    //加减常规
	$("#normsShade").on("click",'.add-normal',function() {
		amout = parseInt($(".number-normal").text());
		amout++;
		if(amout > 1) {
			$(".subtract-normal").removeClass('disabled').addClass('active');
		}
		$(".number-normal").text(amout);
	});
	$("#normsShade").on("click",'.subtract-normal',function() {
		if($(this).hasClass("disabled")) {
			return false;
		}
		amout = parseInt($(".number-normal").text());
		if(amout === 1) {
			$(this).addClass('disabled').removeClass('active');
			return false;
		}
		amout--;
		if(amout <= 1) {
			$(this).addClass('disabled').removeClass('active');
		}
		$(".number-normal").text(amout);
	});
})();
