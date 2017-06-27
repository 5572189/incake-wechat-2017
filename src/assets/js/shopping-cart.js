;
(function($, window, document) {
    
    $(function() {
        var tl = new TimelineLite();

        var swiper01 = new Swiper('.swiper-container01', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 10,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
        });
        var swiper02 = new Swiper('.swiper-container02', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 10,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
        });
        Cake();
		init();
    });

    function Cake() {

        var $number_swiper = $("#number-swiper");
        // var $tableware=$("#tableware");
        var data = {
            list: [{
                aimg: "assets/imgs/shopping-cart/soldout_bg.png",
                img: "assets/imgs/shopping-cart/candle01.png",
                name: '芒果拿破仑',
                nameEn: "Mango Napoleon",
                cost: '189',
                price: '1.5',
                linkimg: "assets/imgs/shopping-cart/shopping.png"
            }, {
                aimg: "assets/imgs/shopping-cart/soldout_bg.png",
                img: "assets/imgs/shopping-cart/candle02.png",
                name: '芒果拿破仑',
                nameEn: "Mango Napoleon",
                cost: '189',
                price: '1.5',
                linkimg: "assets/imgs/shopping-cart/shopping.png"
            }, {
                aimg: "assets/imgs/shopping-cart/soldout_bg.png",
                img: "assets/imgs/shopping-cart/candle03.jpg",
                name: '芒果拿破仑',
                nameEn: "Mango Napoleon",
                cost: '189',
                price: '1.5',
                linkimg: "assets/imgs/shopping-cart/shopping.png"
            }]
        };
        var tplnumber = template('tplnumber', data);
        // var tplTableware = template('tplTableware', data);
        $number_swiper.html(tplnumber);
        // $tableware.html(tplTableware);
    };

    function init() {


        $('.txt-summary').maxlength({
            max: 100,
            feedbackText: '还可输入{r}字'
        });

        var $cake = $("#cake_list"),
            $cake_list = $cake.find('ul li'),
            $pitch_on = $cake_list.find(".pitch-on"),
            $icons = $cake_list.find(".icons"),
            $selectA = $cake_list.find("a"),
            $other = $(".other ul li"),
            $commodity = $(".commodity li>span"),
            $privilege = $(".privilege ul li>span"),
            $all_select = $('.all-select');

        //添加全选功能
        $all_select.on('click', function() {
            var isActive = $(this).hasClass('active');
            var $haveActive = $cake_list.find("a.active");
            if (!isActive) {
                $(this).addClass('active');
                if ($haveActive) {
                    $haveActive.prev('.icons').removeClass('active');
                    $icons.not($haveActive.prev('.icons')).addClass('active');
                }
            } else {
                $(this).removeClass('active');
                $icons.removeClass('active');
            }
        });

        $(".swiper-container02").css("display", "none");

        $other.click(function() {
            var $this = $(this);
            itemIndex = $this.index();
            $this.addClass("active").siblings().removeClass("active");
            $('.lists').eq(itemIndex).show().siblings('.lists').hide();
        });

        $privilege.click(function() {

            if (!$(this).hasClass("active") && !$(this).next('a').hasClass('active')) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
                $('.all-select').removeClass('active');
            }
        });

        $commodity.click(function() {
            if (!$(this).hasClass("active") && !$(this).next('a').hasClass('active')) {
                $(this).addClass("active");
            } else {
                $('.all-select').removeClass('active');
                $(this).removeClass("active");
            }
        })

        $pitch_on.click(function() {
            if (!$(this).hasClass("active") && !$(this).next('a').hasClass('active')) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
                $('.all-select').removeClass('active');
            }
        });

        function add(add, minus, number) {
            var $add = $(add),
                $subtract = $(minus),
                num = 0;

            $add.click(function() {

                amout = parseInt($(number).html());
                amout++;
                if (amout > 1) {
                    $subtract.removeClass('disabled');
                }
                $(number).html(amout);
            });
            $subtract.click(function() {
                if ($(this).hasClass("disabled")) {
                    return false;
                }
                amout = parseInt($(number).html());
                if (amout === 1) {
                    return false;
                }

                amout--;
                if (amout <= 1) {
                    $(this).addClass('disabled');
                }
                $(number).html(amout);
            })
        };

        add('.add01', '.minus01', '.number01');
        add('.add02', '.minus02', '.number02');
        add('.add03', '.minus03', '.number03');
        add('.add04', '.minus04', '.number04');
        add('.add05', '.minus05', '.number05');
        add('.add06', '.minus06', '.number06');
        add('.add07', '.minus07', '.number07');

        //	惊喜遮罩
        (function() {
            var $shade = $("#shade"),
                $shade_li = $shade.find(".shade-list li"),
                $shade_other01 = $(".shade-other01"),
                $shade_other02 = $(".shade-other02"),
                $last_li01 = $shade.find(".last-li01"),
                $last_li02 = $shade.find(".last-li02"),
                $surprised_here = $(".surprised-here"),
                $confirm = $(".confirm a"),
                $shopping_cart = $(".shopping-cart"),
                $shopping = $(".shopping"),
                $shopping_here = $(".shopping-here"),
                $delete = $(".delete"),
                flage = true;


            $delete.click(function() {
                $(this).closest('li').remove();
            })

            $surprised_here.click(function() {
                $this = $(this);
                $shade.fadeIn(function() {
                    $(".shade-list").animate({
                        right: '0'
                    });
                });
                $confirm.click(function() {
                    if (!flage) {
                        $shopping_cart.fadeIn(function() {
                            $shopping.fadeIn();
                        });
                    } else {
                        $(".shade-list").animate({
                            right: '-100%'
                        }, function() {
                            $shade.fadeOut();
                        });
                    }
                    $this.css("opacity", "1");
                });
            });
            $shade.click(function(e) {
                if (e.target === $shade[0]) {
                    $(".shade-list").animate({
                        right: '-100%'
                    }, function() {
                        $shade.fadeOut();
                    });
                }
            });


            $shopping_here.click(function() {
                $shopping_here.fadeOut(function() {
                    $shopping_cart.fadeOut();
                })
            })

            $shade_li.click(function() {
                $(this).addClass("active").siblings().removeClass("active");
            });
            $shade_other01.click(function() {
                $last_li01.focus();
            });

            $shade_other02.click(function() {
                $last_li02.focus();
            });
            $last_li01.focus(function() {
                $shade_other01.addClass("active").siblings().removeClass("active");
            });
            $last_li02.focus(function() {
                $shade_other02.addClass("active").siblings().removeClass("active");
            });
        })();

        //惊喜图片裁剪
        (function() {
            var $image = $('#image01'),
                $file = $("#file01"),
                $page01 = $("body"),
                $imagesrc01 = $(".imagesrc01");

            $image.cropper({
                aspectRatio: 1 / 1,
                autoCropArea: 0.8,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
                background: true,
                modal: true,
                minContainerHeight: 200,
                zoomOnTouch: true
            });
            $page01.on('click', '.inputFile01', function(e) {
                $inputImage = $(this);
                var URL = window.URL || window.webkitURL;
                var blobURL;
                if (URL) {
                    $inputImage.change(function() {
                        var files = this.files;
                        var file;
                        $(".container01").fadeIn();
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

            $(".tailor01").click(function() {
                var img = $image.cropper('getCroppedCanvas', {
                    width: 600,
                    height: 600
                }).toDataURL('image/jpeg');
                $(".container01").fadeOut();
                $imagesrc01.attr("src", img);
            });
            $(".reupload-image01").click(function() {
                $(".container01").fadeOut();
            });
        })();

        //上传裁剪
        (function() {
            var $image = $('#image'),
                $file = $("#file"),
                $page = $("body"),
                $imagesrc = $(".imagesrc"),
                $uploading = $(".uploading"),
                $picture_shade = $(".picture-shade"),
                $picture = $(".picture"),
                $picture_close = $(".picture-close"),
                pid = "0";

            $image.cropper({
                aspectRatio: 1 / 1,
                autoCropArea: 0.8,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
                background: true,
                modal: true,
                minContainerHeight: 200,
                zoomOnTouch: true
            });
            $page.on('click', '.inputFile', function(e) {
                $inputImage = $(this);
                pid = $inputImage.closest('li').attr('pid');
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

            $(".container").on('click', '.tailor', function() {
                var img = $image.cropper('getCroppedCanvas', {
                    width: 600,
                    height: 600
                }).toDataURL('image/jpeg');
                $imagesrc.attr("src", img);
                $(".container").fadeOut();
                var currentli = $('.convention').children('li[pid=' + pid + ']');
                currentli.attr("viewImage", img);
                currentli.find('.uploading').text('预览');
            });

            $(".uploading").click(function() {
                var $this = $(this);
                if ($this.text() === '预览') {
                    $(".picture-img").children().removeAttr('src');
                    var viewimage = $this.closest('li').attr('viewimage');
                    $(".picture-img").children().attr('src', viewimage);
                    $picture_shade.fadeIn(function() {
                        $picture.fadeIn();
                    });
                }
            });
            $(".reupload-image").click(function() {
                $(".container").fadeOut();
            });
            $picture_close.click(function() {
                $picture_shade.fadeOut();
            });

        })();

        //蜡烛加减
        (function() {
            var amout = 0;
            $(".candle").on("click", ".addNumber", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var $this = $(this);
                amout = parseInt($this.siblings('.number').text());
                amout++;

                if (amout > 0) {
                    $this.siblings('.subtract').removeClass('disabled').addClass('active');
                }
                $this.siblings('.number').text(amout);
            });
            $(".candle").on("click", ".subtract", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var $this = $(this);

                if ($this.hasClass("disabled")) {
                    return false;
                }
                amout = parseInt($this.siblings('.number').text());
                if (amout === 0) {
                    $this.addClass('disabled').removeClass('active');
                    return false;
                }
                amout--;
                if (amout <= 0) {
                    $this.addClass('disabled').removeClass('active');
                }
                $this.siblings('.number').text(amout);
            });
        })();

        //盘叉加减
        (function() {
            var amout = 0;
            $(".dish").on("click", ".addNumber", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var $this = $(this);
                amout = parseInt($this.siblings('.number').text());
                amout++;

                if (amout > 0) {
                    $this.siblings('.subtract').removeClass('disabled').addClass('active');
                }
                $this.siblings('.number').text(amout);
            });
            $(".dish").on("click", ".subtract", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var $this = $(this);

                if ($this.hasClass("disabled")) {
                    return false;
                }
                amout = parseInt($this.siblings('.number').text());
                if (amout === 0) {
                    $this.addClass('disabled').removeClass('active');
                    return false;
                }
                amout--;
                if (amout <= 0) {
                    $this.addClass('disabled').removeClass('active');
                }
                $this.siblings('.number').text(amout);
            });
        })();

        $("#number-swiper").on('click', '.select-parcel', function() {
            tl.clear();
            tl.to($(".parcel"), 0.5, {
                bottom: "0%",
                onStart: function() {
                    $(".parcel").css("display", "block");
                    $(".shade").fadeIn();
                }
            });
        });

        $("#tableware").on('click', '.select-dish', function() {
            tl.clear();
            tl.to($(".dish"), 0.5, {
                bottom: "0%",
                onStart: function() {
                    $(".dish").css("display", "block");
                    $(".shade").fadeIn();
                }
            });
        });

        //取消
        $(".cancel").click(function() {
            tl.clear();
            tl.to($('.parcel'), 0.5, {
                bottom: "-100%",
                onComplete: function() {
                    $(".shade").fadeOut();
                }
            });
            tl.to($('.dish'), 0.5, {
                bottom: "-100%"
            });
        });

        //确定
        $(".confirm-select").click(function() {
            tl.clear();
            tl.to($('.parcel'), 0.5, {
                bottom: "-100%",
                onComplete: function() {
                    $(".shade").fadeOut();
                }
            });
            tl.to($('.dish'), 0.5, {
                bottom: "-100%"
            });
        });

        //遮罩空白
        $(".shade").click(function(e) {
            if (e.target === $(".shade")[0]) {
                tl.clear();
                tl.to($('.parcel'), 0.5, {
                    bottom: "-100%",
                    onComplete: function() {
                        $(".shade").fadeOut();
                    }
                });
                tl.to($('.dish'), 0.5, {
                    bottom: "-100%"
                });
            }
        });
    }
})(jQuery, window, document);
