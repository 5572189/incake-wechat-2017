(function() {
	$("#nav ul").on("click", "li", function() {
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});

	function Data() {

		var data = {
			list: [{
				link: 'javascript:;',
				ordernumber: 'ABC23443214',
				textlink: 'javascript:;',
				textimg: 'assets/imgs/me-order/cake02.png',
				img: 'assets/imgs/index/cake.png',
				name: {
					cn: '爱丁保之恋'
				},
				price: '169',
				pound: '1.2磅',
				count: 'x1',
				countnumber: '2',
				paid: {
					yj: '189.00',
					wz: '338.00'
				}
			}, {
				link: 'javascript:;',
				ordernumber: 'ABC23443214',
				textlink: 'javascript:;',
				textimg: 'assets/imgs/me-order/cake01.png',
				img: 'assets/imgs/index/cake.png',
				name: {
					cn: '爱丁保之恋'
				},
				price: '169',
				pound: '1.2磅',
				count: 'x1',
				countnumber: '2',
				paid: {
					yj: '189.00',
					wz: '338.00'
				}
			}]
		};

		var $content = $("#content");
		var _html = template('tplList', data);
		$content.append(_html);
	}
	Data();
})()