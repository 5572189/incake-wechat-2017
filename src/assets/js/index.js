;(function($, window, document) {

	$(function() {
		//加载图片
		initData();
		//节流加载
		var throttle = _.throttle(scroll, 200);
		$(window).on('scroll', throttle);

		//swiper图片轮播
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			loop : true,
			spaceBetween: 30,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});

		//筛选
		$(".screen").click(function() {
			$("#shade").fadeIn(function() {
				$(".list").animate({ right: '0px' });
			});
			$("body").on('touchmove.mask', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});

		//点击筛选，出现遮罩
		$("#shade").click(function() {
			$(".list").animate({ right: '-100%' }, function() {
				$("#shade").fadeOut();
			});
			$("body").off(".mask");
		});
		
		$(".city-shade").click(function() {
			$(".city").animate({ right: '-100%' }, function() {
				$(".city-shade").fadeOut();
			});
			$("body").off(".mask");
		});

		//筛选全部点击
		$(".all").click(function() {
			$(this).addClass('border');
			$(this).siblings().removeClass('active').css("text-align", "center");
		});

		//筛选列表全部点击
		$(".own").click(function() {
			$(".all").addClass("border");
			$(".love").removeClass("active").css("text-align", "center");
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
		$("#shade").on('click','.kind',function() {
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
		$(".location").click(function(){
			$(".city-shade").fadeIn(function(){
				$(".city").animate({ right: '0px' });
			});
			$("body").on('touchmove.mask', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
		});
		$(".city a").click(function(){
			$("#showCity").html($(this).html());
			$(this).addClass("citySelected");
			$(".city a").not(this).removeClass("citySelected");
			$(".city").animate({right:"-550px"},function(){
				$("#city-list").fadeOut();
			});
			$("body").off(".mask");
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
			textimg: 'assets/imgs/icons/icon_add_bg.png',
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
			pound: '1.5磅'
		}, {
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
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
			pound: '1.5磅'
		}, {
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
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
			pound: '1.5磅'
		}, {
			link: 'detail.html',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
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
			pound: '1.5磅'
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