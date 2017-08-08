(function($, window, document) {
    $(function() {
        $(".default-address").on("click", "a", function() {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });

        (function() {
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
                var iosSelect = new IosSelect(3, [iosProvinces, iosCitys, iosCountys], {
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
    });

    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        var autoOptions = {
            city: "上海", //城市，默认全国
            input: "keyword" //使用联想输入的input的id
        };
        autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            city: '上海',
            map: map
        })
        AMap.event.addListener(autocomplete, "select", function(e) {
            //TODO 针对选中的poi实现自己的功能
            placeSearch.search(e.poi.name)
        });
    });

    $('.address').on('click',function(){
        $('.shade-keyword').animate({
            "left":'0'
        });
    });
    $('#confirmSeek').on('click',function(){
        var value = $('#keyword').val();
        $('.selectDistrict').html(value);
        $('.shade-keyword').animate({
            "left":'100%'
        });
    });

})(jQuery, window, document)
