;(function(){
	var bill = [
	    {'id': '10002', 'value': '个人'},
	    {'id': '10003', 'value': '公司'}
	];
	
	;(function(){
	    var showbill = document.querySelector('#showbill');
	    var billId = document.querySelector('#billId');
	    var bill_company = document.getElementsByClassName("name");
	    showbill.addEventListener('click', function () {
	    	
	        var bankSelect = new IosSelect(1, 
	            [bill],
	            {
	            	
	                title: '发票',
	                // 每一项的高度，可选，默认 35
	                itemHeight: 0.7,
	                headerHeight: 0.88,
	                cssUnit: 'rem',
	                callback: function (selectOneObj) {
	                    billId.value = selectOneObj.id;
	                    showbill.innerHTML = selectOneObj.value;
	                    
	                    showbill.dataset['id'] = selectOneObj.id;
	                    showbill.dataset['value'] = selectOneObj.value;
	                    
					    if(selectOneObj.value ==='公司'){
					    	$(bill_company).show();
					    }else{
					    	$(bill_company).hide();
					    }
	                }
	        });
	    });
	})();
	
	var cake = [
	    {'id': '10002', 'value': '蛋糕'},
	    {'id': '10003', 'value': '甜品'}
	];
	
	;(function(){
	    var showbill = document.querySelector('#cake');
	    var billId = document.querySelector('#cakeId');
	    var bill_company = document.getElementsByClassName("name");
	    showbill.addEventListener('click', function () {
	    	
	        var bankSelect = new IosSelect(1, 
	            [cake],
	            {
	            	
	                title: '选择',
	                // 每一项的高度，可选，默认 35
	                itemHeight: 0.7,
	                headerHeight: 0.88,
	                cssUnit: 'rem',
	                callback: function (selectOneObj) {
	                    billId.value = selectOneObj.id;
	                    showbill.innerHTML = selectOneObj.value;
	                    
	                    showbill.dataset['id'] = selectOneObj.id;
	                    showbill.dataset['value'] = selectOneObj.value;
	                    
	                }
	        });
	    });
	})();
})();
