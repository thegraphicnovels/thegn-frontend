import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Swiper from 'swiper';
import Masonry from 'masonry-layout';

jQueryBridget('masonry', Masonry, $);

// export const $ = (el)=>{
// 	var classNm;
// 		if(typeof(el) === 'string') {
// 			classNm = el;
// 		}else if(el.current instanceof HTMLElement) {
// 			classNm = '.' + el.current.className;
// 		}
// 		var targetEl= document.querySelectorAll(classNm);

// 		return targetEl;
// }


export const fullUrlFn = (url) => {// 파일 full URL경로
	let domain;
	if(window.location.href.indexOf('http://localhost:3000/') > -1) {
		 domain= 'http://localhost:3000/';
	}
	return domain+url;
}

// 상단 검색박스
export const topSrchFn = (target)=> {
	const searchWrap = $(target);
	const viewTxt = $('.placeholder', searchWrap);
	const inpt = $('input[type=text]', searchWrap);
	
	inpt.focusin(()=> {
		console.log('focus in');
		const _this = $(this);
		viewTxt.hide();
	}).focusout(()=> {
		console.log('focus out');
		const _this = $(this);
		if(inpt.val() === '') {
			viewTxt.show();
		} else {
			viewTxt.hide();
		}
	});
}

// Main swiper Function
export const swiperFn = target => {
	const mainWrap = $(target);
	const swiperLib = new Swiper(target, {
		loop: true,
		on: {
			init() {
				const wrapW = mainWrap.outerWidth();
				const eleItem = $('li', mainWrap);
				eleItem.css('width', wrapW);
				this.update();
			},
			//   resize(swiper) {
			//     this.update();
			//   },
			//   transitionEnd(swiper) {},
		},
		allowTouchMove: false,
		navigation: {
		prevEl: $('.btnPrev', mainWrap),
		nextEl: $('.btnNext', mainWrap),
		},
	});

	return {
		destroy: () => swiperLib.destroy(),
	};
};

// 메인 화면 메뉴 클릭
export const menuClick = (target, setAction, action) => {
	const buttons = $('> button', target.current);
	const pageWraps = $('.pageWrap', target.current);
	setAction(action);
	if (action === 1) {
		buttons.eq(0).css({
			left: '19px',
			transition: 'left 0.7s ease',
		});
		buttons.eq(1).css({
			left: 'calc(100vw - 133px)',
			transition: 'left 0.7s ease',
		});
		buttons.eq(2).css({
			left: 'calc(100vw - 76px)',
			transition: 'left 0.7s ease',
		});
	} else if (action === 2) {
		buttons.eq(0).css({
			left: '19px',
			transition: 'left 0.7s ease',
		});
		buttons.eq(1).css({
			left: '76px',
			transition: 'left 0.7s ease',
		});
		buttons.eq(2).css({
			left: 'calc(100vw - 76px)',
			transition: 'left 0.7s ease',
		});
	} else if (action === 3) {
		buttons.eq(0).css({
			left: '19px',
			transition: 'left 0.7s ease',
		});
		buttons.eq(1).css({
			left: '76px',
			transition: 'left 0.7s ease',
		});
		buttons.eq(2).css({
			left: '133px',
			transition: 'left 0.7s ease',
		});
	}

	pageWraps.removeClass('active').css({
		width: '0',
		height: 'calc(100vh - 100px - 90px)',
		transition: 'width 0.7s ease',
	});
	pageWraps.eq(action).addClass('active').css({
		width: '100%',
		height: 'auto',
		transition: 'width 0.7s ease',
	});
	$('body, html').scrollTop(0);
};

// Achive Tag Menu
export const tagMenuFn = target => {
	const _tagWrap = $(target.current);
	const _button = $('> button', _tagWrap);

	_button.click(() => {
		if (_tagWrap.hasClass('active')) {
		_tagWrap.removeClass('active');
		} else {
		_tagWrap.addClass('active');
		}
	});
};

// Achive list masonry
export const masonryFn = target => {
	// ()=>{} 는 new masonryFn()으로 사용하지 못함
	const _grid = $(target.current);
	const _pageWrap = _grid.parents('.pageWrap');
	const _tagMenu = $('.tagMenu', _pageWrap);
	const _masonryLib = new Masonry(`.${target.current.className}`, {
		itemSelector: '.grid-item',
		// columnWidth: '.grid-item',
		columnWidth: 200,
		// fitWidth: true,
		gutter: 30,
		reisze: false,
		percentPosition: true,
	});

	_pageWrap.bind('transitionend', () => {
		// 아카이브 아코디언 인터렉션 완료후 작업
		_masonryLib.layout(); // 아카이브 리스트 정렬 맞춤
		_tagMenu.css({
		// tag menu icon display
		width: 'auto',
		padding: '0 0 0 95px',
		'transition-property': 'width, padding',
		'transition-duration': '0.5s, 0.5s',
		'transition-timing-function': 'ease, ease',
		});
	});

	return {
		destroy() {
		_masonryLib.destroy();
		_pageWrap.unbind('transitionend');
		},
	};
};
