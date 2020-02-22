/**
 * 需要引入jquery 使用选择器
 * @param left_html_id
 * @param line_html_id
 * @param sidebar_html_id
 */
function initMouseDragForDept(left_html_id, line_html_id, sidebar_html_id) {
  let $sliderMoving = false;
  let oLeft = document.getElementById("#" + left_html_id);
  let oLine = document.getElementById("#" + line_html_id);
  let oslider = document.getElementById("#" + sidebar_html_id);
  let  oline_width_half = oLine.offsetWidth / 2;
// 初始化拖动条的位置
  oLine.css({
    left: oLeft.offset().left + oLeft.outerWidth(),
    top: oLeft.offset().top
  });
  oLine.mousedown(function (e) {
    $sliderMoving = true;
    //鼠标捕获
    oLine.setCapture && oLine.setCapture();
    //阻止默认事件
    e.preventDefault();
  }).hover(function () {
    oLine.css({'background': "#ccc"});
  }, function () {
    if (!$sliderMoving) {
      oLine.css("background", "transparent")
    }
  });
  $(document).mousemove(function (e) {
    if ($sliderMoving) {
      let pageX = e.pageX;
      if (pageX >= 423 && pageX <= 801) {
        let lWidth = pageX - oLeft.offset().left;
        oLeft.css("width", lWidth + "px");
        oLine.css({left: pageX});
        //其他操作
      }
    }
    e.preventDefault();
  }).mouseup(function (e) {
    if ($sliderMoving) {
      $sliderMoving = false;
      oLine.css("background", "transparent");
      //鼠标释放
      oLine.releaseCapture && oLine.releaseCapture();
    }
  });
}