  
/* 신 코드 : template_d | 구 코드 : ct_type */
function gnb(param,obj,btn,wrap,dur,meth){
	var param = $(param);
	var btn = param.find(btn);
	var obj = param.find(obj);
	var wrap = $(wrap);
	var data = false;
	var prev_elem = -1;
	var elem;
	var targetHeight = new Array();
	var targetHeightResult;
    var heightResult = btn.outerHeight(true);
    
    
    function gnb_height(){
    	$.each(obj,function(idx){
            targetHeight[idx] = $(this).parent().find(".item").outerHeight(true) + $("#gnb").outerHeight();
        });
        //targetHeightResult = Math.max.apply(null,targetHeight)+80;
    }


    function _open(){
		if(prev_elem == undefined) prev_elem = elem;

		if(prev_elem != elem) {
			prev_elem = elem;
			btn.parent().find(".item").removeAttr("style");

			btn.not(elem).removeClass("current").eq(elem).addClass("current");
			obj.not(elem).css({display:"none",opacity:0});
			gnb_height();
			obj.eq(elem).show().stop().animate({opacity:1},{duration: 300,easing:'swing'});
			param.stop(true,false).animate({"height":targetHeight[elem]},{duration: 300,easing:'swing'});
			param.addClass("open");
			$("#top_layout").addClass("on");  
		}



	}
    
    
    
    function _close(){
		prev_elem = -1;

    	btn.removeClass("current");
    	obj.css({display:"none",opacity:0});
    	param.stop(true,false).animate({"height":heightResult},{duration: 300,easing:'swing'});
    	param.removeClass("open");
		obj.btn.removeClass("on");
		$("#top_layout").removeClass("on");  
	}

	btn.on('mouseover focusin', function(){
		elem = $(this).parent().index();
		_open();
	});

	obj.item = obj.find(".depth2_ul");
	obj.btn = obj.find(".depth2_ul>li>a");
	obj.item.child = obj.item.find(".depth3_ul");
	obj.item.child_btn = obj.item.find(".depth3_ul li a");

	//2st:S
	obj.find("a").last().on("focusout",function(){
		_close();
	});

	obj.btn.on("mouseenter focus",function(){
		obj.btn.removeClass("on");
		$(this).addClass("on");
	});
	//2st:E

	//3st:S
	obj.item.child_btn.on("mouseenter focus",function(){
		obj.btn.removeClass("on");
		$(this).parent().parent().prev().addClass("on");
	});
	//3st:E


	obj.btn.parent().on("mouseleave",function(){
		$(this).removeClass("on");
	});

	obj.find("a").last().on("focusout",function(){
		_close();
		btn.removeClass("current");
	});

	wrap.on("mouseleave",function(){
		_close();
	});

}

function gnb_open(){
	var param = $('#mobile-menu');
	var str = location.href;
	var n = 0;
	var dur = 300; // 애니메이션 진행 속도
	var meth = "easeOutExpo"; // 애니메이션 진행 타입


	param.find(".item").hide();
	param.find(".depth1_ul > .n1 .item").show();
	param.find(".depth1_ul > .n1 > a").addClass("ov");

	param.find("a").on("click",function(event){
		if(param.is(":animated") && param.find(":animated").size()){ return false; }
	});

	function hideMenu() {
		param.find('.collapse').hide().removeClass('ov');
	}
	param.find(".depth1_ul>li>a").on("click",function(event){
		n = $(this).parent().index();
		if($(this).next().attr("class").match("item")){
			if($(this).next().find(" .depth2_ul").size() != 0 && $(this).next().find(" .depth2_ul>li").size() != 0){
				if($(this).next().css("display") == "none"){
					param.find(".depth1_ul>li>a").not(n).removeClass("ov").next().stop(true,true).delay(150).slideUp(150);
					param.find(".depth1_ul>li>a").eq(n).addClass("ov").next().stop(true,true).slideDown(150);
				}
				event.preventDefault();
			}
		}
	});

	param.find(".depth2_ul>li>a").on("click",function(event){
		var t = $(this);

		if(t.next().attr("class").match("depth3_ul")){
			if(t.next().css("display") != "block"){
				t.addClass("ov");
				t.next().slideDown(150);
			}else{
				t.removeClass("ov");
				t.next().slideUp(150);
			}

			event.preventDefault();
		}
	});

	$(window).on('resize', function () {
		$('.mobile-close').click();
	});

}
