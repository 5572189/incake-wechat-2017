;
(function($, window, document) {

	template.helper('specFormat', function(specs) {
		var str = '';
		if(!!specs && $.isArray(specs)) {
			for(var i = 0, len = specs.length; i < len; i++) {
				var spec = specs[i];
				var comment = spec.comment.join('===');
				if(i !== specs.length - 1) {
					str += spec.pound + '||' + spec.price + '||' + comment + '|***|';
				} else {
					str += spec.pound + '||' + spec.price + '||' + comment ;
				}
			}
		}
		return str;
	});
	
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
	
	$(function() {
		var tl = new TimelineLite();
		//加载图片
		initData();
		//节流加载
		var throttle = _.throttle(scroll, 200);
		$(window).on('scroll', throttle);

		//swiper图片轮播
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			loop: true,
			spaceBetween: 30,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});

		//筛选，出现遮罩
		$(".screen").click(function() {
			
			tl.clear();
			tl.to($(".list"), 0.5, {
				right: '0%',
				onStart: function() {
					$("#shade").fadeIn(400);
				}
//				onComplete: function() {}
			});
			
			$("body").on('touchmove.mask', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});

		//点击筛选
		$("#shade").click(function(e) {
			if(e.target===$("#shade")[0]){
				tl.clear();
				tl.to($(".list"),0.5,{
					right: '-100%',
					onComplete: function() {
						$("#shade").fadeOut(400);
					}
				});
			}
			$("body").off(".mask");
		});

		$(".city-shade").click(function() {
			tl.clear();
			tl.to($(".city"),0.5,{
				right: '-100%',
				onComplete: function(){
					$(".city-shade").fadeOut();
				}
			});
			$("body").off(".mask");
		});

		//筛选全部点击
		$(".all").click(function() {
			$(this).addClass('border');
			$(this).siblings().removeClass('active').css("text-align", "center");
			tl.clear();
			tl.to($(".list"),0.5,{
				right: '-100%',
				onComplete: function() {
					$("#shade").fadeOut(400);
				}
			});
			$("body").off(".mask");
		});

		//筛选列表全部点击
		$(".own").click(function() {
			$(".all").addClass("border");
			$(".love").removeClass("active").css("text-align", "center");
			tl.clear();
			tl.to($(".list"),0.5,{
				right: '-100%',
				onComplete: function() {
					$("#shade").fadeOut(400);
				}
			});
			$("body").off(".mask");
		});

		//筛选点击绑定
		$("#idscreen").on('click', '.love', function() {
			var flag = $(".love").hasClass("active") ? true : false;
			if(flag) {
				$(this).remove();
				$(".all").addClass("border");
			} else {
				$(".love").addClass("active");
			}
			$(this).addClass("active").css("text-align", "left");
			$(this).siblings().removeClass("border");
		});

		//筛选列表点击
		$("#shade").on('click', '.kind', function() {
			$(this).addClass("loves");
			$(".kind").not(this).removeClass("loves");
			$(".love").html($(this).html()).addClass("active").css("text-align", "left");
			$(".all").removeClass("border");
			var num = $("#idscreen").find('a');
			if(num.length == 1) {
				$("<a href='javascript:;'class='love active'/></a>").appendTo("#idscreen");
				$(".love").html($(this).html());
				$(".all").removeClass("border");
			}
			tl.clear();
			tl.to($(".list"),0.5,{
				right: '-100%',
				onComplete: function() {
					$("#shade").fadeOut(400);
				}
			});
			$("body").off(".mask");
		});

		//蛋糕收藏
		$("#main").on("click", ".collect", function() {
			if($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			} else {
				$(this).addClass("selected");
			}
		});

		//城市定位
		$(".location").click(function() {
			$(".city-shade").fadeIn(function() {
				$(".city").animate({
					right: '0px'
				});
			});
			$("body").on('touchmove.mask', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});
		
		$(".city a").click(function() {
			$("#showCity").html($(this).html());
			$(this).addClass("citySelected");
			$(".city a").not(this).removeClass("citySelected");
			tl.clear();
			tl.to($(".city"),0.5,{
				right: "-100%",
				onComplete:function(){
					$("#city-list").fadeOut();
				}
			});
			$("body").off(".mask");
		});

		//蛋糕规则切换
		$("#normsShade").on('click', '#surprised', function() {
			$(this).addClass("active").siblings().removeClass("active");
			$(".poundage-surprised li:first-child").click();
			tl.clear();
			tl.to($(".parcel"),0.5,{
				'left':0
			});
		});
		
		$("#normsShade").on('click', '#normal', function() {
			if($(this).attr('disabled') === "disabled"){
				return false;
			}
			$(".poundage-normal li:first-child").click();
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

		//数据绑定
		$("#main").on('click', '.icon-add', function() {
			
			var strSc = $(this).closest('.box').attr('data-sc').trim(),
				strRegular = $(this).closest('.box').attr('data-regular').trim(),
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
			
			//惊喜常规规格
			$("#normsShade").on('click','.poundage-surprised li',function() {
					$(this).addClass("active").siblings().removeClass("active");
					var comment = $(this).attr('data-comment');
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
					var comment = $(this).attr('data-comment');
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
			
			handle4BindShade(data);
		});
		
		// 绑定加入购物车弹框数据
		function handle4BindShade(data) {
			var _html = template('tplNormsShade', data);
			$('#normsShade').html(_html);
			
			$(".norms-shade").fadeIn();
		}

		var $add_surprised = $(".add-surprised"),
			$subtract_surprised = $(".subtract-surprised"),
			$number_surprised = $(".number-surprised");

		var $add_normal = $(".add-normal"),
			$subtract_normal = $(".subtract-normal"),
			$number_normal = $(".number-normal");
		
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

	});

	//scroll事件
	function scroll() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			viewHeight = $(window).height(),
			mainTop = $("#main").offset().top,
			mainHeight = $("#main").height() + $("#loading").height();
		//		var	mainpaddingBottom = parseInt($("#loading").css("padding-bottom"));
		var disT = (scrollTop + viewHeight) - (mainTop + mainHeight);
		if(disT > 0) {
			initData();
		}
	}

	function initData() {
		// ajax
		var leftList = {
			list: []
		};

		var rightList = {
			list: []
		};

		var data = [{
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/car.png',
			img: 'assets/imgs/index/cake.png',
			name: {
				cn: '百变魔方',
				en: 'Rubikl Cube'
			},
			label: {
				one: '标签1',
				two: '标签2',
				three: '标签3'
			},
			price: '189',
			pound: '1.5磅',
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
		}, {
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/car.png',
			img: 'assets/imgs/index/cake.png',
			name: {
				cn: '百变魔方',
				en: 'Rubikl Cube'
			},
			label: {
				one: '标签1',
				two: '标签2',
				three: '标签3'
			},
			price: '189',
			pound: '1.5磅',
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
		}, {
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/car.png',
			img: 'assets/imgs/index/cake.png',
			name: {
				cn: '百变魔方',
				en: 'Rubikl Cube'
			},
			label: {
				one: '标签1',
				two: '标签2',
				three: '标签3'
			},
			price: '189',
			pound: '1.5磅',
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
		}, {
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/car.png',
			img: 'assets/imgs/index/cake.png',
			name: {
				cn: '百变魔方',
				en: 'Rubikl Cube'
			},
			label: {
				one: '标签1',
				two: '标签2',
				three: '标签3'
			},
			price: '189',
			pound: '1.5磅',
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
		}];

		$.each(data, function(idx, ele) {
			if(idx % 2 === 0) {
				leftList.list.push(ele);
			} else {
				rightList.list.push(ele);
			}
		});

		var $boxLeft = $('.box-left'),
			$boxRight = $('.box-right');

		var _html = template('tplList', leftList);
		$boxLeft.append(_html);

		var _html = template('tplList', rightList);
		$boxRight.append(_html);
	}

})(jQuery, window, document);