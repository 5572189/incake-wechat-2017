(function($, window, document){
    // 瑞雪系统安装代码 -- 开发环境
		(function(j){var h=j.sdkUrl,a=j.name,d=this,g=d.document,f=null,e=null;d.RXSTREAM201607=a;d[a]=d[a]||function(i){return function(){(d[a]._rx=d[a]._rx||[]).push([i,arguments])}};var b=["track","trackSignup","userIdentify"];for(var c=0;c<b.length;c++){d[a][b[c]]=d[a].call(null,b[c])}if(!d[a].lt){f=g.createElement("script"),e=g.getElementsByTagName("script")[0];f.async=true;f.src=h;e.parentNode.insertBefore(f,e);d[a].lt=1*new Date();d[a].para=j}})({sdkUrl:location.protocol+"//stream.ruixuesoft.com/sdk/rxStream.js",sendLimit:1,showLog:false,name:"rxStream",autoTrack:true,apiHost:location.protocol+"//sc.ruixuesoft.com",appId:311});

		// 瑞雪系统安装代码 -- 生产环境
		// (function(j){var h=j.sdkUrl,a=j.name,d=this,g=d.document,f=null,e=null;d.RXSTREAM201607=a;d[a]=d[a]||function(i){return function(){(d[a]._rx=d[a]._rx||[]).push([i,arguments])}};var b=["track","trackSignup","userIdentify"];for(var c=0;c<b.length;c++){d[a][b[c]]=d[a].call(null,b[c])}if(!d[a].lt){f=g.createElement("script"),e=g.getElementsByTagName("script")[0];f.async=true;f.src=h;e.parentNode.insertBefore(f,e);d[a].lt=1*new Date();d[a].para=j}})({sdkUrl:location.protocol+"//stream.ruixuesoft.com/sdk/rxStream.js",sendLimit:1,showLog:true,name:"rxStream",autoTrack:true,apiHost:location.protocol+"//sc.ruixuesoft.com",appId:347});
})(jQuery, window, document);
