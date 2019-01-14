/*模态框相关*/
var modal = {
    preModal: "", //当前\上一个开启的模态框的类名
    scrollWidth: "", //浏览器滚动条宽度
    scrollTop: 0, //开启模态框时页面滚动距离
    needCloseModal: "", //需要关闭的模态框类名
    closeIng: false, //是否正在关闭模态框
    delayTime: 300, //模态框关闭所需时间
    preVideo: "", //保存'video-data'中需要自动播放的video的Id
    open: function(className) {
        var that = this;
        var openDalyTime = 0;
        if (that.closeIng) {
            openDalyTime = that.delayTime;
        }
        setTimeout(function() {
            that.preModal = className;
            that.scrollWidth = window.innerWidth - document.body.clientWidth;
            that.scrollTop = that.getScrollTop();
            document.body.style.top = -that.scrollTop + "px";

            $(that.preModal).css("display", "block");
            $(that.needCloseModal).removeClass("modal-hide");
            $(that.preModal).addClass("modal-active");
            $("body").addClass("modal-open");
            $("body").css("padding-right", that.scrollWidth + "px");

            /*若模态框高度大于浏览器可视高度则采用固定margin-top形式显示模态框*/
            /*若模态框高度小于浏览器可视高度则采用fixed形式垂直居中显示*/
            var browserHeight = window.innerHeight;

            var height = $(that.preModal)
                .children(".modal-wrapper")
                .height();

            if (height > browserHeight) {
                $(that.preModal).css("overflow", "auto");
                $(that.preModal)
                    .children(".modal-wrapper")
                    .removeClass("modal-mar-type1");
                $(that.preModal)
                    .children(".modal-wrapper")
                    .addClass("modal-mar-type2");
            } else {
                $(that.preModal)
                    .children(".modal-wrapper")
                    .removeClass("modal-mar-type2");
                $(that.preModal)
                    .children(".modal-wrapper")
                    .addClass("modal-mar-type1");
                $(that.preModal)
                    .children(".modal-wrapper")
                    .css("margin-top", (browserHeight - height) / 2 + "px");
            }
        }, openDalyTime);
    },
    hide: function(className) {
        var that = this;
        that.needCloseModal = className;
        that.closeIng = true;

        $(that.needCloseModal).removeClass("modal-active");
        $(that.needCloseModal).addClass("modal-hide");

        setTimeout(function() {
            $(that.needCloseModal).css("display", "none");
            $("body").removeClass("modal-open");
            that.scrollTo(that.scrollTop);
            $(that.preModal).css("overflow", "");
            $("body").css("padding-right", "");
            that.closeIng = false;
        }, that.delayTime);

        /*if you need auto play video*/
        /*if(document.getElementById(that.preVideo) != null) {
            document.getElementById(that.preVideo).pause();
        }*/
    },
    scrollTo: function(num) {
        document.body.scrollTop = document.documentElement.scrollTop = num;
    },
    getScrollTop: function() {
        return (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
        );
    },
    init: function() {
        var that = this;
        $(".modal").css("display", "none");
        $(".modal-hide, .modal-hide .modal-wrapper").css(
            "animation-duration",
            that.delayTime + "ms"
        );
        $("[data='close'], .modal").on("click", function() {
            that.hide(that.preModal);
        });
        $(".modal").on("touchmove", function(e) {
            e.stopPropagation();
        });
        $(".modal").on("click", function(e) {
            e.stopPropagation();
        });
        $(".modal-wrapper").on("click", function(e) {
            e.stopPropagation();
        });
        $("[data-type='modal']").on("click", function() {
            var target = $(this).attr("data");

            /*if you need auto play video*/
            /*that.preVideo = $(this).attr('video-data');
            if(that.preVideo != null) {
                document.getElementById(that.preVideo).play();
            }*/

            that.open(target);
        });
    }
};

// 修复iOS光标错位以及微信页面不回弹问题
var iptBug = {
  focus: 0,
  blur: 1,
  init: function() {
    $("body").on("focus", "input", function() {
      iptBug.focus = 1;
      iptBug.blur = 0;
    });

    $("body").on("blur", "input", function() {
      iptBug.focus = 0;
      iptBug.blur = 1;
      setTimeout(function() {
        if (iptBug.focus == 1) {
          return false;
        } else {
          document.body.scrollTop = document.body.scrollTop;
        }
      }, 0);
      // 防止在两个input间切换时做过多操作
    });
  }
};

$(document).ready(function() {
  modal.init();
  iptBug.init();
});
