;
(function($, window, document) {

	$(function() {
		//加载图片
		initData();
		
		var throttle = _.throttle(scroll, 200);
		$(window).on('scroll', throttle);
	});
	
	//scroll事件
	function scroll() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			viewHeight = $(window).height(),
			mainTop = $("#main").offset().top,
			mainHeight = $("#main").height(),
			mainpaddingBottom = parseInt($("#main").css("padding-bottom"));

		var disT = (scrollTop + viewHeight) - (mainTop + mainHeight) - mainpaddingBottom + 10;
		if(disT > 0) {
			initData();
		}

	}
	//swiper图片轮播
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		spaceBetween: 30,
		autoplay: 2500,
	});
	//筛选
	$(".screen").click(function() {
		$("#shade").fadeIn(function() {
			$(".list").animate({ right: '0px' });
		});
		$('html,body').addClass('ovfHiden');
	})
	$("#shade").click(function() {
		$(".list").animate({ right: '-550px' }, function() {
			$("#shade").fadeOut();
		});
		$('html,body').removeClass('ovfHiden');
	});

	function initData() {
		// ajax
		var leftList = {
			list: []
		};

		var rightList = {
			list: []
		};

		var data = [{
			link: 'javascript:;',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
			img: 'assets/imgs/index/cake.png',
			spanimg: 'assets/imgs/index/like.png',
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
			link: 'javascript:;',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
			img: 'assets/imgs/index/cake.png',
			spanimg: 'assets/imgs/index/like.png',
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
			link: 'javascript:;',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
			img: 'assets/imgs/index/cake.png',
			spanimg: 'assets/imgs/index/like.png',
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
			link: 'javascript:;',
			textlink: 'javascript:;',
			textimg: 'assets/imgs/icons/icon_add_bg.png',
			img: 'assets/imgs/index/cake.png',
			spanimg: 'assets/imgs/index/like.png',
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