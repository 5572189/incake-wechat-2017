(function($, window, document){
    $(function(){
        var $page_container = $('.page-container'),
            $oUphone = $page_container.find('.txt-mobile');
        // 瑞雪检测 --- 登录
        fnInitRxLogin($oUphone.val());
    });
    // 瑞雪检测 --- 登录
    function fnInitRxLogin(id) {
		if(!rxStream) {
			return false;
		}

		var o_username = id,
	        o_mobile = id,
	        b_device = 'wap';

		// send to rxstream server
		rxStream.trackSignup(id, 'login', {
			subject: {
				o_username: o_username,
				o_mobile: o_mobile
			},
			properties: {
				b_device: b_device
			}
		});
	}
})(jQuery, window, document);
