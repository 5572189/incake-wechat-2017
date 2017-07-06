(function($, window, document) {
    $(function() {

        // 图片懒加载
        var imgLazyLoad = new LazyLoad({
            elements_selector: ".lazy"
        });

        // 节流函数，减少更新频率
        var imgsThrottle = _.throttle(updateViewport, 200);
        $(window).on('scroll', imgsThrottle);

        function updateViewport() {
            imgLazyLoad.update();
        }

        fnBindCakeData(updateViewport);
    });

    function fnBindCakeData(cb4Updateviewport) {
        var data = {
            list: [{
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",

                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",

                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }, {
                linkimg: "assets/imgs/index/cake.png",
                describe:"芝士系列口味；免费赠送5套餐具、生日牌（生日牌中文字不超过10个，英文字母不超过20个）",
                
                na: '以爱之名',
                en: 'All About Love',
                price: '￥69',
                number: '1个'
            }]
        }

        var $cake = $("#flower-list");
        var _html = template('tplCake', data);
        $cake.append(_html);

		cb4Updateviewport && cb4Updateviewport();
    }
})(jQuery, window, document);
