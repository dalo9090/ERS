var winWidth, winHeight, winPos;

$(function(){

	winWidth = $(window).width();
	winHeight = $(window).height();
	winPos = $(window).scrollTop();


	// Go TOP
	$('#top').click(function(){
		$('html, body').animate({scrollTop:0}, 500);
	});

	$(window).scroll(function(){

		var sct = $(window).scrollTop();
		var sct2 = $(document).height();

		/*nav position*/
		if(sct <= 345) {
			$('#nav').removeClass('active');
		} else {
			$('#nav').addClass('active');
		}

		/*top button position*/
		if(sct >= 100) {
			$('#top').fadeIn(300);
			$('#top').css('bottom','50px');
			if(sct >= (sct2 - 1000)) {
				$('#top').css('bottom','258px');
			}
		} else {
			$('#top').hide();
		}

		// 메인 메뉴
		winWidth = $(window).width();
		winPos = $(window).scrollTop();

		if( winPos > $('.gnbWrap').height() ) {

			if( !$('.gnbWrap').hasClass('fixed') ) {
				$('.gnbWrap').addClass('fixed');
			}

		} else {
			if( $('.gnbWrap').hasClass('fixed') ) {
				$('.gnbWrap').removeClass('fixed');
			}
		}
	});
/*

	// 메뉴
	var $gnb = $('#gnb');

	$gnb.find('a').on('focusin mouseover', function(){
		$('#dimed').stop().fadeIn(300);
		$gnb.addClass('active');
		$(this).parents('li').addClass('on').siblings().removeClass('on');
	});
	$gnb.on('focusout mouseleave', function(){
		$('#dimed').stop().fadeOut(300);
		$gnb.removeClass('active');
		$gnb.find('li').removeClass('on');
	});

	//모바일메뉴
	$('.mobile_gnb_open_btn').click(function () {
		if ($(this).is('.is-active')) {
			$(this).removeClass('is-active');
			$('.mobile_gnb_list').removeClass('on');
			$('.family_link_m').removeClass('on');
			$('.header_wrap .header h1').removeClass('on');
			$('html, body').css({
				'height': '100%'
			});
			$('.mobile_gnb_list .gnb_area .oneD.depth').eq(mOneDNum).removeClass('on');
			$('.mobile_gnb_list .gnb_area .twoD').eq(mOneDNum).hide();
		} else {
			$(this).addClass('is-active');
			$('.mobile_gnb_list').addClass('on');
			$('.family_link_m').addClass('on');
			$('.header_wrap .header h1').addClass('on');
			$('html, body').css({
				'height':'100%',
			});
		}
	});

	var mOneDNum = -1;
	$('.mobile_gnb_list .gnb_area .oneD.depth').each(function (i) {
		$(this).click(function () {
			if (mOneDNum !== i) {
				$('.mobile_gnb_list .gnb_area .oneD.depth').eq(mOneDNum).removeClass('on');
				$('.mobile_gnb_list .gnb_area .twoD').eq(mOneDNum).slideUp(300);
				mOneDNum = i;
				$('.mobile_gnb_list .gnb_area .oneD.depth').eq(mOneDNum).addClass('on');
				$('.mobile_gnb_list .gnb_area .twoD').eq(mOneDNum).slideDown(300);
			} else {
				$('.mobile_gnb_list .gnb_area .oneD.depth').eq(mOneDNum).removeClass('on');
				$('.mobile_gnb_list .gnb_area .twoD').eq(mOneDNum).slideUp(300);
				mOneDNum = -1;
			}
		});
	});
*/

	// 로그인 메뉴
	$('.loginArea').mouseenter(function(){
		$('.moreLogin').stop().slideDown(200);
	}).mouseleave(function(){
		$('.moreLogin').stop().slideUp(200);
	});

	// 탭키, 포커스 처리 //
	$('.loginArea').focusin(function(){
		$('.moreLogin').stop().slideDown();
	}).focusout(function(){
		$('.moreLogin').stop().slideUp();
	});

	// 관련 사이트
	$('.sitelink > li > button').on('click', function () {
		if ($(this).parent('li').hasClass('_on')) {
			$('.sitelink > li').removeClass('_on');
		} else {
			$('.sitelink > li').removeClass('_on');
			$(this).parent('li').addClass('_on');
		}
	});

	$('.sitelink > li .list dd:last-child').focusout(function () {
		$(this).parent().parent('li').removeClass('_on');
	});

	// 팝업 처리
	$(document).on('click', '[data-popup=popup]', function(e){

		e.preventDefault();

		/*
		 * 팝업 URL
		 */
		var popupUrl = $(this).attr('href');

		if(popupUrl == undefined || popupUrl == ''){
			popupUrl = $(this).data('popup-href');
		}

		/*
		 * 팝업 높이, 넓이, 이름, 팝업창 또는 Modal 창 여부
		 */
		var popupWidth = $(this).data('popup-width');
		var popupHeight = $(this).data('popup-height');
		var popupName = $(this).data('popup-name');
		var popupModal = $(this).data('popup-modal');

		/*
		 * 팝업 창으로 호출이면
		 */
		if (popupModal != undefined && popupModal == 'Y') {

			$('.modal').css('max-width', popupWidth + 'px');
			$('#modalPopupContent').css('height', popupHeight + 'px');

			this.blur();

			$('#modalPopupContent').attr('src', popupUrl);

			$('#modalPopup').modal({
				fadeDuration: 100
			});

			/*
			 * 불러온 페이지 빈페이지 초기화
			 */
			$('#modalPopup').on($.modal.BEFORE_CLOSE, function(event, modal) {
				$('#modalPopupContent').attr('src', 'about:blank');
			});

		/*
		 * 기본 Modal 창으로 호출
		 */
		} else {

			onPopupWindowSize(popupUrl, popupName, popupWidth, popupHeight);
		}

	});

	// 로그인 체크
	$(document).on('click', '[data-login=Y]', function(e){

		e.preventDefault();

		if ($('#loginYn').val() == 'N') {
			alert('로그인 후 이용하실 수 있습니다.');
			return false;
		}

		window.location.href = $(this).attr('href');
	});

	/*
	 * 숫자만 입력
	 */
	$(document).on('keydown', '[data-number=Y]', function(e){

		if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 46 ||
			e.keyCode == 8 || e.keyCode == 9 ||e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 13){
			return ;
		} else {
			e.preventDefault();
		}
	});

	/*
	 * 한글+영어만 입력
	 */
	$(document).on('keydown', '[data-han-eng=Y]', function(e){

		if((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 16 || e.keyCode == 20 || e.keyCode == 21 ||
			e.keyCode == 27 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 229 ){
			return ;
		} else {
			e.preventDefault();
		}
	});

	// 초기화
	$('#reset').on('click', function(e){
		$(':input')
			.not(':button, :submit, :reset, :hidden, #pageSize')
			.val('')
			.prop('checked', false)
			.prop('selected', false);
	});

	// 팝업창 닫기
	$('#btnPopupClose').on('click', function(){
		window.close();
	});

	//첨부파일 확장자체크
	$(document).on('change', 'input[type=file]', function(e){

		var blackList = ['EXE', 'COM', 'CMD', 'BAT', 'ASPX', 'ASA', 'ASAX', 'ASCX', 'ASHX', 'ASMX',
			'AXD', 'CDX', 'HTR', 'CGI', 'JSP', 'PHP', 'PHP3', 'HTML', 'HTM', 'WAR', 'VBS', 'DLL',
			'JAVA', 'PDB', 'DWF', 'DWG', 'PSD', 'AI', 'EPS'];

		var extention = $(this).val().substring($(this).val().lastIndexOf(".")+1).toUpperCase();

		for (key in blackList){

			if (blackList[key] == extention){

				alert('해당파일은 첨부하실 수 없습니다.');
				$(this).val('');
				break;
			}
		}
	});

	// 전체 화면 submit 시 로딩창 팝업
	$(document).on('submit', 'form', function(e){
		e.preventDefault();

		// 팝업여부 체크
		var target = $(this).attr('target');
		
		// 엑셀 다운로드 여부 체크
		var isExcel = $(this).attr('action').toLowerCase().indexOf('excel');
		var isDoc = $(this).attr('action').toLowerCase().indexOf('documentdownload');
				
		if(target != '' && target == null && isExcel == -1 && isDoc == -1){
			//로딩박스 활성화
			$(".loading_box").css("display", "block");
		}

		e.currentTarget.submit();
	});

});

//20211207 로그인 영역 추가 //
$(function(){
	// 로그인 메뉴
	$('.login_after').mouseenter(function(){
		$('.moreLogin').stop().slideDown(200);
	}).mouseleave(function(){
		$('.moreLogin').stop().slideUp(200);
	});

	// 탭키, 포커스 처리 //
	$('.login_after').focusin(function(){
		$('.moreLogin').stop().slideDown();
	}).focusout(function(){
		$('.moreLogin').stop().slideUp();
	});
});

				$(function(){			
			$(".area_on").click(function () {
			$(this).addClass("area_height");
			
		
		});});
		
/* 20220110 법규 */
$(document).ready( function(){
	$('.td_narrow').click( function(){
		$('.law_on').toggleClass('law_a');
	});
});

//20220119 검색창 열고 닫기, 검색버튼 on/off 상태 저장 추가 start //
function openmenuWin() {
	if ($("#fil_e").css("display") == "block") {
		$(".fil_c").slideUp(0);
		$("#fil_d").hide();
		$(".fil_a").show();
		sessionStorage.setItem("searchBtnYn", "N");
	} else {
		$(".fil_c").slideDown(0);
		$("#fil_d").show();
		$(".fil_a").hide();
		sessionStorage.setItem("searchBtnYn", "Y");
	}
}
function openmenuWin1() {
	if ($("#fil_e1").css("display") == "block") {
		$(".fil_c1").slideUp(0);
		$("#fil_d1").hide();
		$(".fil_a1").show();
		sessionStorage.setItem("searchBtnYn2", "N");
	} else {
		$(".fil_c1").slideDown(0);
		$("#fil_d1").show();
		$(".fil_a1").hide();
		sessionStorage.setItem("searchBtnYn2", "Y");
	}
}
//20220119 검색창 열고 닫기, 검색버튼 on/off 상태 저장 추가 end //

//20220119 검색버튼 on/off 상태값 확인 start// 
$(function (){
	if(sessionStorage.getItem("searchBtnYn") == 'N'){
		$('.fil_c').hide();
		$("#fil_d").hide();
		$(".fil_a").show();
	} else {
		$('.fil_c').show();
		$("#fil_d").show();
		$(".fil_a").hide();
	}
	
	if(sessionStorage.getItem("searchBtnYn2") == 'N'){
		$('.fil_c1').hide();
		$("#fil_d1").hide();
		$(".fil_a1").show();
	} else {
		$('.fil_c1').show();
		$("#fil_d1").show();
		$(".fil_a1").hide();
	}
})
//20220119 검색버튼 on/off 상태값 확인 end// 

		$(document).on("click",".guidebox",function(){
      if($(this).next().css("display")=="none"){
        $(this).next().show();
        $(this).children("span").text("▲");
      }else{
        $(this).next().hide();
        $(this).children("span").text("▼");
      }
});
	
                  