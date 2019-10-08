/**********************************************************************************
## 전역변수
**********************************************************************************/
var achiveListFn;
var achiveListFn02;
var achiveListFn03;

/**********************************************************************************
## PC / 모바일, 태블릿 기기 구분
**********************************************************************************/
var filter = "win16|win32|win64|mac|macintel";
var isPcDevice;
if ( navigator.platform ) {
	if(filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
		//mobile : alert('mobile 접속');
		isPcDevice = false;
	}else{
		//pc : alert('pc 접속'); 
		isPcDevice = true;
	}
}

$(document).ready(function() {
	var mainSwipeWrap;
	if($('.mainSwipeWrap').length) {
		mainSwipeWrap = new Swiper('.mainSwipeWrap', {
			loop : true
			, on : {
				init : function() {
					var wrapW = $('.mainSwipeWrap').outerWidth();
					var eleItem = $('.mainSwipeWrap li');
					eleItem.css('width', wrapW);
					this.update();
				}
				, resize : function(swiper) {
					this.update();
				}
				, transitionEnd : function(swiper) {

				}
			}
			, allowTouchMove : false
			, navigation: {
				prevEl: '.mainSwipeWrap .btnPrev'
				, nextEl: '.mainSwipeWrap .btnNext'
			  }
		});
	}

	var deatailThumFn;
	if($('.descriptThum').length) {
	deatailThumFn = new Swiper('.descriptThum', {
			loop : true
			, on : {
				init : function() {
					var wrapW = $('.descriptThum').outerWidth();
					var eleItem = $('.descriptThum li');
					eleItem.css('width', wrapW);
					this.update();
				}
				, resize : function(swiper) {
					this.update();
				}
				, transitionEnd : function(swiper) {

				}
			}
			, allowTouchMove : false
			, navigation: {
				prevEl: '.descriptThum .btnPrev'
				, nextEl: '.descriptThum .btnNext'
			  }
		});
	}

	var achiveMoreFn;
	if($('.descriptThum').length) {
		achiveMoreFn = new Swiper('.moreListWrap', {
			loop : true
			, on : {
				init : function() {
					var wrapW = $('.moreListWrap').outerWidth();
					var eleItem = $('.moreListWrap .swiper-slide');
					eleItem.css('width', wrapW);
					this.update();
				}
				, resize : function(swiper) {
					this.update();
				}
				, transitionEnd : function(swiper) {

				}
			}
			, allowTouchMove : false
			, navigation: {
				prevEl: '.achiveMoreBox .btnPrev'
				, nextEl: '.achiveMoreBox .btnNext'
			  }
		});
	}

	// start : gnb func
	gnbFn();
	// end : gnb func

	// start : tag menu func
	tagMenuFn();
	// end : tag menu func

	// start : top searchbox function
	topSrchFn();
	// end : top searchbox function

	// start : achive list
	if($('.achiveListWrap').length) {
		achiveListFn = new Masonry('.achiveListWrap .grid', {
			itemSelector: '.grid-item',
			// columnWidth: '.grid-item',
			columnWidth: 200,
			// fitWidth: true,
			gutter: 30,
			reisze : false,
			percentPosition: true
		});
	}
	if($('.achiveListWrap02').length) {
		achiveListFn02 = new Masonry('.achiveListWrap02 .grid', {
			itemSelector: '.grid-item',
			columnWidth: '.grid-item',
			// columnWidth: 200,
			// fitWidth: true,
			gutter: 30,
			reisze : false,
			percentPosition: true
		});
	}
	if($('.achiveListWrap03').length) {
		achiveListFn03 = new Masonry('.achiveListWrap03 .grid', {
			itemSelector: '.grid-item',
			columnWidth: '.grid-item',
			// columnWidth: 200,
			// fitWidth: true,
			gutter: 30,
			reisze : false,
			percentPosition: true
		});
	}
	// end : achive list
});

/**********************************************************************************
## GNB FUNCTION
**********************************************************************************/
var gnbFn = function() {console.log('gnb function start');
	var contsWrap = $('.contents');
	var eleDepth = $('> [class^="subMenu"]', contsWrap);
	var pageWrap = $('> [class^="pageWrap"]', contsWrap);
	var selectedItem = pageWrap.eq(0);

	pageWrap.eq(1).bind('transitionend', function() {
		if($('.achiveListWrap').length) achiveListFn.layout();
		if($('.achiveListWrap02').length) achiveListFn02.layout();
		if($('.achiveListWrap03').length) achiveListFn03.layout();
	});

	eleDepth.click(function(e) {e.preventDefault();
		console.log('click');
		var _this = $(this);
		var _conts = $('.' + _this.data('tab-conts'));
		var _thisIdx = eleDepth.index(this);

		if(parseInt(_conts.css('width'), 10) === 0) {
			if(_thisIdx === 0) {
				eleDepth.eq(0).css({
					'left' : '19px'
					, 'transition' : 'left 0.7s ease'
				});
				eleDepth.eq(1).css({
					'left' : 'calc(100vw - 133px)'
					, 'transition' : 'left 0.7s ease'
				});
				eleDepth.eq(2).css({
					'left' : 'calc(100vw - 76px)'
					, 'transition' : 'left 0.7s ease'
				});
			} else if(_thisIdx === 1) {
				eleDepth.eq(0).css({
					'left' : '19px'
					, 'transition' : 'left 0.7s ease'
				});
				eleDepth.eq(1).css({
					'left' : '76px'
					, 'transition' : 'left 0.7s ease'
				});
				eleDepth.eq(2).css({
					'left' : 'calc(100vw - 76px)'
					, 'transition' : 'left 0.7s ease'
				});
			} else if(_thisIdx === 2) {
				eleDepth.eq(0).css({
					'left' : '19px'
					, 'transition' : 'left 0.7s ease'
				});
				eleDepth.eq(1).css({
					'left' : '76px'
					, 'transition' : 'left 0.7s ease'
				});
				eleDepth.eq(2).css({
					'left' : '133px'
					, 'transition' : 'left 0.7s ease'
				});
			}

			selectedItem.removeClass('active').css({
				'width' : '0'
				, 'height' : 'calc(100vh - 100px - 90px)'
				, 'transition' : 'width 0.7s ease'
			});
			_conts.addClass('active').css({
				'width' : '100%'
				, 'height' : 'auto'
				, 'transition' : 'width 0.7s ease'
			});
			$('body, html').scrollTop(0);
			selectedItem = _conts;
		}

	});
}

/**********************************************************************************
## Tag Menu FUNCTION
**********************************************************************************/
var tagMenuFn = function() {console.log('Tag Menu function start');
	var contsWrap = $('.tagMenu');
	var btnTagMenu = $('> button', contsWrap);
	var pageWrap = $('> .mCustomScrollbar', contsWrap);

	btnTagMenu.click(function() {
		var _this = $(this);
		if(contsWrap.hasClass('active')) {
			contsWrap.removeClass('active');
		}else{
			contsWrap.addClass('active');
		}
	});
}

/**********************************************************************************
## TOP SEARCH BOX FUNCTION
**********************************************************************************/
var topSrchFn = function() {
	var searchWrap = $('#header .topSrchBox');
	var viewTxt = $('.placeholder', searchWrap);
	var inpt = $('input[type="text"]', searchWrap);
	
	inpt.focusin(function() {
		var _this = $(this);
		viewTxt.hide();
	}).focusout(function() {
		var _this = $(this);
		if(inpt.val() === '') {
			viewTxt.show();
		} else {
			viewTxt.hide();
		}
	});
}