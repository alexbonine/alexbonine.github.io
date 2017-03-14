function menuItemDefaultClick (e) {
  var menuItemsDefault = document.getElementsByClassName('menu__item--default');
  for (var i = 0; i < menuItemsDefault.length; i++) {
    menuItemsDefault[i].className += ' menu__item--hide';
  }
  var menuItemClose = document.getElementsByClassName('menu__item--close')[0];
  menuItemClose.className = menuItemClose.className.replace(' menu__item--hide', '');

  var quickhop = document.getElementById(e.currentTarget.dataset.item);
  quickhop.className += ' quickhop--show';
}

function menuItemCloseClick (e) {
  var menuItemsDefault = document.getElementsByClassName('menu__item--default');
  for (var i = 0; i < menuItemsDefault.length; i++) {
    menuItemsDefault[i].className = menuItemsDefault[i].className.replace(' menu__item--hide', '');
  }
  var menuItemClose = document.getElementsByClassName('menu__item--close')[0];
  menuItemClose.className += ' menu__item--hide';

  var quickhop = document.getElementsByClassName('quickhop--show')[0];
  quickhop.className = quickhop.className.replace(' quickhop--show', '');
}

function headerScroll () {
  var scrolled = document.getElementsByClassName('scrolled');
  
  if (document.body.scrollTop > 40 && scrolled.length === 0) {
    var header = document.getElementsByTagName('header')[0];
    header.className += ' scrolled';
  } else if (document.body.scrollTop <= 40 && scrolled.length === 1) {
    var header = document.getElementsByTagName('header')[0];
    header.className = header.className.replace(' scrolled', '');
  }
}

function introScroll () {
  var introBlocks = document.getElementsByClassName('intro__block');
  var windowHeight = document.body.clientHeight;
  var thirdHeight = windowHeight / 3;
  var halfHeight = windowHeight / 2;
  var twoThirdHeight = thirdHeight * 2;

  if (document.body.scrollTop <= thirdHeight) {
    introBlocks[0].style.opacity = 1;
    introBlocks[1].style.opacity = 0;
  } else if (document.body.scrollTop > thirdHeight && document.body.scrollTop <= halfHeight) {
    var diff = halfHeight - thirdHeight;
    var scrollDiff = document.body.scrollTop - thirdHeight;
    introBlocks[0].style.opacity = 1 - scrollDiff / diff;
    introBlocks[1].style.opacity = 0;
  } else if (document.body.scrollTop > halfHeight && document.body.scrollTop <= twoThirdHeight) {
    var diff = twoThirdHeight - halfHeight;
    var scrollDiff = document.body.scrollTop - halfHeight;
    introBlocks[0].style.opacity = 0;
    introBlocks[1].style.opacity = scrollDiff / diff;
  } else if (document.body.scrollTop <= windowHeight * 2) {
    introBlocks[0].style.opacity = 0;
    introBlocks[1].style.opacity = 1;
  } else {
    introBlocks[0].style.opacity = 0;
    introBlocks[1].style.opacity = 0;
  }
}

function scrolling () {
  headerScroll();
  introScroll();
}

(function () {
  document.addEventListener('scroll', scrolling);

  // onClickListeners
  var menuItems = document.getElementsByClassName('menu__item__link');
  for (var i = 0; i < menuItems.length - 1; i++) {
    menuItems[i].addEventListener('click', menuItemDefaultClick);
  }
  menuItems[menuItems.length - 1].addEventListener('click', menuItemCloseClick);

  var workItems = document.getElementsByClassName('quickhop__work__link');
  for (var i = 0; i < workItems.length; i++) {
    workItems[i].addEventListener('click', menuItemCloseClick);
  }
})();