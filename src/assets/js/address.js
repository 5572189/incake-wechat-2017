(function(){
	$("#address ul").on("click","li",function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	})
})()
