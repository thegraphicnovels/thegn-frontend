import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Swiper from 'swiper';
import Masonry from 'masonry-layout';
import { scratchImgSrc } from './scratchImgSrc';

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

// export const fullUrlFn = url => {
//	 // 파일 full URL경로
//	 let domain;
//	 if (window.location.href.indexOf('http://localhost:3000') > -1) {
// 	domain = 'http://localhost:3000/';
//	 } else if (window.location.href.indexOf('https://the-gn.com') > -1) {
// 	domain = 'https://the-gn.com/';
//	 }
//	 return domain + url;
// };
class RebrowserQueue {
  constructor() {
    this.queue = {};
  }

  addQueue(key, callback) {
    if (!this.queue[key]) this.queue[key] = callback;
  }

  removeQueue(key) {
    if (this.queue[key]) delete this.queue[key];
  }

  resizeFunc() {
    const queueKey = Object.keys(this.queue);
    // console.log(queueKey.length);
    if (queueKey.length < 1) return;
    for (let i = 0; i < queueKey.length; i++) {
      this.queue[queueKey[i]]();
    }
  }
}
const winResizeQueue = new RebrowserQueue();

window.addEventListener('resize', () => {
  winResizeQueue.resizeFunc();
});

export { winResizeQueue };

// input placeholder 기능
export const placeholderFn = (target) => {
  const searchWrap = $(target);
  const viewTxt = $('.placeholder', searchWrap);
  const inpt = $('input[type=text], input[type=password]', searchWrap);
  const inptLeng = inpt.val().length;

  if (inptLeng) {
    viewTxt.hide();
  }

  inpt
    .focusin(() => {
      //	 console.log('focus in');
      viewTxt.hide();
    })
    .focusout(() => {
      //	 console.log('focus out');
      if (inpt.val() === '') {
        viewTxt.show();
      } else {
        viewTxt.hide();
      }
    });
};

export const moGnbOpenFn = (target) => {
  const btnHamberg = $(target);

  $(window).resize(() => {
    const winW = $(window).width();

    if (winW > 1024 && $('.naviListWrap').hasClass('active')) {
      $('.naviListWrap').removeClass('active');
    }
    if (winW > 1024 && $('.scratchWrap').hasClass('active')) {
      $('.scratchWrap').removeClass('active');
    }
  });

  btnHamberg.click(() => {
    console.log($('.naviListWrap'));
    if ($('.naviListWrap').hasClass('active')) {
      $('.naviListWrap').removeClass('active');
    } else {
      $('.naviListWrap').addClass('active');
    }
    if ($('.scratchWrap').hasClass('active')) {
      $('.scratchWrap').removeClass('active');
    } else {
      $('.scratchWrap').addClass('active');
    }
  });

  return {
    destroy: () => {
      btnHamberg.unbind('click');
      $(window).unbind('resize');
    },
  };
};

// Main swiper Function
export const swiperFn = (target, options = {}) => {
  const mainWrap = $(target);
  const itemNum = $('li', mainWrap).length;
  let loopOpt = true;
  const autoPlay = options.autoPlay ? options.autoPlay : false;
  const indicateWrap = options.indicateWrap ? options.indicateWrap : false;

  if (itemNum <= 1) {
    loopOpt = false;
    $('.btnPrev', mainWrap).hide();
    $('.btnNext', mainWrap).hide();
  }

  if (indicateWrap) mainWrap.append(`<div class="${indicateWrap}"></div>`);

  const swiperLib = new Swiper(target, {
    loop: loopOpt,
    autoplay: autoPlay,
    on: {
      init() {
        const wrapW = mainWrap.outerWidth();
        const eleItem = $('li', mainWrap);
        eleItem.css('width', wrapW);
        this.update();

        if (indicateWrap) {
          $(`.${indicateWrap}`, mainWrap).html(
            `<span>${this.realIndex + 1}</span> / <span>${itemNum}</span>`,
          );
        }
      },
      resize() {
        this.update();
      },
      transitionStart() {
        if (indicateWrap) {
          $(`.${indicateWrap}`, mainWrap).html(
            `<span>${this.realIndex + 1}</span> / <span>${itemNum}</span>`,
          );
        }
      },
      transitionEnd() {},
    },
    // allowTouchMove: false,
    navigation: {
      prevEl: $('.btnPrev', mainWrap),
      nextEl: $('.btnNext', mainWrap),
    },
  });

  return {
    autoStart: () => swiperLib.autoplay.start(),
    autoStop: () => swiperLib.autoplay.stop(),
    destroy: () => swiperLib.destroy(),
  };
};

// 메인 화면 메뉴 클릭
export const menuClick = (target, setAction, action) => {
  const buttons = $('> button', target.current);
  const pageWraps = $('.pageWrap', target.current);
  const naviListWrap = $('.naviListWrap');
  const winW = $(window).width();
  setAction(action);
  buttons.removeClass('active');
  if (action === 1) {
    buttons
      .eq(0)
      .css({
        left: '35px',
        transition: 'left 0.7s ease',
      })
      .addClass('active');
    buttons.eq(1).css({
      left: 'calc(100vw - 185px)',
      transition: 'left 0.7s ease',
    });
    buttons.eq(2).css({
      left: 'calc(100vw - 130px)',
      transition: 'left 0.7s ease',
    });
  } else if (action === 2) {
    buttons.eq(0).css({
      left: '35px',
      transition: 'left 0.7s ease',
    });
    buttons
      .eq(1)
      .css({
        left: '90px',
        transition: 'left 0.7s ease',
      })
      .addClass('active');
    buttons.eq(2).css({
      left: 'calc(100vw - 130px)',
      transition: 'left 0.7s ease',
    });
  } else if (action === 3) {
    buttons.eq(0).css({
      left: '35px',
      transition: 'left 0.7s ease',
    });
    buttons.eq(1).css({
      left: '90px',
      transition: 'left 0.7s ease',
    });
    buttons
      .eq(2)
      .css({
        left: '145px',
        transition: 'left 0.7s ease',
      })
      .addClass('active');
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

  if (winW <= 1024) {
    naviListWrap.removeClass('active');
  }
  $('body, html').scrollTop(0);
};

// Achive Tag Menu
export const tagMenuFn = (target) => {
  const _tagWrap = $(target.current);
  const _button = $('> button', _tagWrap);
  const _scrollWrap = $('.swiperScrollBox', _tagWrap);
  const _tagPageWrap = _tagWrap.parents('.pageWrap');
  let _thisWinW = window.innerWidth;

  const initFn = () => {
    if (_thisWinW > 1024) {
      _tagWrap.css({
        // tag menu icon display
        width: 'auto',
        padding: '0 65px 0 145px',
        'transition-delay': '1s, 1s',
        'transition-property': 'width, padding',
        'transition-duration': '0.7s, 0.7s',
        'transition-timing-function': 'ease, ease',
      });
    } else if (_thisWinW > 550) {
      _tagWrap.css({
        // tag menu icon display
        width: '100%',
        padding: '60px 0 0',
        'transition-delay': '1s, 1s',
        'transition-property': 'width, padding',
        'transition-duration': '0.7s, 0.7s',
        'transition-timing-function': 'ease, ease',
      });
    } else {
      _tagWrap.css({
        // tag menu icon display
        width: '100%',
        padding: '30px 0 0',
        'transition-delay': '1s, 1s',
        'transition-property': 'width, padding',
        'transition-duration': '0.7s, 0.7s',
        'transition-timing-function': 'ease, ease',
      });
    }
  };

  const _swiperScrollLib = new Swiper(_scrollWrap, {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: $('.swiper-scrollbar', _tagWrap),
      draggable: true,
      hide: true,
    },
    on: {
      resize() {
        if (_scrollWrap.is(':visible')) {
          console.log('resize');
          this.update();
        }
      },
    },
    mousewheel: true,
  });

  _button.click(() => {
    // console.log(_tagWrap);
    if (_tagWrap.hasClass('active')) {
      _tagWrap.removeClass('active');
    } else {
      _tagWrap.addClass('active');
      _swiperScrollLib.update();
    }
  });

  const transitionEndFn = () => {
    if (_swiperScrollLib) _swiperScrollLib.update();
  };

  winResizeQueue.addQueue('tagMenu', () => {
    // console.log('reBrowser');
    _thisWinW = window.innerWidth;
    initFn();
  });

  _tagWrap.bind('transitionend', () => {
    transitionEndFn();
  });

  initFn();

  return {
    destroy: () => {
      _tagWrap.css({
        padding: '0',
        width: '0',
      });
      _tagPageWrap.unbind();
      _button.unbind();
      _swiperScrollLib.destroy();
      winResizeQueue.removeQueue('tagMenu');
    },
  };
};

// Achive list masonry
export const masonryFn = (target) => {
  // ()=>{} 는 new masonryFn()으로 사용하지 못함
  const _grid = $(target.current);
  const _pageWrap = _grid.parents('.pageWrap');

  const setSizeFnc = () => {
    $('.grid-item', _grid).each(function () {
      const _this = $(this);
      const gridW = $('img', _this).outerWidth();
      const gridH = $('img', _this).outerHeight();
      const gridRatio = gridH / gridW;
      let grideSize;

      if (window.innerWidth > 1024) {
        // 3단 정렬
        if (gridRatio <= 0.6) {
          // 가로 사이즈가 큰경우
          grideSize = '55%';
        } else if (gridRatio >= 1.4) {
          // 세로 사이즈가 큰경우
          grideSize = '25%';
        } else {
          // 대략 정비율일 경우
          grideSize = '33.3%';
        }
      } else if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        // 2단 정렬
        if (gridRatio < 0.6) {
          // 가로 사이즈가 큰경우
          grideSize = '100%';
          // 	grideSize = '55%';
        } else if (gridRatio >= 1.4) {
          // 세로 사이즈가 큰경우
          grideSize = '50%';
          // 	grideSize = '45%';
        } else {
          // 대략 정비율일 경우
          grideSize = '50%';
          // 	grideSize = '30%';
        }
      } else if (window.innerWidth <= 768) {
        // 모바일 1단 정렬
        grideSize = '100%';
      }
      console.log(grideSize);
      _this.css({ width: grideSize });
    });

    setTimeout(() => {
      _masonryLib.layout();
    }, 100);
  };

  const _masonryLib = new Masonry(`.${target.current.className}`, {
    itemSelector: '.grid-item',
    // columnWidth: '.grid-item',
    // columnWidth: 200,
    // fitWidth: true,
    // gutter: 30,
    // reisze: false,
    percentPosition: true,
  });

  _pageWrap.bind('transitionend', () => {
    _masonryLib.layout(); // 아카이브 리스트 정렬 맞춤
  });

  winResizeQueue.addQueue('archiveListResize', () => {
    console.log('archiveListResize');
    setSizeFnc();
    _masonryLib.layout();
  });

  setSizeFnc();

  return {
    destroy() {
      _masonryLib.destroy();
      _pageWrap.unbind('transitionend');
      winResizeQueue.removeQueue('archiveListResize');
    },
  };
};

// scratch
export const scratchFn = (target, complatePercent, scratchEndFn) => {
  let isDrawing;
  let lastPoint;
  const container = target;
  const canvas = container.querySelector('canvas');
  const image = new Image();
  const brush = new Image();
  let canvasWidth;
  let canvasHeight;
  let ctx;

  const setScratchFn = () => {
    canvasWidth = canvas.clientWidth;
    canvasHeight = canvas.clientHeight;
    ctx = canvas.getContext('2d');
    // base64 Workaround because Same-Origin-Policy
    image.src = scratchImgSrc;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      // Show the form when Image is loaded.
      container.querySelector('.ScratchCard__Result').style.visibility =
        'visible';
    };
    brush.src =
      'data:image/png;base64,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';
  };

  const distanceBetween = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
    );
  };

  const angleBetween = (point1, point2) => {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  };

  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  const getFilledInPixels = (stride) => {
    let std = stride;
    if (!stride || stride < 1) {
      std = 1;
    }

    const pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    // console.log(pixels);
    const pdata = pixels.data;
    const l = pdata.length;
    const total = l / std;
    let count = 0;

    // Iterate over all pixels
    for (let i = 0; i < l; i += std) {
      if (pdata[i] === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);
  };

  const getMouse = (e, cvs) => {
    let offsetX = 0;
    let offsetY = 0;

    const offsetWrap = cvs.offsetParent || cvs;

    offsetX += offsetWrap.offsetLeft;
    offsetY += offsetWrap.offsetTop;

    const mx = (e.pageX || e.touches[0].clientX) - offsetX;
    const my = (e.pageY || e.touches[0].clientY) - offsetY;

    return { x: mx, y: my };
  };

  const handlePercentage = (filledInPixels) => {
    const thisPixels = filledInPixels || 0;
    // console.log(`${filledInPixels	}%`);
    if (thisPixels > complatePercent) {
      // canvas.parentNode.removeChild(canvas);
      if (scratchEndFn) scratchEndFn();
    }
  };

  const handleMouseDown = (e) => {
    isDrawing = true;
    lastPoint = getMouse(e, canvas);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }

    e.preventDefault();

    const currentPoint = getMouse(e, canvas);
    const dist = distanceBetween(lastPoint, currentPoint);
    const angle = angleBetween(lastPoint, currentPoint);
    let x;
    let y;

    for (let i = 0; i < dist; i++) {
      x = lastPoint.x + Math.sin(angle) * i - 25 / 2;
      y = lastPoint.y + Math.cos(angle) * i - 25 / 2;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(brush, x, y, brush.width / 3, brush.height / 2);
    }
    lastPoint = currentPoint;
    // console.log(getFilledInPixels(32));
    handlePercentage(getFilledInPixels(32));
  };

  const handleMouseUp = (e) => {
    isDrawing = false;
  };

  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('touchstart', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('touchmove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
  canvas.addEventListener('touchend', handleMouseUp, false);

  setScratchFn();
};

// Admin Menu Function
export const AdminMenuFn = (target) => {
  const admMenu = $('.icoAdm', target);
  const admList = $('.admList', target);

  admMenu.click((e) => {
    e.stopPropagation();
    admList.show();
    $(document).one('click', function () {
      // console.log('admin menu close - one click');
      admList.hide();
    });
  });
};

// footer
export const footOpenFn = (target) => {
  const footEl = $(target);
  const fInfo = $('.fInfo', footEl);
  const scratchWrap = $('.scratchWrap');

  $('.fInfoBtn button', footEl).click(() => {
    if (fInfo.is(':visible')) {
      footEl.removeClass('open');
      scratchWrap.removeClass('hide');
    } else {
      footEl.addClass('open');
      scratchWrap.addClass('hide');
    }
  });

  return {
    destroy: () => {
      $('.fInfoBtn button', footEl).unbind('click');
    },
  };
};

export const formatDate = (updateAt) => {
  const date = new Date(Number(updateAt));
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

// srchBoxFn 기능
export const srchBoxFn = (target) => {
  const searchWrap = $(target);
  const viewTxt = $('.placeholder', searchWrap);
  const inpt = $('input[type=text], input[type=password]', searchWrap);
  const inptLeng = inpt.val().length;

  console.log('viewTxt = ', viewTxt);
  if (inptLeng) {
    viewTxt.hide();
  }

  inpt
    .focusin(() => {
      console.log('focus in');
      viewTxt.hide();
      searchWrap.addClass('active');
    })
    .focusout(() => {
      console.log('focus out');
      if (inpt.val() === '') {
        viewTxt.show();
      } else {
        viewTxt.hide();
      }
      searchWrap.removeClass('active');
    });
};
