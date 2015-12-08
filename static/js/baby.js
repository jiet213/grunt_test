/*************************************************
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
