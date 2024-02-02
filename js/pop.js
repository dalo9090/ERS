// JavaScript Document
/**
 * ==============================================================================
 * PROJ : 사업관리시스템
 *
 * NAME : common.js
 *
 * DESC : 공통 페이지 로드 시 공통 기능 정의
 *
 * @author : 개발팀
 *
 * @since 2019. 6. 28.
 *
 * Copyright 2019 All rights reserved
 * ------------------------------------------------------------------------------
 *                  변         경         사         항
 * ------------------------------------------------------------------------------
 *     DATE         AUTHOR                      DESCRIPTION
 * ------------	--------------	-------------------------------------------------
 * 2019. 6. 28.	개발팀				최초 프로그램 작성
 * ==============================================================================
 */

var winWidth, winHeight, winPos;

$(function(){

	winWidth = $(window).width();
	winHeight = $(window).height();
	winPos = $(window).scrollTop();

	
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
	
	// 팝업
	if (typeof jQuery === "undefined") throw new Error("Modal requires jQuery.");

$(".open-lp").on("click", function() {
    var op = $(this);
    var lp = $("#" + $(this).attr("aria-controls"));
    var lpObj = lp.children(".layer-pop_inner");
    var lpObjClose = lp.find(".layer-pop_close");
    var lpObjTabbable = lpObj.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
    var lpObjTabbableFirst = lpObjTabbable && lpObjTabbable.first();
    var lpObjTabbableLast = lpObjTabbable && lpObjTabbable.last();
    var lpOuterObjHidden = $(".skip-links, .masthead, .initial-content, .search-content, .page__footer"); // 레이어 바깥 영역의 요소
    var all = $(".masthead, .page__footer").add(lp);
    var tabDisable;
    var nowScrollPos = $(window).scrollTop();
    
    $("body").css("top", - nowScrollPos).addClass("scroll-off").on("scroll touchmove mousewheel", function(event){
        event.preventDefault(); // iOS 레이어 열린 상태에서 body 스크롤되는 문제 fix
    });

    function lpClose() { // 레이어 닫기 함수
        $("body").removeClass("scroll-off").css("top", "").off("scroll touchmove mousewheel");
        $(window).scrollTop(nowScrollPos); // 레이어 닫은 후 화면 최상단으로 이동 방지
        if (tabDisable === true) lpObj.attr("tabindex", "-1");
        all.removeClass("layer-pop_on");
        lpOuterObjHidden.removeAttr("aria-hidden");
        op.focus(); // 레이어 닫은 후 원래 있던 곳으로 초점 이동
        $(document).off("keydown.lp_keydown");
    }

    $(this).blur();
    all.addClass("layer-pop_on");        
    lpOuterObjHidden.attr("aria-hidden", "true"); // 레이어 바깥 영역을 스크린리더가 읽지 않게
    lpObjTabbable.length ? lpObjTabbableFirst.focus().on("keydown", function(event) { 
        // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
        if (event.shiftKey && (event.keyCode || event.which) === 9) {
            // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
            event.preventDefault();
            lpObjTabbableLast.focus();
        }
    }) : lpObj.attr("tabindex", "0").focus().on("keydown", function(event){
        tabDisable = true;
        if ((event.keyCode || event.which) === 9) event.preventDefault();
        // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
    });

    lpObjTabbableLast.on("keydown", function(event) {
        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
            // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
            event.preventDefault();
            lpObjTabbableFirst.focus();
        }
    });
  
    lpObjClose.on("click", lpClose); // 닫기 버튼 클릭 시 레이어 닫기

    lp.on("click", function(event){
        if (event.target === event.currentTarget) {
            // 반투명 배경 클릭 시 레이어 닫기
            lpClose();
        }
    });
    
    $(document).on("keydown.lp_keydown", function(event) {
        // Esc키 : 레이어 닫기
        var keyType = event.keyCode || event.which;
      
        if (keyType === 27 && lp.hasClass("layer-pop_on")) {
          lpClose();
        }
    });
});

});
