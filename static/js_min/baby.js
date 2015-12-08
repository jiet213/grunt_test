/*************************************************
 *  Function  muyin
 *  Model www
 *  Copyright frontEnd http://www.feiniu.com/
 *  Designed and built by frontEnd  @japin.pan
 *  Address chenjian163com@163.com
 *  Date 2015/07/08
 *  Update 2015/07/22

 ************************************************/
;
(function(window, document, body, $, undefined) {

    var opt = {

        J_animateSlider: ".J_animateSlider",
        J_pictureArea: ".J_pictureArea",
        J_controlArea: ".J_controlArea",
        J_rightArea: ".J_rightArea",
        J_leftArea: ".J_leftArea",
        J_btnArea: ".J_btnArea",

        arrowstatus: "data-arrow", //箭头状态0 1 2 3；  0为不显示 1,3滑动动画显示（位置不一样） 2初始显示
        animatestatus: "data-animate",//point是否动画状态0 1； 0为没有动画 1有动画
        autostatus: "data-auto",//是否自动轮播状态0 1； 0手动控制 1手动自动均可控制
        controlposition: "data-position",//point左中右状态0 1 2 3; 0为不显示 1为居左 2为居中 3为居右
        sliderstatus: "data-slider",

        ul_child: " ul",
        li_child: " li",

        bgcolor: "#bgcolor",
        bgcolorvalue: "data-bgcolor"

    };

    var animateSlider = {

        init: function() {
            this.func();
        },

        func: function() {

            var J_animateSlider = opt.J_animateSlider,
                J_pictureArea = opt.J_pictureArea,
                J_controlArea = opt.J_controlArea,
                J_rightArea = opt.J_rightArea,
                J_leftArea = opt.J_leftArea,
                J_btnArea = opt.J_btnArea,

                arrowstatus = opt.arrowstatus,
                animatestatus = opt.animatestatus,
                autostatus = opt.autostatus,
                controlposition = opt.controlposition,
                sliderstatus = opt.sliderstatus,

                ul_child = opt.ul_child,
                li_child = opt.li_child,

                bgcolor = opt.bgcolor,
                bgcolorvalue = opt.bgcolorvalue;

            $(J_animateSlider).each(function() {

                var self = $(this),
                    self_picture = self.find(J_pictureArea),
                    self_control = self.find(J_controlArea),

                    self_arrowstatus = parseInt($.trim(self.attr(arrowstatus))),
                    self_animatestatus = parseInt($.trim(self.attr(animatestatus))),
                    self_autostatus = parseInt($.trim(self.attr(autostatus))),
                    self_controlposition = parseInt($.trim(self.attr(controlposition))),
                    self_sliderstatus = parseInt($.trim(self.attr(sliderstatus))),

                    self_picture_width = self_picture.outerWidth(true),
                    self_ul = self_picture.find(ul_child),
                    self_li = self_picture.find(li_child),
                    self_lilen = self_li.length,
                    self_lifirst = self_li.first(),
                    self_lilast = self_li.last();

                if (self_control.length) {
                    var self_control_ul = self_control.find(ul_child),
                        self_control_li = self_control.find(li_child),
                        self_control_li_width = self_control_li.outerWidth(true);
                }

                if (self_autostatus == 0 && self_animatestatus != 0) {

                    self.attr(animatestatus, 0);

                    self_animatestatus = parseInt($.trim(self.attr(animatestatus)));

                }

                if (!!self_arrowstatus) {
                    var self_right = self.find(J_rightArea),
                        self_left = self.find(J_leftArea),
                        self_btn = self.find(J_btnArea),
                        self_btn_width = self_btn.outerWidth(true);
                }

                if (self_li.attr(bgcolorvalue)) {

                    $(bgcolor).css("background",self_li.eq(0).attr(bgcolorvalue));

                }

                //判断是否为IE7浏览器 是隐藏point
                if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {

                    self_control.hide();

                }

                var timer = null, setTimer = null, flag = false;

                if (!self_sliderstatus) {

                    self_lifirst.before(self_lilast.clone());

                    self_ul.css({

                        'width': self_picture_width * (self_lilen + 1) + 'px',

                        'left': -self_picture_width + 'px'

                    });

                }

                self_li.eq(0).find("img[data-src]").each(function(key, item) {

                    $(item).attr("src", $(item).attr("data-src"));

                });

                if (self_control.length) {

                    var control_total_width = self_control_li_width * self_lilen,
                        control_position = 5;

                }

                switch (self_controlposition) {

                    case 0:

                        self_control.hide();

                        break;

                    case 1:

                        control_position = 5;

                        break;

                    case 3:

                        control_position = self_picture_width - control_total_width - 5;

                        break;

                    default:

                        control_position = (self_picture_width - control_total_width) / 2;

                }

                if (self_control.length) {

                    self_control_ul.css({

                        'width': control_total_width + "px",

                        'paddingLeft': control_position + "px"

                    }).show();

                }

                if (self_arrowstatus == 1|| self_arrowstatus == 3) {

                    self_btn.eq(1).css({

                        'left': -self_btn_width + 'px',

                        'opacity': 0

                    }).prev().css({

                        'right': -self_btn_width + 'px',

                        'opacity': 0

                    });

                } else if (self_arrowstatus == 2) {

                    self_btn.css({

                        'opacity': 0.25

                    }).show();

                }

                //鼠标滑到轮播区域
                self.on({

                    mouseenter: function() {

                        var that = $(this),
                            thatChild = that.children(J_btnArea);

                        if (self_lilen > 1) {

                            if (!!self_arrowstatus) {

                                thatChild.show();

                            }

                        } else {

                            thatChild.hide();
                            fnBtnStop();

                        }

                        if (self_arrowstatus == 1) {

                            thatChild.eq(1).stop(true, true).animate({

                                'left': 10 + 'px',

                                'opacity': 0.25

                            }).prev().stop(true, true).animate({

                                'right': 10 + 'px',

                                'opacity': 0.25

                            });

                        } else if (self_arrowstatus == 2) {

                            thatChild.css({

                                'opacity': 0.25

                            });

                        }else if (self_arrowstatus == 3) {

                            thatChild.eq(1).stop(true, true).animate({

                                'left': 0 + 'px',

                                'opacity': 0.25

                            }).prev().stop(true, true).animate({

                                'right': 0 + 'px',

                                'opacity': 0.25

                            });

                        }

                        clearInterval(timer);

                        fnStop();

                        flag = true;

                    },

                    mouseleave: function() {

                        var that = $(this),
                            thatChild = that.children(J_btnArea);

                        if (self_arrowstatus == 1||self_arrowstatus == 3) {

                            thatChild.eq(1).stop(true, true).animate({

                                left: -self_btn_width + 'px',

                                opacity: 0

                            }).prev().stop(true, true).animate({

                                right: -self_btn_width + 'px',

                                opacity: 0

                            });

                        } else if (self_arrowstatus == 2) {

                            thatChild.css({

                                'opacity': 0.25

                            });

                        }

                        if (!!self_autostatus) {

                            clearInterval(timer);

                            timer = setInterval(function() {

                                fnImgCont(fnIndex(), true);

                            }, 3000);

                        }

                        fnStopGo();

                        flag = false;

                    }

                });

                //鼠标划过单击左右按钮效果
                if (!!self_arrowstatus) {

                    self.on({

                        mouseenter: function() {

                            $(this).css('opacity', '0.5');

                        },

                        mouseleave: function() {

                            $(this).css('opacity', '0.25');

                        },

                        click: function() {

                            var fn_index = fnIndex();

                            if (self_ul.is(":animated")) {

                                return;

                            }

                            if ($(this).hasClass("J_leftArea")) {

                                if (self_li.attr(bgcolorvalue)) {

                                    if (fn_index > 0) {

                                        $(bgcolor).css("background",self_li.eq(fn_index-1).attr(bgcolorvalue));

                                    } else {

                                        if (fn_index == 0) {

                                            $(bgcolor).css("background",self_li.eq(-1).attr(bgcolorvalue));

                                        }

                                    }

                                }

                                if (!self_sliderstatus) {

                                    self_ul.animate({

                                        left: "+=" + self_picture_width + "px"

                                    }, 360, function() {

                                        if (fn_index > 0) {

                                            if (self_control.length) {

                                                self_control_li.eq(fn_index - 1).addClass("cur").siblings().removeClass("cur");

                                            }

                                        } else {

                                            if (fn_index == 0) {

                                                self_ul.css("left", "-" + self_picture_width * self_lilen + "px");

                                                if (self_control.length) {

                                                    self_control_li.eq(-1).addClass("cur").siblings().removeClass("cur");

                                                }

                                            }

                                        }

                                        fnBtnStop();

                                    })

                                } else {

                                    if (fn_index > 0) {

                                        self_li.eq(fn_index - 1).stop(true,true).fadeIn(360).siblings().hide();

                                        if (self_control.length) {

                                            self_control_li.eq(fn_index - 1).addClass("cur").siblings().removeClass("cur");

                                        }

                                    } else {

                                        if (fn_index == 0) {

                                            self_li.eq(self_lilen - 1).stop(true,true).fadeIn(360).siblings().hide();

                                            if (self_control.length) {

                                                self_control_li.eq(self_lilen - 1).addClass("cur").siblings().removeClass("cur");

                                            }

                                        }

                                    }

                                    fnBtnStop();

                                }

                            } else {

                                fnImgCont(fn_index);

                            }

                            return false;

                        }

                    }, J_btnArea);

                }

                //自动轮播
                if (!!self_autostatus) {

                    timer = setInterval(function() {

                        fnImgCont(fnIndex(), true);

                    }, 3000);

                }

                if (self_lilen > 1) {

                    fnAutoGo();

                } else {

                    fnStop();
                    fnBtnStop();

                }

                //鼠标滑过焦点
                self.on({

                    mouseenter: function() {

                        var ts = this;

                        if (self_control.length) {

                            var fn_index = self_control_li.index(ts);

                        }

                        setTimer = setTimeout(function() {

                            $(ts).addClass("cur").siblings().removeClass("cur");

                            if (!self_sliderstatus) {

                                self_ul.stop(true,true).animate({

                                    left: "-" + (fn_index + 1) * self_picture_width + "px"

                                }, 360);

                            } else {

                                self_li.eq(fn_index).stop(true,true).fadeIn(360).siblings().hide();

                            }

                            fnBtnStop();

                            if (self_li.attr(bgcolorvalue)) {

                                $(bgcolor).css("background",self_li.eq(fn_index).attr(bgcolorvalue));

                            }

                        }, 100);

                    },

                    mouseleave: function() {

                        if (setTimer) {

                            clearTimeout(setTimer);

                        }

                    }

                }, J_controlArea + li_child);

                //自动轮播时调用
                function fnAutoGo() {

                    if (self_control.length) {

                        var self_control_ul_li_cur = self_control_ul.find("li.cur");

                        self_control_ul_li_cur.siblings().find("span").css("width", 0);

                        if (!!self_animatestatus) {

                            self_control_ul_li_cur.find("span").width(0).animate({

                                width: "100%"

                            }, 2640, function() {

                                $(this).width(0);

                            });

                        } else {

                            self_control_ul_li_cur.find("span").width("100%");

                        }

                    }

                }

                //单击左右按钮时和滑到焦点时调用
                function fnBtnStop() {

                    if (self_control.length) {

                        var self_control_ul_li_cur = self_control_ul.find("li.cur");

                        self_control_ul_li_cur.siblings().find("span").stop().css("width", 0);

                        self_control_ul_li_cur.find("span").stop().width("100%");

                    }

                }

                //鼠标滑到轮播区域停止
                function fnStop() {

                    if (self_control.length) {

                        var self_control_ul_li_cur = self_control_ul.find("li.cur");

                        self_control_ul_li_cur.siblings().find("span").stop().css("width", 0);

                        self_control_ul_li_cur.find("span").stop();

                    }

                }

                //鼠标滑到区域停止滑出继续
                function fnStopGo() {

                    if (self_control.length) {

                        var self_control_ul_li_cur = self_control_ul.find("li.cur");

                        var self_control_ul_li_cur_width = self_control_ul_li_cur.find("span").width();

                        self_control_ul_li_cur.siblings().find("span").css("width", 0);

                        if (!!self_animatestatus) {

                            if (self_control_ul_li_cur_width != self_control_ul_li_cur.width()) {

                                self_control_ul_li_cur.find("span").animate({

                                    width: "100%"

                                }, 2640, function() {

                                    $(this).width(0);

                                });

                            }

                        } else {

                            self_control_ul_li_cur.find("span").width("100%");

                        }

                    }

                }

                //索引函数
                function fnIndex() {

                    if (self_control.length) {

                        return self_control_ul.find("li.cur").index();

                    }

                }

                //轮播内容的切换判断
                function fnImgCont(curIndex, curFlag) {

                    if (curIndex == self_lilen - 1) {

                        if (!self_sliderstatus) {

                            self_lifirst.addClass("cur").css("left", self_picture_width * self_lilen  + "px");

                        } else {

                            self_li.eq(0).addClass("cur").stop(true,true).fadeIn(360).siblings().hide();

                        }

                    }

                    if (self_lilen > 1) {

                        if (self_li.attr(bgcolorvalue)) {

                            $(bgcolor).css("background",self_li.eq(curIndex + 1).attr(bgcolorvalue));

                        }

                        if (curIndex == self_lilen - 1) {

                            if (!self_sliderstatus) {

                                self_ul.css("left", 0);

                            } else {

                                self_li.eq(0).addClass("cur").stop(true,true).fadeIn(360).siblings().hide();

                            }

                            if (self_control.length) {

                                self_control_li.eq(0).addClass("cur").siblings().removeClass("cur");

                            }

                            if (self_li.attr(bgcolorvalue)) {

                                $(bgcolor).css("background",self_li.eq(0).attr(bgcolorvalue));

                            }

                        }

                        if (!self_sliderstatus) {

                            self_ul.stop(true, true).animate({

                                left: "-=" + self_picture_width + "px"

                            }, 360, function() {

                                if (curIndex < self_lilen - 1) {

                                    if (self_control.length) {

                                        self_control_li.eq(curIndex + 1).addClass("cur").siblings().removeClass("cur");

                                    }

                                } else {

                                    self_lifirst.removeClass("cur").css("left", -self_picture_width + "px");

                                }

                                if (curFlag && !flag) {

                                    fnAutoGo();

                                } else {

                                    fnBtnStop();

                                }

                            })

                        } else {

                            if (curIndex < self_lilen - 1) {

                                self_li.eq(curIndex + 1).stop(true,true).fadeIn(360).siblings().hide();

                                if (self_control.length) {

                                    self_control_li.eq(curIndex + 1).addClass("cur").siblings().removeClass("cur");

                                }

                            } else {

                                self_li.eq(0).removeClass("cur").stop(true,true).fadeIn(360).siblings().hide();

                            }

                            if (curFlag && !flag) {

                                fnAutoGo();

                            } else {

                                fnBtnStop();

                            }

                        }

                    }

                }

            });

        }

    };

    window.animateSlider = animateSlider;

    window.animateSlider.init();

})(window, window.document, window.document.body, jQuery);

//dom加载完遍历赋值轮播图片src
$(function() {

    $(".J_pictureArea").each(function() {

        var self = $(this);

        self.find("li img[data-src]").each(function(key,item) {

            $(item).attr("src", $(item).attr("data-src")).removeAttr("data-src");

        });

    });

});;/*************************************************
 *  Function  mumbaby
 *  Copyright frontEnd http://www.feiniu.com/
 *  Designed and built by frontEnd  @jie.tang
 *  Date 2015/07/15
 ************************************************/
;
(function(window) {

    //图片延迟加载功能
    $("img.fn_img_lazy").lazyload({
        placeholder: "",
        threshold: 200,
        effect: "fadeIn",
        skip_invisible: false
    });

    var m_b_obj = {


        init: function() {

            //绑定所有事件
            this.navTabList();

            this.babyGrow();

            this.calDate();

            this.brandCateList();

            this.babyGift();

            //click触发tab事件
            this.tabFunc({

                main: ".J-tab-c",

                eventtype: "click"
            });

            this.tabFunc();

        },

        /*菜单导航栏*/
        navTabList: function() {

            $(".J-nav-tab").on({

                mouseenter: function() {

                    var self = $(this),

                        index = self.index();

                    self.addClass("z-hd").siblings().removeClass("z-hd");

                    $(".J-nav-list").removeClass('hide')

                    .children().eq(index).removeClass('hide').siblings().addClass('hide');

                    $(".J-nav-list").on({

                        mouseenter: function() {

                            $(this).removeClass('hide');

                        },

                        mouseleave: function() {

                            $(this).parent().addClass('hide');

                            self.removeClass("z-hd");

                        }

                    }, 'div');

                }

            }, 'li');

            $('.J-nav-tab').parent().on('mouseleave', function() {

                $(".J-nav-tab li").removeClass("z-hd");

                $(".J-nav-list").addClass('hide');

            });

        },

        /*宝宝成长之路*/
        babyGrow: function() {

            var J_gr_pic = $(".J-gr-pic"),

                J_gr_tt = $(".J-gr-tt"),

                J_tab_content = $(".J-gr-pro"),

                J_pic_a = J_gr_pic.find('a');

            J_gr_pic.children('li').eq(0).css("margin-top", "-39px");

            J_pic_a.on({
                mouseover: function() {
                    var $this = $(this);
                    if ($this.parent().css("margin-top") == "-39px") {
                        $this.data("status", "1");
                    } else {
                        $this.parent().stop(true, true).animate({
                            "margin-top": "-39px"
                        }, 300);

                        $this.data("status", "0");
                    }
                },
                mouseout: function() {
                    var $this = $(this);
                    if ($this.data("status") == "0") {

                        $this.parent().stop(true, true).animate({
                            "margin-top": "0"
                        }, 300);

                    }
                },
                click: function() {
                    var $this = $(this),
                        index = $this.parent().index();
                    $this.data("status", "1");
                    $this.parent().siblings().children("a").data("status", "0");

                    $this.parent().stop(true, true).animate({
                        "margin-top": "-39px"
                    }, 300).siblings().stop(true, true).animate({
                        "margin-top": "0"
                    }, 300);

                    J_gr_tt.children("li").eq(index).addClass("z-select").siblings().removeClass("z-select");

                    J_tab_content.children(".J-panel").eq(index).removeClass("hide").siblings('.J-panel').addClass('hide');
                }
            });

            J_gr_tt.on('click', "li", function() {

                var self = $(this),

                    index = self.index();

                self.addClass('z-select').siblings('li').removeClass('z-select');

                J_gr_pic.children('li').eq(index).stop(true, true).animate({
                    "margin-top": "-39px"
                }, 300).siblings('li').stop(true, true).animate({
                    "margin-top": "0"
                }, 300);

                J_gr_pic.children('li').eq(index).children('a').data("status", "1");
                J_gr_pic.children('li').eq(index).siblings().children("a").data("status", "0");
                J_tab_content.children(".J-panel").eq(index).removeClass("hide").siblings('.J-panel').addClass('hide');

            });

        },

        /*日期选择*/
        calDate: function() {

            $(document).on('click', '.J-cal', function(event) {
                WdatePicker({
                    readOnly: true
                });
            });

            /*宝宝生日选择，只能选择今天之前的
            $(document).on('click', '.J-hbb .J-cal', function(event) {
                WdatePicker({
                    readOnly: true,
                    maxDate: '%y-%M-%d'
                });
            });*/

            /*待产宝宝日期选择，只能选择今天之后
            $(document).on('click', '.J-dbb .J-cal', function(event) {
                WdatePicker({
                    readOnly: true,
                    minDate: '%y-%M-%d'
                });
            });*/
        },

        /*品牌墙效果*/
        brandCateList: function() {

            var b_cate = $(".J-b-cate"),
                b_list = $(".J-b-list"),
                b_a_Li = $(".J-b-cate li"),
                b_c_Li = $(".J-b-list li"),
                animateLine = $(".J-b-cate .animate_line"),
                brandFold = $("a.brand_fold"),
                brandUnfold = $("a.brand_unfold"),
                brand_cont_child = $(".J-b-list").children("div").eq(0),
                liAFirst = b_a_Li.eq(0).children("a").outerWidth(),
                labelW = b_a_Li.parent().prev().outerWidth();

            /*品牌墙鼠标划过显示阴影*/
            b_list.on({

                mouseenter: function() {

                    $(this).children('.brandSale').show();
                },

                mouseleave: function() {

                    $(this).children('.brandSale').hide();
                }
            }, 'li');

            /*cate列表最后一个无右边框*/
            b_cate.find('li:last').addClass("z-no-br");

            animateLine.css({
                "width": liAFirst + "px",
                "left": labelW + "px"
            });

            b_li_auto(brand_cont_child);

            b_cate.on('mouseover', 'li', function() {

                var self = $(this),
                    index = self.index(),
                    this_A_W = self.children("a").outerWidth(),
                    this_B_W = 0;

                if (index != 0) {

                    for (var i = 0; i < index; i++) {
                        this_B_W += b_a_Li.eq(i).children('a').outerWidth();
                    }
                };

                animateLine.css({

                    "width": this_A_W + "px"

                }).stop().animate({

                    "left": labelW + this_B_W + "px"

                }, 200);

                b_list.children('div').eq(index).show().siblings("div").hide();

                b_li_auto(b_list.children('div').eq(index));

            });

            function b_li_auto(obj) {

                var b_ul = obj.children('ul'),

                    b_li = obj.find('li'),

                    u_hgt = Math.ceil(b_li.length / 8) * b_li.eq(0).outerHeight(true);

                if (b_li.length > 16) {

                    b_ul.css('height', '164px');

                    brandFold.show();

                    brandUnfold.hide();

                } else {

                    b_ul.css('height', u_hgt);

                    brandFold.hide();

                    brandUnfold.hide();

                };

                brandFold.on('click', function() {

                    b_ul.stop().animate({
                        "height": u_hgt,
                        "overflow": "visible"
                    }, 200);

                    $(this).hide();

                    brandUnfold.show();
                });

                brandUnfold.on('click', function() {

                    b_ul.stop().animate({
                        "height": '164px',
                        "overflow": "hidden"
                    }, 200);

                    $(this).hide();

                    brandFold.show();
                });
            }

        },

        //tab切换
        tabFunc: function(config) {

            //tab默认属性
            var defaults = {

                main: ".J-tab", //tab最外层盒子的class

                menu: ".J-tab-menu", //ul的class

                content: ".J-tab-content", //内容区域外层盒子class

                cont_child: ".J-panel",

                eventtype: "mouseover", //事件名称

                select: "z-select" //标签选中class

            };

            //合并外部对象
            var option = $.extend({}, defaults, config);

            var J_tab = option.main,
                J_menu = option.menu,
                J_content = option.content,
                J_cont_child = option.cont_child,
                J_event = option.eventtype,
                J_select = option.select;

            $(J_tab).each(function() {

                var self = $(this),

                    self_menu = self.find(J_menu),

                    self_content = self.find(J_content);

                self_menu.on(J_event, 'li', function() {

                    var that = $(this),

                        index = that.index();

                    that.addClass(J_select).siblings().removeClass(J_select);

                    self_content.find(J_cont_child).eq(index).removeClass('hide').siblings(J_cont_child).addClass('hide');

                });

            });

        },

        //宝宝新手礼
        babyGift: function() {

            var J_bc_g = $(".J-bc-g");

            J_bc_g.on('click', function() {

                //giftRule(0);//领取失败

                giftRule(1); //领取成功

            });

            function giftRule(type) {

                var gift_ok = '<div id="u-bg-ok"><p>恭喜您领取成功，请至购物车查看</p></div>',

                    gift_fail = '<div id="u-bg-fail"><p>您已经领取过了哦</p></div>';

                if (type) { //领取成功

                    m_b_obj.dialog({
                        content: gift_ok,
                        button: [{
                            value: '查看购物车',
                            callback: function() {},
                            autofocus: true
                        }, {
                            value: '关闭',
                            callback: function() {},
                            autofocus: true
                        }]
                    });
                } else { //领取失败

                    m_b_obj.dialog({
                        content: gift_fail,
                        button: [{
                            value: '确定',
                            callback: function() {},
                            autofocus: true
                        }]
                    });
                }

            }
        },

        //弹层公用
        dialog: function(obj, fun) {

            var _default = {
                fixed: true,
                width: '440px',
                height: 'auto',
                title: '温馨提示',
                content: '',
                quickClose: true,
                opacity: 0.4,
                button: [{}]
            };

            var option = $.extend(true, _default, obj);

            var d = dialog(option);

            d.showModal();

            d.show();

            //判断是否需要外部执行函数
            if (typeof arguments[1] === "function") {

                arguments[1]();

            }

        }


    };

    window.m_b_obj = m_b_obj;

    m_b_obj.init();


})(window);
