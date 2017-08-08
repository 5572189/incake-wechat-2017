;(function($, window, document) {
	$(function(){
		var $add=$(".add"),
			$pay=$(".pay"),
			$shade_upgrade=$(".shade-upgrade"),
			$upgrade_succeed=$(".upgrade-succeed"),
			$confirm=$(".confirm");
		$add.click(function(){
			// if(!$(this).hasClass("checked")){
			// 	$(this).addClass("checked");
			// }else{
			// 	$(this).removeClass("checked");
			// }
			//$(this).hasClass("checked") ? $(this).removeClass("checked") : $(this).addClass("checked");
			$(this).toggleClass('checked',!$(this).hasClass('checked'));
		})
		$pay.click(function(){
			$shade_upgrade.fadeIn(function(){
				$upgrade_succeed.fadeIn();
			});
		});
		$confirm.click(function(){
			$shade_upgrade.fadeOut();
		});
	});

})(jQuery, window, document);
