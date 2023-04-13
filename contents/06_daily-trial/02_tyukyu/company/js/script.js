
// スライダー swiper
const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


// wow.jsを使いますよの宣言
new WOW().init();

// ハンバーガーメニュー
$(function () {
  $('.hamburger_icon,.hamburger_background').click(function (e) {
    // e.preventDefault();
    $('.hamburger_icon').toggleClass('is-active');
    $('.hamburger_content').toggleClass('is-active');
    $('.hamburger_background').toggleClass('is-active');
    return false;
  });
  $('.hamburger_content__item > a').click(function () {
    $('.hamburger_icon').toggleClass('is-active');
    $('.hamburger_content').toggleClass('is-active');
    $('.hamburger_background').toggleClass('is-active');
  });
});

// スムーススクロール

$(function () {
  // #から始まるURLがクリックされた時
  $('a[href^="#"]').click(function () {
    // 移動速度を指定（ミリ秒）
    var speed = 900;
    // hrefで指定されたidを取得
    var href = $(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    var target = $(href == "#" || href == "" ? 'html' : href);
    //ヘッダーの高さを取得
    var header = $('header').height();
    //ヘッダーの高さを引く
    var position = target.offset().top - header;
    // ページのトップを基準にターゲットの位置を取得
    var position = target.offset().top;
    // ターゲットの位置までspeedの速度で移動
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

// TOPへ戻るボタン
$(function () {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 600) {
      $('.to_top').show();
    } else {
      $('.to_top').hide();
    }
  });

  $('.to_top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

});

// modal


// 閉じるときの挙動
$(function () {
  $('.js-is-close').click(function (e) {
    e.preventDefault();
    var target = $(this).data('target');
    $(target).hide();
  });
});
// 開く時の挙動
$(function () {
  $('.js-is-open').click(function (e) {
    e.preventDefault();
    var target = $(this).data('target');
    $(target).show();
  });
});
