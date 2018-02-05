;(function($, window, document) {

	function touchmove(){
		$(document).on('touchmove.mask', function(event) {
			//去掉默认
			event.preventDefault();
			//终止事件的传播
			event.stopPropagation();
		});
	}

	function removeTouchmove(){
		//解绑事件：
		$(document).off(".mask");
	}

	$(function(){

    //蛋糕款式渲染
		intiData();
		//母亲节留言弹框,惊喜弹框
		mother();

		fnInitPayment();
	});

	// 母亲节留言弹框,惊喜弹框
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

		// 优惠券点击弹框
		$discount_coupon.on('click','a',function(){
			$discount_shade.fadeIn(200, function(){
				$discount_popup.css({
					'-webkit-transform': 'translateX(0%)',
					'transform': 'translateX(0%)'
				});
			});
			touchmove();
		});

		// 优惠券弹框隐藏
		$popup_confirm.click(function(){
			$discount_popup.css({
				'-webkit-transform': 'translateX(100%)',
				'transform': 'translateX(100%)'
			});
			$discount_shade.fadeOut(800);
			removeTouchmove();
		});

		$discount_shade.click(function(e){
			if(e.target==$discount_shade[0]){
				$discount_popup.css({
					'-webkit-transform': 'translateX(100%)',
					'transform': 'translateX(100%)'
				});
				$discount_shade.fadeOut(800);
			}
			removeTouchmove();
		});

		// 弹框里优惠券绑定事件
		$discount_ul.on('click','li',function(){
			if(!$(this).hasClass("active")){
				$(this).addClass("active").siblings().removeClass("active");
			}else{
				$(this).removeClass("active");
			}
			removeTouchmove();
		});

		$cash_coupon.on('click','li',function(){
			$(this).addClass("active").siblings().removeClass("active");
		});

		// 惊喜弹框
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
			removeTouchmove();
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

	// 蛋糕款式渲染
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
        cost:'189',
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
				cost:'189',
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
	});

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

	// 修改地址
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

	// 提交
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

	// 向阳卡
	var $sunnyCard = $(".sunnyCard"),
		$sunny_card = $(".sunny-card"),
		$sunny_complete = $sunny_card.find('.sunny-complete'),
		$sunny_conversion = $sunny_card.find('.sunny-conversion'),
		$sunny_number = $sunny_card.find('.sunny-number'),
		$sunny_add = $sunny_card.find('.sunny-add');

	$sunnyCard.click(function(){
		$sunny_card.fadeIn();
		touchmove();
	});

	$sunny_card.click(function(e){
		if(e.target == $sunny_card[0]){
			$sunny_card.fadeOut();
			removeTouchmove();
		}
	});

	$sunny_complete.click(function(){
		$sunny_card.fadeOut();
		removeTouchmove();
	});

	$sunny_conversion.click(function(){
		var number = $sunny_number.val();
		$sunny_add.append("<li>ID:<span>"+number+"</span><span>余额: <span>￥256</span></span><span class='delete-card'></span></li>");
	});

	$sunny_card.on('click','.delete-card',function(){
		$(this).parent().remove();
	});

	// 蛋糕卡
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
			removeTouchmove();
		}
	});

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

	// 裁剪
	;(function(){

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
  	});
	})();

	// 生日牌选择
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
          itemHeight: 1,
          headerHeight: 1,
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

	// 支付方式选择
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

	// 发票选择
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
          itemHeight: 1, // 每一项的高度，可选，默认 35
          headerHeight: 1,
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

	// 订单备注选择
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
            itemHeight: 1,
            headerHeight: 1,
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

	// 时间选择
  ;(function () {
    window.adaptive.desinWidth = 750;
    window.adaptive.init();
    var selectContactDom = $('#select_contact');
    var showContactDom = $('#show_contact');
    var contactProvinceCodeDom = $('#contact_province_code');
    var contactCityCodeDom = $('#contact_city_code');

    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();

    showContactDom
      .attr('data-year', nowYear)
      .attr('data-month', nowMonth)
      .attr('data-date', nowDate);

    // 格式化年份
    function formatYear() {
      var arr = [];

      arr.push({
        id: nowYear + '',
        value: nowYear + '年'
      });

      // 当前月份是12月，并且当前日期大于1号，则追加上下一年份
      if (nowMonth == 12 && nowDate > 1) {
        arr.push({
          id: (nowYear + 1) + '',
          value: (nowYear + 1) + '年'
        });
      }
      return arr;
    }

    // 格式化月份
    function formatMonth(year) {
        var arr = [];

        // 如果是当前年
        if (year == nowYear) {
            arr.push({
                id: nowMonth + '',
                value: nowMonth + '月'
            });

            // // 如果当前日期大于1号并且当前月份不是12月，则追加下一个月
            if (nowDate > 1 && nowMonth != 12) {
                arr.push({
                    id: (nowMonth + 1) + '',
                    value: (nowMonth + 1) + '月'
                });
            }
        } else {

            // 跨年，如果当前日期大于1号，则追加下一年的第一个月
            if (nowDate > 1) {
                arr.push({
                    id: 1 + '',
                    value: 1 + '月'
                });
            }
        }

        return arr;
    }

    // 格式化日期
    function formatDate(month, count) {
        var arr = [];

        if (month == nowMonth) {
            for (var i = nowDate + 1; i <= count; i++) {
                arr.push({
                    id: i + '',
                    value: i + '日'
                });
            }
        } else {
            for (var i = 1; i <= nowDate - 1; i++) {
                arr.push({
                    id: i + '',
                    value: i + '日'
                });
            }
        }

        return arr;
    }

    // 格式化时间段
    function formatHour() {
        var line = -1;

        /*if (isqg == "1" && IsContainFlower) {
            line = -1;
        }
        else {
            line = parseInt($have.attr("waihuan"));
            //是否包含布鲁斯冰淇淋蛋糕
            var isContainIceCake = ContainIceCake();
            if (isContainIceCake) {
                if (line == 0) {
                    line = 9
                }
                else if (line == 2) {
                    line = 10
                }
            }

            if (line == -1) {
                return false;
            }
        }*/

        return deliveryTimeJson['interval_' + (line + 1)];
    }

    // 年份数据
    var yearData = function (callback) {
        callback(formatYear());
    }

    // 月份数据
    var monthData = function (year, callback) {
        callback(formatMonth(year));
    };

    // 日期数据
    var dateData = function (year, month, callback) {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            callback(formatDate(month, 31));
        }
        else if (/^(4|6|9|11)$/.test(month)) {
            callback(formatDate(month, 30));
        }
        else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                callback(formatDate(month, 29));
            }
            else {
                callback(formatDate(month, 28));
            }
        }
        else {
            throw new Error('month is illegal');
        }
    };

    // 时间段数据，方法
    var hourData = function (year, month, date, callback) {
        // callback(formatHour(parseInt(line) + 1));
        callback(formatHour());
    };

    selectContactDom.bind('click', function () {

        //全国商品且不是鲜花不用选择收获时间
        /*if (isqg == "1" && !IsContainFlower) {
            return false;
        }

        //获取区域
        var $have = $('.have');
        if ($have.attr('style') == undefined || $have.attr('style').indexOf('block') < 0) {
            ShowMessage("请选择收获地址！");
            return false;
        }*/

        var oneLevelId = showContactDom.attr('data-year');
        var twoLevelId = showContactDom.attr('data-month');
        var threeLevelId = showContactDom.attr('data-date');
        var fourLevelId = showContactDom.attr('data-hour');
        var iosSelect = new IosSelect(4,
            [yearData, monthData, dateData, hourData],
            {
                title: '时间选择',
                itemHeight: 0.933333,
                headerHeight: 1.18,
                cssUnit: 'rem',
                relation: [1, 1, 1],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                fourLevelId: fourLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj) {
                    showContactDom.attr('data-year', selectOneObj.id);
                    showContactDom.attr('data-month', selectTwoObj.id);
                    showContactDom.attr('data-date', selectThreeObj.id);
                    showContactDom.attr('data-hour', selectFourObj.id);
                    showContactDom.html('<span id="year">' + selectOneObj.value + '</span><span id="month"> ' + selectTwoObj.value + ' </span><span id="date">' + selectThreeObj.value + '</span><span id="hour">' + selectFourObj.value + '</span>');
                    // AddDeliveryTime(selectOneObj.value, selectTwoObj.value + selectThreeObj.value, selectFourObj.value);
                }
            });
    });

    function AddDeliveryTime(year, date, hour) { // 2017年 12月10日(星期日) 13:30 - 14:30
        year = year.replace('年', '');
        var matches = date.match(/^(\d+)月(\d+).+$/);
        date = matches[1] + "-" + matches[2];
        var startHour = hour.split('-')[0];
        var endHour = hour.split('-')[1];
        var startDeliveryTime = year + '-' + date + " " + startHour;
        var endDeliveryTime = year + '-' + date + " " + endHour;
        $('#deliveryTime').val(year + '/' + date.replace('-', '/') + " " + endHour);
        var deliveryTime = startDeliveryTime + "/" + endDeliveryTime;

        AddPayTypeToRedis("addDeliveryTime", deliveryTime);
        //activity
        CalculateSurpriseCakeDisCount();
        //activity
    }
  })();

	// 生日贺卡选择
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
          itemHeight: 1, // 每一项的高度，可选，默认 35
          headerHeight: 1,
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

	// 城市选择
	;(function(){

		$(".default-address").on("click","a",function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");
			}
		});

		// 高德地图智能提示模块代码
		(function($layout) {
			// Doms
			var $addrElem = $layout.find('.address'),
				$inputElem = $addrElem.find('input'),
				$listElem = $addrElem.find('.search-addrlist'),
				$submitElem = $layout.find('.footer a'),
				$outServiceElem = $layout.find('.out-service-tip'),
				$unmatchElem = $layout.find('.unmatch-tip');

			// Amap variables
			var autocomplete = null;
			AMap.plugin(['AMap.Autocomplete'], function() {
				var autoOptions = {
					city: ''
				};
				autocomplete = new AMap.Autocomplete(autoOptions);
			});

			// 文本改变事件
			$inputElem.on('input focus', function(e) {
				var _html = '';
				var keywords = $(this).val().trim();

				if (keywords == '') {
					$listElem.empty().hide();
					return false;
				}

				autocomplete.search(keywords, function(status, result) {
					if (status == 'complete') {
						var tips = result.tips;

						// 过滤掉没有详细地址信息的数据
						tips = tips.filter(function(tip) {
							return !(tip.id == '' || location == '');
						});

						if (tips.length == 0) {
							$listElem.empty().hide();
							return false;
						}

						tips.forEach(function(tip) {
							_html += '<li';
							_html += ' data-adcode="' + tip.adcode + '"';
							_html += ' data-address="' + tip.address + '"';
							_html += ' data-district="' + tip.district + '"';
							_html += ' data-lng="' + tip.location.lng + '"';
							_html += ' data-lat="' + tip.location.lat + '"';
							_html += ' data-name="' + tip.name + '"';
							_html += ' data-typecode="' + tip.typecode + '">';
							_html += tip.name + '<span>' + tip.district + '</span>';
							_html += '</li>';
						});

						// 将提交按钮禁用
						$submitElem.addClass('disabled').on('click.disabled', function(e) {
							e.preventDefault();
							e.stopPropagation();
						});
						$listElem.html(_html).show();
					}
				});
			});

			// 搜索列表项选中事件
			$listElem.on('click', 'li', function(e) {
				var $elem = $(this);
				var data = {
					adcode: $elem.data('adcode'),
					address: $elem.data('address'),
					district: $elem.data('district'),
					lng: parseFloat($elem.data('lng')),
					lat: parseFloat($elem.data('lat')),
					name: $elem.data('name'),
					typecode: $elem.data('typecode')
				};

				// 验证地址合法性
				// 1.是否在配送范围内
				var isInService = true;
				if (!isInService) {
					$outServiceElem.fadeIn();
					return false;
				}

				// 2.与下拉框选择的市/区是否匹配
				var isMatch = false;
				if (!isMatch) {
					$unmatchElem.fadeIn();
					return false;
				}

				$inputElem.val(data.name);
				$listElem.hide();

				// 启用提交按钮
				$submitElem.removeClass('disabled').off('.disabled');
				console.log(data);
			});

			// 关闭超出配送范围提示
			$outServiceElem.on('click', '.btn-confirm', function(e) {
				$outServiceElem.fadeOut();
			});

			// 关闭地址不匹配提示
			$unmatchElem.on('click', '.btn-cancel', function(e) {
				$unmatchElem.fadeOut();
			});

			// 地址不匹配，确定切换
			$unmatchElem.on('click', '.btn-switch', function(e) {
				// todo 切换逻辑
			});
		})($('.add-address-layout'));

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
            itemHeight: 1,
            headerHeight: 1,
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
