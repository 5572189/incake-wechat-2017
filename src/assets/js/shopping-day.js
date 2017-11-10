(function(window, document, $, undefined) {

  $(function() {
    var startDate = new Date(2017, 10, 10, 0, 0, 0).getTime(),
      endDate = new Date(2017, 10, 10, 23, 59, 59).getTime(),
      currDate = new Date().getTime(),
      maskElem = fnCreateMask();

    var day11 = GetQueryString('day11');

    if (day11 == null && currDate >= startDate && currDate <= endDate) {
      $('body').append(maskElem);
    }
  });

  function fnCreateMask() {
    var maskDom = document.createElement('div');
    maskDom.id = 'maskShoppingDay';

    var bodyDom = document.createElement('div');
    bodyDom.className = 'mask-body';

    var linkDom = document.createElement('a');
    linkDom.className = 'btn-shopping';
    linkDom.href = 'http://wap.incake.net/redactivity/11.aspx';

    bodyDom.appendChild(linkDom);
    maskDom.appendChild(bodyDom);

    return maskDom;
  }

  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }

})(window, document, jQuery);