//函数封装
var F_main = {
//	换肤函数
	swithSkin : function(skinName){
		$("#"+skinName).addClass('selected').siblings().removeClass('selected');
//		改变css文件
		$('#cssfile').attr("href","css/skin-css/"+skinName	+".css");
		$.cookie("MyCsskin",skinName,{path:'/',expires:10});
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

//图片放大镜效果

$(function(){
	$('.jqzoom').jqzoom({
	zoomType:'standard',
	lens:true,
	preloadImages:false,
	alwaysOn:false,
	zoomWidth:340,
	zoomHeight:340,
	xOffset:10,
	yOffset:0,
	position:'right'
	
	});
});

//图片遮罩效果
$(function(){
	$('#jnProitem ul.imgList li a').bind("click",function(){
//		得到当前img的链接图片
		var imgSrc = $(this).find('img').attr('src');
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
//		将其转化为大图
		var imgSrc_big = imgSrc + "_big" +unit;
//		设置为遮罩图片
		$('#thickImg').attr("href",imgSrc_big);
	});
});

//网页选项卡
var $div_li = $('.tab_menu ul li');
			$div_li.click(function(){
				$(this).addClass('selected').siblings().removeClass('selected');
				var index = $div_li.index(this);
				$('div.tab_box>div').eq(index).show().siblings().hide();
			}).hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			});

//右侧产品颜色切换
$(function(){
	$('.color_change ul li img').click(function(){
		$(this).addClass('hover').parent().siblings().find('img').removeClass('hover');
		var imgSrc = $(this).attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
//		更改属性
		var imgSrc_small = imgSrc +"_one_small"+unit;
		var imgSrc_big = imgSrc +"_one_big"+unit;
//		添加属性
		$("#bigImg").attr("src",imgSrc_small);
		$('#thickImg').attr("href",imgSrc_big);
//		更换文字说明
		var alt = $(this).attr("alt");
		$('.color_change strong').text(alt);
		 var newImgSrc = imgSrc.replace("images/pro_img/","");
//		 隐藏所有的图片项
		 $('#jnProitem .imgList li').hide();
//		 显示选中的图片项
		 $('#jnProitem .imgList').find(".imgList_"+newImgSrc).show();
//		 初始化图片项即第一项默认被点击
		 $('#jnProitem .imgList').find(".imgList_"+newImgSrc).eq(0).find('a').click();
	});
});

//尺寸选择效果
$(function(){
	$('.pro_size li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parent('ul').siblings('strong').text($(this).text());
	});
});

//价格联动
$(function(){
	var $span = $('.pro_price strong');
	var price = $span.text();
	$('#num_sort').change(function(){
	var num = $(this).val();
	var amount = num * price;
	$span.text(amount);
	});
	
});

//星星评分
$(function(){
	$('ul.rating li a').click(function(){
		var title = $(this).attr('title');
		alert('您给此商品的评分是'+title);
		var cl = $(this).parent().attr('class');
		$(this).parent().parent().removeClass().addClass("rating " + cl + "star");
		$(this).blur();
		return false;
		
	});
});

/*最终购买输出*/
$(function(){
    var $product = $(".jnProDetail");
	$("#cart a").click(function (e) {        
		var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color =  $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
	    var pro_price = $product.find(".pro_price strong").text();
		var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是："+pro_name+"；"+
				"尺寸是："+pro_size+"；"+
				"颜色是："+pro_color+"；"+
				"数量是："+pro_num+"；"+
				"总价是："+pro_price +"元。</div>";
		$("#jnDialogContent").html(dialog);
		$('#basic-dialog-ok').modal();
		return false;//避免页面跳转
	});
})













