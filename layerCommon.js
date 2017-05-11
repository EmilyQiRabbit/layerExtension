function getImageWidth(url,callback){
	var img = new Image();
	img.src = url;
	
	// 如果图片被缓存，则直接返回缓存数据
	if(img.complete){
	    callback(img.width, img.height);
	}else{
            // 完全加载完毕的事件
	    img.onload = function(){
			callback(img.width, img.height);
	    }
    }
	
}

$(document).ready(function(){
	$(".imgviewerbutton").click(function(){
		//console.log("click");
		// 获取元素
		var jqthis = $(this);
		var theimg = $(this).siblings().find('img');
		var url = theimg.attr("src");
		// 新建图片
		var imgcontent = $('<img src="'+url+'" class="imgviewer" style="display:none">');
		$(this).siblings().append(imgcontent);
		
		var setting = {
			type: 1,
		  	title: false,
		  	closeBtn: 0,
		  	skin: 'layui-layer-nobg', //没有背景色
		  	shadeClose: true,
		  	shade: 0.6, //遮罩透明度
		  	content: imgcontent
		}
		
		var windowH = $(window).height();
		var windowW = $(window).width();
		
		getImageWidth(url,function(w,h){
			//console.log("win:"+windowH+","+windowW);
			//console.log("img:"+h+","+w);
			// 调整图片大小
			if(w>windowW || h>windowH){
				if(w>windowW && h>windowH){
					w = theimg.width()*3;
					h = theimg.height()*3;
					setting.area = [w+"px",h+"px"];
					//console.log(w+","+h);
				}else if(w>windowW){
					setting.area = [windowW*0.5+"px",windowW*0.5/w*h+"px"];
				}else{
					setting.area = [windowH*0.5/h*w+"px",windowH*0.5+"px"];
				}
				//console.log(setting.area);
			}else{
				setting.area = [w+"px",h+"px"];
			}
			// 设置layer
			layer.open(setting);
		});
	})
})
