function quickhopOpenClick (e) {
  var menuItemsDefault = document.getElementsByClassName('menu__item--default');
  for (var i = 0; i < menuItemsDefault.length; i++) {
    menuItemsDefault[i].classList.add('menu__item--hide');
  }
  var menuItemClose = document.getElementsByClassName('menu__item--close')[0];
  menuItemClose.classList.remove('menu__item--hide')

  var quickhop = document.getElementById(e.currentTarget.dataset.item);
  quickhop.classList.add('quickhop--show');
  quickhop.children[0].scrollTop = 0;

  var body = document.getElementsByTagName('body')[0];
  body.classList.add('noscroll');
}

function quickhopCloseClick (e) {
  var menuItemsDefault = document.getElementsByClassName('menu__item--default');
  for (var i = 0; i < menuItemsDefault.length; i++) {
    menuItemsDefault[i].classList.remove('menu__item--hide');
  }
  var menuItemClose = document.getElementsByClassName('menu__item--close')[0];
  menuItemClose.classList.add('menu__item--hide');

  var quickhop = document.getElementsByClassName('quickhop--show')[0];
  quickhop.classList.remove('quickhop--show');

  var body = document.getElementsByTagName('body')[0];
  body.classList.remove('noscroll');
}

function zoomableClick (e) {
  if (e.currentTarget.tagName === 'IMG' && e.currentTarget.dataset.action === 'zoom') {
    ga('send', 'event', 'Img Click', e.currentTarget.dataset.section, e.currentTarget.src);
  } else if (e.currentTarget.tagName === 'DIV' && e.currentTarget.dataset.action === 'zoom') {
    ga('send', 'event', 'Div Click', e.currentTarget.dataset.section, e.currentTarget.dataset.id);
  }
}

function headerScroll () {
  var scrolled = document.getElementsByClassName('scrolled');
  var belowThreshold = window.pageYOffset <= 40;
  
  if (!belowThreshold && scrolled.length === 0) {
    var header = document.getElementsByTagName('header')[0];
    header.classList.add('scrolled');
  } else if (belowThreshold && scrolled.length === 1) {
    var header = document.getElementsByTagName('header')[0];
    header.classList.remove('scrolled');
  }
}

function introScroll () {
  var introBlocks = document.getElementsByClassName('intro__block');
  var windowHeight = document.body.clientHeight;
  var thirdHeight = windowHeight / 3;
  var halfHeight = windowHeight / 2;
  var twoThirdHeight = thirdHeight * 2;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (scrollTop <= thirdHeight) {
    introBlocks[0].style.opacity = 1;
    introBlocks[0].style.visibility = 'visible';
    introBlocks[1].style.opacity = 0;
    introBlocks[1].style.visibility = 'hidden';
  } else if (scrollTop > thirdHeight && scrollTop <= halfHeight) {
    var diff = halfHeight - thirdHeight;
    var scrollDiff = scrollTop - thirdHeight;
    introBlocks[0].style.opacity = 1 - scrollDiff / diff;
    introBlocks[0].style.visibility = 'visible';
    introBlocks[1].style.opacity = 0;
    introBlocks[1].style.visibility = 'hidden';
  } else if (scrollTop > halfHeight && scrollTop <= twoThirdHeight) {
    var diff = twoThirdHeight - halfHeight;
    var scrollDiff = scrollTop - halfHeight;
    introBlocks[0].style.opacity = 0;
    introBlocks[0].style.visibility = 'hidden';
    introBlocks[1].style.opacity = scrollDiff / diff;
    introBlocks[1].style.visibility = 'visible';
  } else if (scrollTop <= windowHeight * 2) {
    introBlocks[0].style.opacity = 0;
    introBlocks[0].style.visibility = 'hidden';
    introBlocks[1].style.opacity = 1;
    introBlocks[1].style.visibility = 'visible';
  } else {
    introBlocks[0].style.opacity = 0;
    introBlocks[0].style.visibility = 'hidden';
    introBlocks[1].style.opacity = 0;
    introBlocks[1].style.visibility = 'hidden';
  }
}

function scrolling () {
  headerScroll();
  introScroll();
}

(function () {
  document.addEventListener('scroll', scrolling);

  // onClickListeners
  var menuItems = document.getElementsByClassName('quickhop__link');
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', quickhopOpenClick);
  }

  var closeButton = document.querySelector('[data-item="close"]');
  if (closeButton) {
    closeButton.addEventListener('click', quickhopCloseClick);
  }

  var workItems = document.getElementsByClassName('quickhop__work__link');
  for (var i = 0; i < workItems.length; i++) {
    workItems[i].addEventListener('click', quickhopCloseClick);
  }

  var zoomables = document.querySelectorAll('[data-action]');
  for (var i = 0; i < zoomables.length; i++) {
    zoomables[i].addEventListener('click', zoomableClick);
  }
})();