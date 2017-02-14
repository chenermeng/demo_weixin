/*全局函数*/

var GLOBAL = {
    weui: {
        /**
         * @method is_loading
         * @param
         * @return true || false;
         */
        is_loading: function () {
            var is_loading = $('.weui_loading_toast');
            is_loading.css('display', 'block');
            return is_loading.length > 0 ? true : false;
        },
        /**
         * 方法说明
         * @method show_loading
         * @param string
         */
        show_loading: function () {
            $('.weui_loading_toast').remove();
            var show = '<div id="loadingToast" class="weui_loading_toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">加载中</p></div></div>';
            return $('body').append(show);
        },
        hide_loading: function () {
            return $('.weui_loading_toast').hide();
        },
        show_ok: function (msg, delay) {
            $('.show_ok').remove();
            var show_ok = '<div class="show_ok"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_toast"></i><p class="weui_toast_content">' + msg + '</p></div></div>';
            $('body').append(show_ok)
            return setTimeout("$('.show_ok').hide()", delay);
        },
        show_dialog_alert: function (title, con) {
            $('.weui_dialog_alert').remove();
            var show_dialog_alert = '<div class="weui_dialog_alert" ><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div><div class="weui_dialog_bd">' + con + '</div><div class="weui_dialog_ft"> <a href="javascript:;" class="weui_btn_dialog primary">确定</a></div></div></div>';
            $('body').append(show_dialog_alert);
        },
        remove_dialog_alert: function () {
            $('.weui_dialog_alert').remove();
        },
        show_dialog_confirm: function (title, con) {
            $('.weui_dialog_confirm').remove();
            var show_dialog_confirm = '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div><div class="weui_dialog_bd">' + con + '</div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog default">取消</a><a href="javascript:;" class="weui_btn_dialog primary">确定</a></div></div></div>';
            $('body').append(show_dialog_confirm);
        },
        show_input_confirm: function (title, b) {
            $('.weui_input_dialog_confirm').remove();
            var input_dialog_confirm = '<div class="weui_input_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog" style="background-color: #efedf2"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div><div class="weui_dialog_bd"><div class="weui_cell" style="padding: 2px; background-color: #fff;"><input class="weui_input" type="text" id="input_val"></div></div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog default" id="input_a">取消</a><a href="javascript:;" class="weui_btn_dialog primary"  id="input_b">确定</a></div></div></div>';
            $('body').append(input_dialog_confirm);
            var aa = $('#input_a');
            var bb = $('#input_b');
            aa.unbind().on('click', function () {
                $('.weui_input_dialog_confirm').remove()
            })
            bb.unbind().on('click', function () {
                var $input_val = $('#input_val').val().trim();
                b && b($input_val);
            })
        },
        remove_input_confirm: function () {
            var selected = $('.weui_input_dialog_confirm .weui_input').val().trim();
            $('.weui_input_dialog_confirm').remove();
            return selected;
        },
        show_action_sheet: function (arr, callback) {
            $('.weui_actionsheet_out_div').remove();
            var str = '';
            $.each(arr, function (i, v) {
                str += '<div class="weui_actionsheet_cell" >' + v + '</div>'
            })
            var action_sheet = '<div class="weui_actionsheet_out_div"><div class="weui_mask_transition" style="z-index:10" ></div><div class="weui_actionsheet " style="z-index:99;"><div class="weui_actionsheet_menu">' + str + '</div><div class="weui_actionsheet_action"><div class="weui_actionsheet_cell weui_actionsheet_cell_cancel" >取消</div></div> </div></div>';
            $('body').append(action_sheet);
            $(".weui_actionsheet_out_div .weui_mask_transition").show().addClass("weui_fade_toggle").on('click', function () {
                GLOBAL.weui.remove_action_sheet()
            });
            $(".weui_actionsheet_out_div .weui_actionsheet ").addClass("weui_actionsheet_toggle");
            $(".weui_actionsheet_out_div .weui_actionsheet_menu .weui_actionsheet_cell").each(function () {
                var _this = $(this);
                _this.unbind();
                _this.on("click", function () {
                    //  _this.addClass("weui_actionsheet_cell_selected")
                    callback(_this.html())
                })
            })

            $(".weui_actionsheet_out_div .weui_actionsheet_action .weui_actionsheet_cell_cancel").on("click", function () {
                GLOBAL.weui.remove_action_sheet()
            })
        },
        remove_action_sheet: function () {
            $(".weui_actionsheet_out_div .weui_mask_transition").removeClass("weui_fade_toggle");
            $(".weui_actionsheet_out_div .weui_actionsheet ").removeClass("weui_actionsheet_toggle");
            setTimeout('$(".weui_actionsheet_out_div").remove()', 400);
        }
    }
};