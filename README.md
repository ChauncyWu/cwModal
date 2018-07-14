# 模态框
前言：在写页面时经常会有点击一个按钮弹出一个模态框的需求，Bootstrap的模态框只有固定margin-top，故想自己写一个，在此整理下学习过程中的一些问题。

## 1. 根据模态框内容高度决定模态框是垂直居中显示还是固定margin-top居中显示
* 当模态框高度小于浏览器可视高度时，模态框垂直居中显示
* 当模态框高度大于浏览器可视高度时，采用固定margin-top、margin-bottom和左右auto居中显示

```
CSS

/*若模态框高度大于浏览器可视高度则采用固定margin-top形式显示模态框*/
.modal-mar {
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
}

/*若模态框高度小于浏览器可视高度则采用fixed形式垂直居中显示*/
.modal-fix {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -300px;/*根据模态框宽度/2设置*/
}
```

```
JS

// 浏览器可视高度
var browserHeight = window.innerHeight;
// 模态框高度
var height = $("." + id + "-modal").children(".modal-wrapper").height();

if(height > browserHeight) {
  $("." + id + "-modal").children(".modal-wrapper").removeClass('modal-fix');
  $("." + id + "-modal").children(".modal-wrapper").addClass('modal-mar');
} else {
  $("." + id + "-modal").children(".modal-wrapper").removeClass('modal-mar');
  $("." + id + "-modal").children(".modal-wrapper").addClass('modal-fix');
  $("." + id + "-modal").children(".modal-wrapper").css('margin-top', -height / 2);
  // 动态设置margin-top
}
```

## 2. 点击关闭按钮和点击遮罩层进而关闭模态框
* 问题：在设置点击遮罩层时，会出现点击模态框本身也会关闭的情况
* 解决：阻止事件冒泡

```
$('.modal').on('click', function() {
  $('.modal').addClass('modal-hide');
  $('.modal').removeClass('modal-active');
  setTimeout(function() {
    $('.modal').css('display', 'none');
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
  }, 300)
})

$('.modal-wrapper').on('click', function(e) {
  e.stopPropagation();
})
```

## 3. 模态框滚动与body滚动
* 问题：网页内容过多时会出现滚动条，此时弹出模态框，若模态框内容较少垂直居中显示，则滚动的是body的内容，若模态框内容较多，则滚动的还是body内容，且此时模态框内容被遮挡。
* 解决：在弹出模态框时，设置body的overflow-y: hidden，设置模态框的overflow-y: auto;

## 4. body宽度改变
* 问题：在overflow-y: hidden与auto切换时body宽度会改变，体验较差
* 解决：在overflow-y: hidden与auto切换时动态设置body的padding-left

```
scrollWidth = window.innerWidth - document.body.clientWidth;
$('body').css('padding-right', scrollWidth + 'px');
```

## 5. 渐隐渐现效果
* 问题：CSS3动画在display: none时是没有效果的，而以上的模态框是通过控制display进行显示的
* 解决：利用定时器，在设置display: none之前和display: block之后进行动画设置

## 6. 参考资料
* Bootstrap源码

