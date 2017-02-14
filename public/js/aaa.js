

Vue.config.delimiters = ["${", "}"], void 0 != Vue && (Vue = Vue.extend({
	methods: {
		tsToDate: function(i) {
			return new Date(1e3 * i).toLocaleString().split(" ")[0]
		},
		tsToDateTime: function(i) {
			return new Date(1e3 * i).toLocaleString()
		},
		humanizeTimestamp: function(i) {
			var e = 3600,
				a = 86400,
				o = 2592e3,
				t = Math.round((new Date).getTime() / 1e3),
				_ = t - i,
				d = new Date(1e3 * i);
			return e > _ ? Math.round(_ / 60) < 3 ? "刚刚" : Math.round(_ / 60) + "分钟前" : a > _ ? Math.round(_ / 60 / 60) + "小时前" : o > _ ? Math.round(_ / 24 / 60 / 60) + "天前" : (d = d.toLocaleString(), d = d.split(" "), d[0])
		},
		weuiAlert: function(i) {
			GLOBAL.weui.show_alert(i)
		}
	}
}));
var GLOBAL = {
	humanize_time: function(i) {
		var e = 3600,
			a = 86400,
			o = 2592e3,
			t = Math.round((new Date).getTime() / 1e3),
			_ = t - i,
			d = new Date(1e3 * i);
		return e > _ ? Math.round(_ / 60) < 3 ? "刚刚" : Math.round(_ / 60) + "分钟前" : a > _ ? Math.round(_ / 60 / 60) + "小时前" : o > _ ? Math.round(_ / 24 / 60 / 60) + "天前" : (d = d.toLocaleString(), d = d.split(" "), d[0])
	},
	getUrlId: function(i, e) {
		var a = [];
		if(void 0 == e && (e = "/"), "string" == typeof i) {
			var o = i.split(e);
			$.each(o, function(i, e) {
				$.isNumeric(e) && a.push(parseInt(e))
			})
		}
		return a
	},
	scrollTop: function(i, e, a) {
		void 0 == i && (i = "body"), void 0 == e && (e = 0), void 0 == a && (a = "fast"), $(i).animate({
			scrollTop: e
		}, a)
	},
	scrollBottom: function(i, e) {
		void 0 == i && (i = "body"), void 0 == e && (e = "fast");
		var a = $(document.body).height() - $(window).height();
		$(i).animate({
			scrollTop: a
		}, e)
	},
	weui: {
		is_loading: function() { 
			var i = $(".weui_loading_toast");
			return i.length > 0 && "none" != i.css("display")
		},
		show_loading: function(i) {
			$(".weui_loading_toast").remove(), void 0 == i && (i = "加载中...");
			var e = '<div class="weui_loading_toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">' + i + "</p></div></div>";
			return $("body").append(e), !0
		},
		hide_loading: function() {
			return $(".weui_loading_toast").hide(), !0
		},
		show_ok: function(i, e) {
			$(".weui_show_ok").remove(), void 0 == i && (i = "已完成"), void 0 == e && (e = 2e3);
			var a = '<div class="weui_show_ok"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_toast"></i><p class="weui_toast_content">' + i + "</p></div></div>";
			return $("body").append(a), setTimeout('$(".weui_show_ok").hide();', e), !0
		},
		show_alert: function(i, e, a, o) {
			$(".weui_dialog_alert").remove();
			var t = function() {
				$(".weui_dialog_alert").hide()
			};
			if(void 0 == i) return !1;
			void 0 == e && (e = t), void 0 == a && (a = "提示信息"), void 0 == o && (o = "确认");
			var _ = '<div class="weui_dialog_alert"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + a + '</strong></div><div class="weui_dialog_bd">' + i + '</div><div class="weui_dialog_ft"><a href="javascript:void(0);" class="weui_btn_dialog primary">' + o + "</a></div></div></div>";
			$("body").append(_);
			var d = $(".weui_dialog_alert a.weui_btn_dialog");
			return d.unbind(), d.on("click", function() {
				e(), t()
			}), !0
		},
		show_confirm: function(i, e, a, o, t, _) {
			$(".weui_dialog_confirm").remove();
			var d = function() {
				$(".weui_dialog_confirm").hide()
			};
			if(void 0 == i) return !1;
			void 0 == e && (e = d), void 0 == a && (a = d), void 0 == o && (o = "提示信息"), void 0 == t && (t = "取消"), void 0 == _ && (_ = "确认");
			var n = '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + o + '</strong></div><div class="weui_dialog_bd">' + i + '</div><div class="weui_dialog_ft"><a href="javascript:void(0);" class="weui_btn_dialog default" id="weui_btn_dialog_a">' + t + '</a><a href="javascript:void(0);" class="weui_btn_dialog primary" id="weui_btn_dialog_b">' + _ + "</a></div></div></div>";
			$("body").append(n);
			var l = $("#weui_btn_dialog_a"),
				u = $("#weui_btn_dialog_b");
			return l.unbind(), u.unbind(), l.on("click", function() {
				e(), d()
			}), u.on("click", function() {
				a(), d()
			}), !0
		},
		show_input_confirm: function(i, e, a, o, t) {
			if($(".weui_dialog_input_confirm").remove(), void 0 == i) return !1;
			void 0 == a && (a = ""), void 0 == e && (e = "text"), void 0 == o && (o = GLOBAL.weui.remove_input_confirm), void 0 == t && (t = GLOBAL.weui.remove_input_confirm);
			var _ = '<div class="weui_dialog_confirm weui_dialog_input_confirm"><div class="weui_mask"></div><div class="weui_dialog" style="background-color: #efedf2"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + i + '</strong></div><div class="weui_dialog_bd"><div class="weui_cell" style="padding: 2px; background-color: #fff;"><div class="weui_cell_bd weui_cell_primary"><input class="weui_input" type="' + e + '" placeholder="" value="' + a + '" style="margin-bottom: 1px;"></div></div></div><div class="weui_dialog_ft"><a href="javascript:void(0);" class="weui_btn_dialog default" id="weui_btn_dialog_a">取消</a><a href="javascript:void(0);" class="weui_btn_dialog primary" id="weui_btn_dialog_b">确认</a></div></div></div>';
			$("body").append(_);
			var d = $("#weui_btn_dialog_a"),
				n = $("#weui_btn_dialog_b");
			return d.unbind(), n.unbind(), d.on("click", function() {
				o()
			}), n.on("click", function() {
				t()
			}), !0
		},
		remove_input_confirm: function() {
			var i = $(".weui_dialog_input_confirm");
			if(1 !== i.length) return !1;
			var e = $(".weui_dialog_input_confirm input.weui_input").val();
			return i.remove(), e
		},
		show_textarea_confirm: function(i, e, a, o) {
			if($(".weui_dialog_textarea_confirm").remove(), void 0 == i) return !1;
			void 0 == e && (e = ""), void 0 == a && (a = GLOBAL.weui.remove_textarea_confirm), void 0 == o && (o = GLOBAL.weui.remove_textarea_confirm);
			var t = '<div class="weui_dialog_confirm weui_dialog_textarea_confirm"><div class="weui_mask"></div><div class="weui_dialog" style="background-color: #efedf2"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + i + '</strong></div><div class="weui_dialog_bd"><div class="weui_cell" style="padding: 2px; background-color: #fff;"><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea" placeholder="" rows="3"></textarea></div></div></div><div class="weui_dialog_ft"><a href="javascript:void(0);" class="weui_btn_dialog default" id="weui_btn_dialog_a">取消</a><a href="javascript:void(0);" class="weui_btn_dialog primary" id="weui_btn_dialog_b">确认</a></div></div></div>';
			$("body").append(t);
			var _ = $("#weui_btn_dialog_a"),
				d = $("#weui_btn_dialog_b");
			return _.unbind(), d.unbind(), _.on("click", function() {
				a()
			}), d.on("click", function() {
				o()
			}), !0
		},
		remove_textarea_confirm: function() {
			var i = $(".weui_dialog_textarea_confirm");
			if(1 !== i.length) return !1;
			var e = $(".weui_dialog_textarea_confirm textarea.weui_textarea").val();
			return i.remove(), e
		},
		show_input_textarea_confirm: function(i, e, a) {
			if($(".weui_dialog_input_textarea_confirm").remove(), void 0 == i) return !1;
			void 0 == e && (e = GLOBAL.weui.remove_input_textarea_confirm), void 0 == a && (a = GLOBAL.weui.remove_input_textarea_confirm);
			var o = '<div class="weui_dialog_confirm weui_dialog_input_textarea_confirm"><div class="weui_mask"></div><div class="weui_dialog" style="background-color: #efedf2"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + i + '</strong></div><div class="weui_dialog_bd"><div class="weui_cell" style="padding: 2px; background-color: #fff; margin-bottom: 10px;"><div class="weui_cell_bd weui_cell_primary"><input class="weui_input" type="text" placeholder="请输入标题"></div></div><style>.weui_dialog_input_textarea_confirm .weui_cell::before{border:0}</style><div class="weui_cell" style="padding: 2px; background-color: #fff;"><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea" placeholder="请输入内容" rows="4"></textarea></div></div></div><div class="weui_dialog_ft"><a href="javascript:void(0);" class="weui_btn_dialog default" id="weui_btn_dialog_a">取消</a><a href="javascript:void(0);" class="weui_btn_dialog primary" id="weui_btn_dialog_b">确认</a></div></div></div>';
			$("body").append(o);
			var t = $("#weui_btn_dialog_a"),
				_ = $("#weui_btn_dialog_b");
			return t.unbind(), _.unbind(), t.on("click", function() {
				e()
			}), _.on("click", function() {
				a()
			}), !0
		},
		remove_input_textarea_confirm: function() {
			var i = $(".weui_dialog_input_textarea_confirm");
			if(1 !== i.length) return !1;
			var e = $(".weui_dialog_input_textarea_confirm input.weui_input").val(),
				a = $(".weui_dialog_input_textarea_confirm textarea.weui_textarea").val();
			return i.remove(), [e, a]
		},
		show_easy_action_sheet: function(i, e) {
			$(".weui_actionsheet_outer_div").remove(), void 0 == i && (i = [{
				data: "",
				subject: ""
			}]), void 0 == e && (e = this.remove_easy_action_sheet);
			var a = "";
			$.each(i, function(i, e) {
				a += '<div class="weui_actionsheet_cell" data-asv="' + e.data + '">' + e.subject + "</div>"
			});
			var o = '<div class="weui_actionsheet_outer_div"><div class="weui_mask_transition"></div><div class="weui_actionsheet" style="z-index: 99;"><div class="weui_actionsheet_menu">' + a + '</div><div class="weui_actionsheet_action"><div class="weui_actionsheet_cell weui_actionsheet_cell_cancel">取消</div></div></div></div>';
			return $("body").append(o), window.weui_actionsheet_outer_div = setInterval(function() {
				$(".weui_actionsheet_outer_div").length > 0 && ($(".weui_actionsheet_outer_div .weui_mask_transition").show().addClass("weui_fade_toggle"), $(".weui_actionsheet_outer_div .weui_actionsheet").addClass("weui_actionsheet_toggle"), $(".weui_actionsheet_outer_div .weui_mask_transition").on("click", function() {
					GLOBAL.weui.remove_easy_action_sheet()
				}), clearInterval(window.weui_actionsheet_outer_div))
			}, 50), $(".weui_actionsheet_outer_div .weui_actionsheet_menu .weui_actionsheet_cell").each(function() {
				var i = $(this);
				i.unbind(), i.on("click", function() {
					i.addClass("weui_actionsheet_cell_selected"), e()
				})
			}), $(".weui_actionsheet_outer_div .weui_actionsheet_action .weui_actionsheet_cell_cancel").on("click", function() {
				GLOBAL.weui.remove_easy_action_sheet()
			}), !0
		},
		remove_easy_action_sheet: function() {
			var i = $(".weui_actionsheet_outer_div");
			if(1 !== i.length) return !1;
			var e = $(".weui_actionsheet_outer_div .weui_actionsheet_menu .weui_actionsheet_cell_selected").data("asv");
			return $(".weui_actionsheet_outer_div .weui_mask_transition").removeClass("weui_fade_toggle"), $(".weui_actionsheet_outer_div .weui_actionsheet").removeClass("weui_actionsheet_toggle"), setTimeout("$('.weui_actionsheet_outer_div').remove()", 400), e
		}
	}
};
















<template v-if="sys.selectRegion">
    <div class="weui_selectregion_out_div">
        <div class="weui_mask_transition weui_fade_toggle"></div>
        <div class="weui_actionsheet weui_actionsheet_toggle" style="z-index: 99;">
            <div class="weui_actionsheet_menu">
                <div class="weui_cells" style="margin-top: 0;">
                    <div class="weui_cell weui_cell_select">
                        <div class="weui_cell_bd weui_cell_primary">
                            <select class="weui_select" id="select-province">
                                <option v-for="(i, v) in region.province" v-if="i < 1" selected value="${ v }">${ v }</option>
                                <option v-for="(i, v) in region.province" v-if="i > 0" value="${ v }">${ v }</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui_cell weui_cell_select">
                        <div class="weui_cell_bd weui_cell_primary">
                            <select class="weui_select" id="select-city">
                                <option v-for="(i, v) in region.city" v-if="i < 1" selected value="${ v }">${ v }</option>
                                <option v-for="(i, v) in region.city" v-if="i > 0" value="${ v }">${ v }</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui_actionsheet_action">
                <div class="weui_actionsheet_cell weui_actionsheet_cell_confirm" v-on:click="confirmSelectRegion()" style="color: #10AEFF">确认</div>
            </div>
            <div class="weui_actionsheet_action">
                <div class="weui_actionsheet_cell weui_actionsheet_cell_cancel" v-on:click="cancelSelectRegion()" style="color: #F76260">取消</div>
            </div>
        </div>
    </div>
</template>