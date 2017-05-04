;(function($, window, document) {
	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 30
    });
	$('.txt-summary').maxlength({
        max: 100,
        feedbackText: '还可输入{r}字'
    });
	var $cake_list = $("#cake_list ul li"),
		$pitch_on = $cake_list.find(".pitch-on"),
		$other = $(".other ul li"),
		$commodity = $(".commodity li>span"),
		$privilege = $(".privilege ul li>span");
		
	$other.click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	$privilege.click(function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});
	$commodity.click(function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	})
	$pitch_on.click(function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});
	
	function add(add,minus,number){
		var $add = $(add),
			$subtract = $(minus),
			num = 0;
		
		$add.click(function(){
			
			amout = parseInt($(number).html());
			amout++;
			if(amout > 1){
				$subtract.removeClass('disabled');
			}
			$(number).html(amout);
		});
		$subtract.click(function(){
			if($(this).hasClass("disabled")){
				return false;
			}
			amout = parseInt($(number).html());
			amout--;
			if(amout <= 1){
				$(this).addClass('disabled');
			}
			$(number).html(amout);
		})
	};
	add('.add01','.minus01','.number01');
	add('.add02','.minus02','.number02');
	add('.add03','.minus03','.number03');
	add('.add04','.minus04','.number04');
	add('.add05','.minus05','.number05');
	add('.add06','.minus06','.number06');
	add('.add07','.minus07','.number07');
//	惊喜遮罩
	(function(){
		var $shade = $("#shade"),
			$shade_li =$shade.find(".shade-list li"),
			$shade_other01 = $(".shade-other01"),
			$shade_other02 = $(".shade-other02"),
			$last_li01 =$shade.find(".last-li01"),
			$last_li02 =$shade.find(".last-li02"),
			$surprised_here = $(".surprised-here"),
			$confirm = $(".confirm a"),
			$shopping_cart = $(".shopping-cart"),
			$shopping = $(".shopping"),
			$shopping_here = $(".shopping-here"),
			$delete = $(".delete"),
			flage = true;
		
		
		$delete.click(function(){
			$(this).closest('li').remove();
		})
		
		$surprised_here.click(function() {
			$this = $(this);
			$shade.fadeIn(function(){
				$(".shade-list").animate({ right: '0' });
			});
			$confirm.click(function() {
				if(!flage){
					$shopping_cart.fadeIn(function(){
						$shopping.fadeIn();
					});
				}else{
					$(".shade-list").animate({ right: '-100%' },function(){
						$shade.fadeOut();
					});
				}
				$this.css("opacity","1");
			});
		});
		$shade.click(function(e){
			if(e.target === $shade[0]){
				$(".shade-list").animate({ right: '-100%' },function(){
					$shade.fadeOut();
				});
			}
		});
		

		$shopping_here.click(function(){
			$shopping_here.fadeOut(function(){
				$shopping_cart.fadeOut();
			})
		})
		
		$shade_li.click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
		$shade_other01.click(function(){
			$last_li01.focus();
		});
		$shade_other02.click(function(){
			$last_li02.focus();
		});
	})();
//	优惠购遮罩
//	(function(){
//		var $privilege = $(".privilege"),
//			$privilege_commodity = $(".privilege-commodity"),
//			$favorable = $(".favorable"),
//			$btn = $(".btn");
//		$favorable.click(function(){
//			$privilege.fadeIn(function(){
//				$privilege_commodity.animate({ right: '0' });
//			});
//		});
//		$btn.click(function(){
//			$privilege_commodity.animate({ right: '-100%' }, function() {
//				$privilege.fadeOut();
//			});
//		})
//	})();
	

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
			
	})()
})(jQuery, window, document);
