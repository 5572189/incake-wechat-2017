(function($, window, document) {
    $(function() {
        $("#privilege-nav ul").on("click", "li", function() {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
        });
        (function() {
            var data = {
                list: [{
                    couponcode: 'NO.888888',
                    time: '2015.09.08-2016.09.08',
                    textimg: 'assets/imgs/me-privilege/privilege.png'
                }, {
                    couponcode: 'NO.888888',
                    time: '2015.09.08-2016.09.08',
                    textimg: 'assets/imgs/me-privilege/privilege.png'
                }]
            }
            var $privilege = $("#me-privilege");
            var _html = template('privilegeList', data);
            $privilege.append(_html);

        })();
    });

})(jQuery, window, document);
