// JavaScript Document

$(document).ready(function  () {
	$(".cm-drop-menu-box-JS").each(function  () {
		var $dropBox = $(this);
		var $dropOpenBtn = $(this).find(".cm-drop-open-btn-JS");
		var $dropList = $(this).find(".cm-drop-list-JS");
		var eventState = $dropBox.data("drop-event");
		
		if ( eventState === "click" ) {
			$dropOpenBtn.click(function  () {
				$dropList.slideToggle(500);
				$dropBox.toggleClass("open");
				$dropBox.on("mouseleave", function  () {
					dropClose ();
				});
				return false;
			});
			$("body").click(function  () {
				dropClose();
			});
		}else if ( eventState === "hover" ) {
			$dropBox.hover(function  () {
				$dropList.slideDown(500);
				$dropBox.addClass("open");
			},function  () {
				dropClose ();
			});
		}
		function dropClose () {
			if ( $dropBox.data("drop-width") ) {
				if ( getWindowWidth () < $dropBox.data("drop-width")+1 ) {
					$dropList.slideUp(500);
					$dropBox.removeClass("open");
				}
			}else {
				$dropList.slideUp(500);
				$dropBox.removeClass("open");
			}
		}
		$(window).resize(function  () {
			if ( getWindowWidth () > $dropBox.data("drop-width") ) {
				$dropList.removeAttr("style");
			}else {
				$dropList.hide();
			}
		});
	});





});