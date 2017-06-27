;
(function($, window, document) {

    $(function() {
        $("#integral ul").on("click", "li", function() {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
        });

        var data = {
            list: [{
                integral: '5',
                datatime: '2017-04-14',
                effectivetime: '2017-06-14'
            }, {
                integral: '6',
                datatime: '2017-04-14',
                effectivetime: '2017-06-14'
            }]
        }

        var $integral = $("#integral-inquire");
        var _html = template('telIntegral', data);
        $integral.append(_html);
    });

})(jQuery, window, document);
