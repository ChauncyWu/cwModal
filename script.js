var scrollWidth = '';

$(document).ready(function() {
  $('.modal').css('display', 'none');
  scrollWidth = window.innerWidth - document.body.clientWidth;
})

$("[data-type='modal']").on('click', function() {
  var id = $(this).attr('data');
  $("." + id + "-modal").css('display', 'block');
  setTimeout(function() {
    $('.modal').addClass('modal-hide');
    $("." + id + "-modal").removeClass('modal-hide');
    $("." + id + "-modal").addClass('modal-active');
    $('body').addClass('modal-open');
    $('body').css('padding-right', scrollWidth + 'px');

    /*若模态框高度大于浏览器可视高度则采用固定margin-top形式显示模态框*/
    /*若模态框高度小于浏览器可视高度则采用fixed形式垂直居中显示*/
    var browserHeight = window.innerHeight;
    var height = $("." + id + "-modal").children(".modal-wrapper").height();
    if(height > browserHeight) {
      $("." + id + "-modal").children(".modal-wrapper").removeClass('modal-fix');
      $("." + id + "-modal").children(".modal-wrapper").addClass('modal-mar');
    } else {
      $("." + id + "-modal").children(".modal-wrapper").removeClass('modal-mar');
      $("." + id + "-modal").children(".modal-wrapper").addClass('modal-fix');
      $("." + id + "-modal").children(".modal-wrapper").css('margin-top', -height / 2);
    }
  }, 100);
})

$('.modal').on('click', function() {
  $('.modal').addClass('modal-hide');
  $('.modal').removeClass('modal-active');
  setTimeout(function() {
    $('.modal').css('display', 'none');
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
  }, 300)
})

$('.close-modal').on('click', function() {
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