$(function(){
  // マウスを動かす
  $(window).mousemove(function(e){
    // カーソルが#thumbの中に収まっているかどうか
    if(e.pageX > $("#thumb").offset().left && e.pageX <= $("#thumb").offset().left + $("#thumb").width() && e.pageY >= $("#thumb").offset().top && e.pageY <= $("#thumb").offset().top + $("#thumb").height()){
      // 座標を取得
      var posX = e.pageX;
      var posY = e.pageY;

      // span要素が#thumb内に収まるよう調整（横位置）
			if(e.pageX <= $("#thumb").offset().left + 20){
				posX = $("#thumb").offset().left;
			}else if(e.pageX >= $("#thumb").offset().left + $("#thumb").width() - 20){
				posX = $("#thumb").offset().left + $("#thumb").width() - 40;
			}else{
				posX -= 20;
			}

      // span要素が#thumb内に収まるよう調整（縦位置）
			if(e.pageY <= $("#thumb").offset().top + 20){
				posY = $("#thumb").offset().top;
			}else if(e.pageY >= $("#thumb").offset().top + $("#thumb").height() - 20){
				posY = $("#thumb").offset().top + $("#thumb").height() - 40;
			}else{
				posY -= 20;
			}

      // span要素の位置を、カーソル座標に合わせる
      $("span").css({"top":posY, "left":posX});

      // 収まっている：span要素を表示
      $("span").show();

      // zoom.jpgの位置を調整
      $("#zoom img").css("top", ($("#thumb").offset().top - posY)*10);
      $("#zoom img").css("left", ($("#thumb").offset().left - posX)*10);

    }else{
      // 収まっていない：span要素を非表示
      $("span").hide();
    }
  });
});
