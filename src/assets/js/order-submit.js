;(function($, window, document) {

	function touchmove(){
		$("body").on('touchmove.mask', function(event) {
			//去掉默认
			event.preventDefault();
			//终止事件的传播
			event.stopPropagation();
		});
	}
	function removeTouchmove(){
		//解绑事件：
		$("body").off(".mask");
	}

	$(function(){

        //蛋糕款式渲染
		intiData();
		//母亲节留言弹框,惊喜弹框
		mother();

		fnInitPayment();
	});



//	母亲节留言弹框,惊喜弹框
	function mother(){
		var $mother = $(".mother"),
			$mother_shade=$(".mother-shade"),
			$mother_popup=$(".mother-popup"),
			$mother_delate=$(".mother-delate"),
			$mother_confirm=$(".mother-confirm"),
			$mother_word = $(".mother-word"),
			$birthdayWrite = $(".birthdayWrite"),
			$orderWrite = $(".orderWrite"),
			$surprise=$(".surprise");
			$surprised_shade=$(".surprised-shade"),
			$surprised_popup=$(".surprised-popup"),
			$surprised_confirm=$(".surprised-confirm"),

			$discount_shade=$(".discount-shade"),
			$discount_popup=$(".discount-popup"),
			$discount_coupon=$(".discount-coupon"),
			$discount_ul=$("#discount-ul"),
			$cash_coupon=$("#cash-coupon"),
			$popup_confirm=$(".popup-confirm");
//		优惠券点击弹框
		$discount_coupon.on('click','a',function(){
			/*$discount_shade.fadeIn(function(){
				$discount_popup.animate({ right: '0' });
			});*/
			$discount_shade.fadeIn(200, function(){
				$discount_popup.css({
					'-webkit-transform': 'translateX(0%)',
					'transform': 'translateX(0%)'
				});
			});
			touchmove();
		});
//		优惠券弹框隐藏
		$popup_confirm.click(function(){
			/*$discount_popup.animate({ right: '-100%' },function(){
				$discount_shade.fadeOut();
			});*/
			$discount_popup.css({
				'-webkit-transform': 'translateX(100%)',
				'transform': 'translateX(100%)'
			});
			$discount_shade.fadeOut(800);
			removeTouchmove();
		});
		$discount_shade.click(function(e){
			if(e.target==$discount_shade[0]){
				/*$discount_popup.animate({ right: '-100%' },function(){
					$discount_shade.fadeOut();
				});*/
				$discount_popup.css({
					'-webkit-transform': 'translateX(100%)',
					'transform': 'translateX(100%)'
				});
				$discount_shade.fadeOut(800);
			}
			removeTouchmove();
		});
//		弹框里优惠券绑定事件
		$discount_ul.on('click','li',function(){
			if(!$(this).hasClass("active")){
				$(this).addClass("active").siblings().removeClass("active");
			}else{
				$(this).removeClass("active");
			}

		});
		$cash_coupon.on('click','li',function(){
			$(this).addClass("active").siblings().removeClass("active");

		});
//		惊喜弹框
		$surprise.click(function(){
			$surprised_shade.fadeIn(function(){
				$surprised_popup.fadeIn();
			});
			touchmove();
		});
		$surprised_confirm.click(function(){
			$surprised_popup.fadeOut(function(){
				$surprised_shade.fadeOut();
			});
			removeTouchmove();
		});
		$mother.click(function(){
			$mother_shade.fadeIn(function(){
				$mother_popup.fadeIn();
			});
			touchmove();
		});
		$mother_delate.click(function(){
			$mother_popup.fadeOut(function(){
				$mother_shade.fadeOut();
			});
			removeTouchmove();
		});
		$mother_confirm.click(function(){
			$mother_popup.fadeOut(function(){
				$mother_shade.fadeOut();
			});
		});
		$mother_word.maxlength({
	        max: 50,
	        feedbackText: '还可输入{r}字'
	    });
	    $birthdayWrite.maxlength({
	    	max: 50,
	    	feedbackText: '还可输入{r}字'
	    });
	    $orderWrite.maxlength({
	    	max: 200,
	    	feedbackText: '还可输入{r}字'
	    });
	    var data = {
	    	list :[{
	    		cost:'30',
	    		active:true
	    	},{
	    		cost:'30'
	    	},{
	    		cost:'30'
	    	},{
	    		cost:'30'
	    	}]
	    };
	    var discount_ul = template('tplDiscount', data);
	    $discount_ul.html(discount_ul);
	}
//	蛋糕款式渲染
	function intiData(){
		var $surprised_ul=$("#surprised-ul"),
			$convention_ul=$("#convention-ul"),
			$commodity_ul=$("#commodity-ul");
		var data = {
	        list: [{
	            link: 'javascript:;',
	            img: 'assets/imgs/shopping-cart/cake.png',
	            name: {
					cn: '芒果拿破仑',
					en: 'Mango Napoleon'
				},
	            cost:'￥189',
	            poundage:'2.5',
	            attrs:['免费赠送5套餐具','可切分'],
	            motherDay:true,
	            drawing:true
	        }, {
	            link: 'javascript:;',
	            img: 'assets/imgs/shopping-cart/cake.png',
	            name: {
					cn: '芒果拿破仑',
					en: 'Mango Napoleon'
				},
				cost:'￥189',
				poundage:'2.5',
				attrs:['免费赠送5套餐具','可切分'],
				mother:true
	        }]
	    };
	    var surprised_ul = template('tplSurprise', data);
	    var convention_ul = template('tplConvention', data);
	    var commodity_ul = template('tplCommodity', data);
	    $surprised_ul.html(surprised_ul);
	    $convention_ul.html(convention_ul);
	    $commodity_ul.html(commodity_ul);
	}
	var $receipt = $(".receipt"),
		$receipt_a = $receipt.find("ul li a"),
		$ul_one = $(".ul-one").find("li"),
		$ul_two = $(".ul-two").find("li"),
		$ul_three = $(".ul-three").find("li"),
		$receipt_span=$(".receipt-span"),
		$bill = $(".bill"),
		$receipt_submit=$(".receipt-submit");
	$bill.click(function(){
		$receipt.animate({"top":"0"});
	});
	$receipt_submit.click(function(){
		$receipt.animate({"top":"-100%"});
	})
	$receipt_span.click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$receipt_a.addClass("disabled");
		}else{
			$(this).addClass("active");
			$receipt_a.removeClass("disabled");
		}
	});
	$ul_one.click(function(){
		if(!$(this).find("a").hasClass("disabled")){
			return false;
		}else{
			$(this).find("a").addClass("active");
			$(this).siblings().find("a").removeClass("active");
		}
	});
	$ul_two.click(function(){
		if(!$(this).find("a").hasClass("disabled")){
			return false;
		}else{
			$(this).find("a").addClass("active");
			$(this).siblings().find("a").removeClass("active");
		}
	});
	$ul_three.click(function(){
		if(!$(this).find("a").hasClass("disabled")){
			return false;
		}else{
			$(this).find("a").addClass("active");
			$(this).siblings().find("a").removeClass("active");
		}
	});
	var $none = $(".none"),
		$have = $(".have"),
		$address_shade=$(".address-shade"),
		$add_address=$("#add-address"),
		$amend = $(".amend"),
		$add_layout =$(".add-address-layout"),
		$modification_address=$(".modification-address"),
		$save = $(".save"),
		$foot =$(".footer");
	$none.click(function(){
		$address_shade.animate({"top":0})
	});
	$have.click(function(){
		$address_shade.animate({"top":0});
	});
//	修改地址
	$amend.click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$add_layout.animate({"top":0});
	});
	$add_address.click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$add_layout.animate({"top":0});
	});
//	提交
	$foot.click(function(){
		$address_shade.animate({"top":"-200%"});
		$add_layout.animate({"top":"-200%"});
	});
	$("#address-div ul").on("click","li",function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
	//画影
	var $picture_shade=$(".picture-shade"),
		$picture=$(".picture"),
		$convention=$(".convention");
	$convention.on("click",".drawing",function(){
		$picture_shade.fadeIn(function(){
			$picture.fadeIn();
		});
		touchmove();
	});
	$picture_shade.click(function(e){
		if(e.target==$picture_shade[0]){
			$picture_shade.fadeOut();

		}
		removeTouchmove();
	});
//	蛋糕卡
	var $cake_conversion = $(".cake-conversion"),
		$cake_number = $(".cake-number"),
		$cakeCard = $(".cakeCard").find("a");
		$cake_add = $(".cake-add"),
		$cake_card = $(".cake-card"),
		$cake_complete = $(".cake-complete");
	$cakeCard.click(function(){
		$cake_card.fadeIn();
		touchmove();
	});

	$cake_card.click(function(e){
		if(e.target == $cake_card[0]){
			$cake_card.fadeOut();
		}
	})
	$cake_conversion.click(function(){
		var number = $cake_number.val();
		$cake_add.append("<li>"+number+"<span></span></li>");
	});
	$cake_add.on('click','span',function(){
		$(this).parent().remove();
	});
	$cake_complete.click(function(){
		$cake_card.fadeOut();
		removeTouchmove();
	});
	//	裁剪
	(function(){
		var $image = $('#image'),
  			$file = $("#file"),
 			$page = $("body"),
 			$imagesrc = $(".imagesrc");

	 	$image.cropper({
	 		aspectRatio: 1 / 1,
        	autoCropArea: 1,
			movable: false,
	        zoomable: false,
	        rotatable: false,
	        scalable: false,
	        background:false,
	        modal:false,
        	minContainerHeight:500
		});
		$page.on('click', '.inputFile, .reupload-image', function(e) {
	        $inputImage = $(this);
	        var URL = window.URL || window.webkitURL;
	        var blobURL;

	        if (URL) {
	            $inputImage.change(function() {
	                var files = this.files;
	                var file;
					$(".container").fadeIn();
	                if (!$image.data('cropper')) {
	                    return;
	                }

	                if (files && files.length) {
	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        blobURL = URL.createObjectURL(file);
	                        $image.one('built.cropper', function() {

	                            // Revoke when load complete
	                            URL.revokeObjectURL(blobURL);
	                        }).cropper('reset').cropper('replace', blobURL);
	                        $inputImage.val('');
	                        // show imgcropper container
	                        //$imgCropper.show();
	                    } else {
	                        window.alert('Please choose an image file.');
	                    }
	                }
	            });
	        }
	    });
	  	$(".tailor").click(function(){
	  		var img = $image.cropper('getCroppedCanvas', {
	        width: 600,
	        height: 600
	    	}).toDataURL('image/jpeg');
	    	$imagesrc.attr("src",img);
	    	$(".container").fadeOut();
	  	});
	  	$(".reupload-image").click(function(){
	  		$(".container").fadeOut();
	  	})

	})();




//	生日牌选择
	;(function(){
		window.adaptive.desinWidth = 750;
        window.adaptive.init();
	    var showbirthdayDom = document.querySelector('#showbirthday');
	    var birthdayIdDom = document.querySelector('#birthdayId');
	    var birthdayWrite = document.getElementsByClassName("birthday-write");
	    showbirthdayDom.addEventListener('click', function () {

	        var bankSelect = new IosSelect(1,
	            [databirthday],
	            {

	                title: '生日牌',
	                // 每一项的高度，可选，默认 35
	                itemHeight: 0.7,
	                headerHeight: 0.88,
	                cssUnit: 'rem',
	                callback: function (selectOneObj) {
	                    birthdayIdDom.value = selectOneObj.id;
	                    showbirthdayDom.innerHTML = selectOneObj.value;

	                    showbirthdayDom.dataset['id'] = selectOneObj.id;
	                    showbirthdayDom.dataset['value'] = selectOneObj.value;
	                    if(selectOneObj.value==='自定义'){
					    	$(birthdayWrite).show();
					    }else{
					    	$(birthdayWrite).hide();
					    }
	                }
	        });
	    });
	})();
//	支付方式选择

	function fnInitPayment() {
		var $oPaymentPopup = $('.payment-popup'),
			$oPaymentAction = $('#paymentAction'),
			$oBtnPayment = $('#btnPayment'),
			$payShow = $(".payShow"),
			$cake = $(".cake-card"),
			tl = new TimelineLite();

		// 切换支付方式
		$oBtnPayment.on('tap click', function() {

			var paytype = $(this).attr('paytype');
			$oPaymentAction.find('.list').children('li')
				.filter('li[paytype="' + paytype + '"]')
				.addClass('active').siblings().removeClass('active');
			$oPaymentPopup.fadeIn();
			tl.clear();
			tl.to($oPaymentAction, 0.3, {
				y: '0%',
				ease: Linear.easeIn
			});
			touchmove();
		});

		// 支付方式切换
		$oPaymentAction.on('tap click', 'li', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});

		// 关闭支付方式
		$oPaymentAction.on('tap click', '.btn-cancel', function() {

			tl.clear();
			tl.to($oPaymentAction, 0.3, {
				y: '100%',
				ease: Linear.easeOut,
				onComplete: function() {
					$oPaymentPopup.fadeOut(200);
				}
			});
			removeTouchmove();
		});

		// 确定支付方式
		$oPaymentAction.on('tap click', '.btn-ok', function() {

			var $oCurrPayment = $oPaymentAction.find('.list').children('.active'),
				txtPayment = $oCurrPayment.children('.name').text(),
				paytype = $oCurrPayment.attr('paytype');

			$oBtnPayment.attr('paytype', paytype).text(txtPayment);

			tl.clear();
			tl.to($oPaymentAction, 0.3, {
				y: '100%',
				ease: Linear.easeOut,
				onComplete: function() {
					$oPaymentPopup.fadeOut(200);
				}
			});
			removeTouchmove();
		});
	}
//	发票选择
	;(function(){
		window.adaptive.desinWidth = 750;
        window.adaptive.init();
	    var showbill = document.querySelector('#showbill');
	    var billId = document.querySelector('#billId');
	    var bill_privately = document.getElementsByClassName("bill-privately");
	    var bill_company = document.getElementsByClassName("bill-company");
	    showbill.addEventListener('click', function () {

	        var bankSelect = new IosSelect(1,
	            [bill],
	            {

	                title: '发票',
	                // 每一项的高度，可选，默认 35
	                itemHeight: 0.7,
	                headerHeight: 0.88,
	                cssUnit: 'rem',
	                callback: function (selectOneObj) {
	                    billId.value = selectOneObj.id;
	                    showbill.innerHTML = selectOneObj.value;

	                    showbill.dataset['id'] = selectOneObj.id;
	                    showbill.dataset['value'] = selectOneObj.value;
	                    if(selectOneObj.value==='个人'){
					    	$(bill_privately).show();
					    }else{
					    	$(bill_privately).hide();
					    }
					    if(selectOneObj.value ==='公司'){
					    	$(bill_company).show();
					    }else{
					    	$(bill_company).hide();
					    }
	                }
	        });
	    });

	})();
//	订单备注选择
	;(function(){
		window.adaptive.desinWidth = 750;
        window.adaptive.init();
	    var orderComment_span = document.querySelector('#orderComment-span');
	    var orderComment = document.querySelector('#orderComment');
	    var order_write = document.getElementsByClassName("order-comment-write");
	    orderComment_span.addEventListener('click', function () {

	        var bankSelect = new IosSelect(1,
	            [order],
	            {

	                title: '发票',
	                // 每一项的高度，可选，默认 35
	                itemHeight: 0.7,
	                headerHeight: 0.88,
	                cssUnit: 'rem',
	                callback: function (selectOneObj) {
	                    orderComment.value = selectOneObj.id;
	                    orderComment_span.innerHTML = selectOneObj.value;

	                    orderComment_span.dataset['id'] = selectOneObj.id;
	                    orderComment_span.dataset['value'] = selectOneObj.value;
	                    if(selectOneObj.value==='需要'){
					    	$(order_write).show();
					    }else{
					    	$(order_write).hide();
					    }
	                }
	        });

	    });

	})();

//	时间选择
	;(function() {
	window.adaptive.desinWidth = 750;
    window.adaptive.init();

	var selectContactDom = $('#select_contact');
	var showContactDom = $('#show_contact');
	var contactProvinceCodeDom = $('#contact_province_code');
	var contactCityCodeDom = $('#contact_city_code');
	selectContactDom.bind('click', function() {

		var sccode = showContactDom.attr('data-city-code');
		var scname = showContactDom.attr('data-city-name');

		var oneLevelId = showContactDom.attr('data-province-code');
		var twoLevelId = showContactDom.attr('data-city-code');
		var threeLevelId = showContactDom.attr('data-district-code');
		var iosSelect = new IosSelect(3,
			[year, month, day],
			{
				title: '时间选择',
                itemHeight: 0.933333,
                headerHeight: 1.18,
            	cssUnit: 'rem',
				relation: [1, 1, 0],
				oneLevelId: oneLevelId,
				twoLevelId: twoLevelId,
				threeLevelId: threeLevelId,
				callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
					contactProvinceCodeDom.val(selectOneObj.id);
					contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
					contactCityCodeDom.val(selectTwoObj.id);
					contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

					showContactDom.attr('data-province-code', selectOneObj.id);
					showContactDom.attr('data-city-code', selectTwoObj.id);
					showContactDom.attr('data-district-code', selectThreeObj.id);
					showContactDom.html('<span>' + selectOneObj.value + '</span><span> ' + selectTwoObj.value + ' </span><span>' + selectThreeObj.value + '</span>');
				}
			});
		});
	})()
//	生日贺卡选择
	;(function(){
		window.adaptive.desinWidth = 750;
        window.adaptive.init();
	    var showbirthdayDom = document.querySelector('#birthdayCard');
	    var birthdayIdDom = document.querySelector('#birthdayinput');
	    var birthday_card_write = document.getElementsByClassName("birthday-card-write");
	    showbirthdayDom.addEventListener('click', function () {

	        var bankSelect = new IosSelect(1,
	            [birthdayCard],
	            {

	                title: '生日贺卡',
	                // 每一项的高度，可选，默认 35
	                itemHeight: 0.7,
	                headerHeight: 0.88,
	                cssUnit: 'rem',
	                callback: function (selectOneObj) {
	                    birthdayIdDom.value = selectOneObj.id;
	                    showbirthdayDom.innerHTML = selectOneObj.value;

	                    showbirthdayDom.dataset['id'] = selectOneObj.id;
	                    showbirthdayDom.dataset['value'] = selectOneObj.value;
	                    if(selectOneObj.value==='生日卡'){
					    	$(birthday_card_write).show();
					    }else{
					    	$(birthday_card_write).hide();
					    }
	                }
	        });

	    });

	})();

//	城市选择
	(function(){
		$(".default-address").on("click","a",function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");
			}
		});

		(function() {
			window.adaptive.desinWidth = 750;
	        window.adaptive.init();

			var selectContactDom = $('#selectContact');
			var showContactDom = $('#showContact');
			var contactProvinceCodeDom = $('#contact_province_code');
			var contactCityCodeDom = $('#contact_city_code');
			selectContactDom.bind('click', function() {
				var sccode = showContactDom.attr('data-city-code');
				var scname = showContactDom.attr('data-city-name');

				var oneLevelId = showContactDom.attr('data-province-code');
				var twoLevelId = showContactDom.attr('data-city-code');
				var threeLevelId = showContactDom.attr('data-district-code');
				var iosSelect = new IosSelect(3,
					[iosProvinces, iosCitys, iosCountys],
					{
						title: '地址选择',
	                    itemHeight: 0.933333,
	                    headerHeight: 1.18,
	                	cssUnit: 'rem',
						relation: [1, 1, 0],
						oneLevelId: oneLevelId,
						twoLevelId: twoLevelId,
						threeLevelId: threeLevelId,
						callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
							contactProvinceCodeDom.val(selectOneObj.id);
							contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
							contactCityCodeDom.val(selectTwoObj.id);
							contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

							showContactDom.attr('data-province-code', selectOneObj.id);
							showContactDom.attr('data-city-code', selectTwoObj.id);
							showContactDom.attr('data-district-code', selectThreeObj.id);
							showContactDom.html('<span>' + selectOneObj.value + '</span><span> ' + selectTwoObj.value + ' </span><span>' + selectThreeObj.value + '</span>');
						}
				});
			});
		})();
	})();
})(jQuery, window, document);
