;
(function($, window, document) {

    $(function() {
        (function() {
            var sex_select = document.querySelector('#sex-select');
            var sex = document.querySelector('#sex');
            var sexId = document.querySelector('#sexId');
            sex_select.addEventListener('click', function() {
                var bankId = sex.dataset['id'];
                var bankName = sex.dataset['value'];

                var bankSelect = new IosSelect(1, [data], {
                    container: '.container',
                    title: '性别选择',
                    itemHeight: 0.7,
                    headerHeight: 0.88,
                    cssUnit: 'rem',
                    oneLevelId: bankId,
                    callback: function(selectOneObj) {
                        sexId.value = selectOneObj.id;
                        sex.innerHTML = selectOneObj.value;
                        sex.dataset['id'] = selectOneObj.id;
                        sex.dataset['value'] = selectOneObj.value;
                    }
                });
            });
            var data = [{
                    'id': '10001',
                    'value': '男'
                },
                {
                    'id': '10002',
                    'value': '女'
                }
            ];
        })();

        ;
        (function() {
            var selectDateDom = $('#selectDate');
            var showDateDom = $('#showDate');
            // 初始化时间
            var now = new Date();
            var nowYear = now.getFullYear();
            var nowMonth = now.getMonth() + 1;
            var nowDate = now.getDate();
            showDateDom.attr('data-year', nowYear);
            showDateDom.attr('data-month', nowMonth);
            showDateDom.attr('data-date', nowDate);
            // 数据初始化
            function formatYear(nowYear) {
                var arr = [];
                for (var i = nowYear - 30; i <= nowYear + 5; i++) {
                    arr.push({
                        id: i + '',
                        value: i + '年'
                    });
                }
                return arr;
            }

            function formatMonth() {
                var arr = [];
                for (var i = 1; i <= 12; i++) {
                    arr.push({
                        id: i + '',
                        value: i + '月'
                    });
                }
                return arr;
            }

            function formatDate(count) {
                var arr = [];
                for (var i = 1; i <= count; i++) {
                    arr.push({
                        id: i + '',
                        value: i + '日'
                    });
                }
                return arr;
            }
            var yearData = function(callback) {
                setTimeout(function() {
                    callback(formatYear(nowYear))
                })
            }
            var monthData = function(year, callback) {
                setTimeout(function() {
                    callback(formatMonth());
                });
            };
            var dateData = function(year, month, callback) {
                setTimeout(function() {
                    if (/^1|3|5|7|8|10|12$/.test(month)) {
                        callback(formatDate(31));
                    } else if (/^4|6|9|11$/.test(month)) {
                        callback(formatDate(30));
                    } else if (/^2$/.test(month)) {
                        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                            callback(formatDate(29));
                        } else {
                            callback(formatDate(28));
                        }
                    } else {
                        throw new Error('month is illegal');
                    }
                });

            };
            selectDateDom.bind('click', function() {
                var oneLevelId = showDateDom.attr('data-year');
                var twoLevelId = showDateDom.attr('data-month');
                var threeLevelId = showDateDom.attr('data-date');
                var iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
                    title: '时间选择',
                    itemHeight: 0.7,
                    headerHeight: 0.88,
                    cssUnit: 'rem',
                    relation: [1, 1],
                    oneLevelId: oneLevelId,
                    twoLevelId: twoLevelId,
                    threeLevelId: threeLevelId,
                    showLoading: true,
                    callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
                        showDateDom.attr('data-year', selectOneObj.id);
                        showDateDom.attr('data-month', selectTwoObj.id);
                        showDateDom.attr('data-date', selectThreeObj.id);
                        showDateDom.html('<span>' + selectOneObj.value + '</span><span> ' + selectTwoObj.value + '</span><span> ' + selectThreeObj.value + '</span>');
                    }
                });
            });
        })();

        //	裁剪
        (function() {
            var $image = $('#image'),
                $file = $("#file"),
                $page = $("body"),
                $imagesrc = $(".imagesrc"),
                $picture_shade = $(".picture-shade"),
                $picture = $(".picture");

            $image.cropper({
                aspectRatio: 1 / 1,
                autoCropArea: 1,
                movable: false,
                zoomable: false,
                rotatable: false,
                scalable: false,
                background: false,
                modal: false,
                minContainerHeight: 500
            });
            $page.on('click', '.inputFile', function(e) {
                $inputImage = $(this);
                var URL = window.URL || window.webkitURL;
                var blobURL;
                if (URL) {
                    $inputImage.change(function() {
                        var files = this.files;
                        var file;
                        $(".container-picture").fadeIn();
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

            $(".tailor").click(function() {
                var img = $image.cropper('getCroppedCanvas', {
                    width: 600,
                    height: 600
                }).toDataURL('image/jpeg');
                $imagesrc.attr("src", img);
                $(".container-picture").fadeOut();
            });
            $(".reupload-image").click(function() {
                $(".container-picture").fadeOut();
            });

        })();
    });

})(jQuery, window, document);
