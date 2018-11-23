//函数封装
var F_main = {
//	换肤函数
	swithSkin : function(skinName){
		$("#"+skinName).addClass('selected').siblings().removeClass('selected');
//		改变css文件
		$('#cssfile').attr("href","css/skin-css/"+skinName	+".css");
		$.cookie("MyCsskin",skinName,{path:'/',expires:10});
	},
	showImg : function(index){
		var $rollObj = $('#jnImageroll');
		var $rollList = $rollObj.find('div a');
		$('#JS_imgWrap').find('img').eq(index).stop(true,true).fadeIn()
		.siblings().fadeOut();
		$rollList.removeClass('chos').css('opacity',0.7).eq(index).addClass('chos')
		.css('opacity',1);
	},
	showBrandList : function(index){
		var $rollobj = $('#jnBrandList');
		var rollWidth = $rollobj.find('li').outerWidth();
		rollWidth *= 4;
		$rollobj.stop(true,false).animate({left : -rollWidth*index},1000);
	}
}

//搜索文字效果
$(function(){
//	添加鼠标移入文字清空效果
	$('#inputSearch').focus(function() {
		if ($(this).val() == this.defaultValue){
			$(this).val('');
		}
//	鼠标移出默认文字恢复
	}).blur(function(){
		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		}
//		添加键盘事件
	}).keyup(function(e){
//		13表示按下回车键//e.which确定按下的是哪一个按钮
		if (e.which == 13) {
			alert('回车提交表单！');
		}
	});
});
//end

//网页换肤
$(function(){
	var $li = $('#skin li');
	$li.click(function(){
//		调用换肤函数
		F_main.swithSkin(this.id);
	});
//	叫皮肤保存到cookie中
	var cookie_skin = $.cookie("MyCssSkin");
	if (cookie_skin) {
		F_main.swithSkin(cookie_skin)
	}
});

//二级导航效果
$(function(){
//	添加合成事件hover()
	$('#nav li').hover(function(){
//		判断是否正处于动画状态
		if(!$(this).find('.jnNav').is(':animated')){
//			添加动画
			$(this).find('.jnNav').show();
		}
	},function(){
		$(this).find('.jnNav').hide();
	});
});
//end

//火热销售效果
$(function(){
	$('.jnCatainfo .promoted').append('<span class="hot"></span>');
});
//end

//大屏广告
$(function(){
	var $imgrolls = $('#jnImageroll div a');
	$imgrolls.css('opacity',0.7);
//	得到展示图片的数量
	var len = $imgrolls.length;
//	初始化索引
	var index = 0;
	var adTimer = null; 
	$imgrolls.mouseover(function(){
		index = $imgrolls.index(this);
		F_main.showImg(index);
//		为第一张图片添加初始化样式//注意这个JQuery技巧
	}).eq(0).mouseover();
//	鼠标移上图片动画停止
	$('#jnImageroll').hover(function(){
	if (adTimer){
		clearInterval(adTimer);
	}
},function(){
	adTimer = setInterval(function(){
		F_main.showImg(index);
		index++;
		if (index == len){
			index = 0;
		}
	},4000)
//	页面加载后图片自动播放//利用事件触发函数
}).trigger('mouseleave');
});

//超链接提示效果
$(function(){
	var x = 10;
	var y = 20;
//	注意参数e 
	$('a.tooltip').mouseover(function(e){
		this.myTitle = this.title;
		this.title = "";
		var tooltip = "<div id='tooltip'>"+this.myTitle+"</div>";
		$('body').append(tooltip);
		$('#tooltip').css({
			"top" : (e.pageY + y) + 'px',
			"left" : (e.pageX + x) + 'px'
		}).show('fast');
	}).mouseout(function(){
		this.title = this.myTitle;
		$('#tooltip').remove();
	}).mousemove(function(e){
		$('#tooltip').css({
			"top" : (e.pageY + y) + 'px',
			"left" : (e.pageX + x) + 'px'
	});
	});
});

//品牌横向滚动效果
$(function(){
	$('#jnBrandTab li a').click(function(e){
		$(this).parent().addClass('chos').siblings().removeClass('chos');
		var idx = $('#jnBrandTab li a').index(this);
		F_main.showBrandList(idx);
		e.preventDefault();
	}).eq(0).click();
});

//品牌展示鼠标滑过放大镜效果
$(function(){
	$('#jnBrandList ul li').each(function(index){
		var $img = $(this).find('img');
		var $img_w = $img.width();
		var $img_h = $img.height();
//		添加占位符
		var spanHtml = '<div style="position:absolute;top:0;left:5px;width:'+$img_w+
			'px;height:'+$img_h	+'px;class="imageMask"></div>';
		$(this).append(spanHtml);
	});
	$('#jnBrandList div').hover(function(){
//		利用toggle的特性增删属性//hover的移入移出是两个事件
		$(this).toggleClass('imageOver');
	});
});













