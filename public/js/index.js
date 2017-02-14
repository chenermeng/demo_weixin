$(function () {
    //获取信息
    $.ajax({
        url: '/user/getUserData',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result && result.code == 0) {
                localStorage.setItem('user', JSON.stringify(result.data))
            }
        }
    })
    $.ajax({
        url: '/user/getUserSettings',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result && result.code == 0) {
                localStorage.setItem('userSettings', JSON.stringify(result.data))
            }
        }
    });

    // 本地存储

    (function () {
        if (localStorage.getItem('user')) {
            var user = JSON.parse(localStorage.getItem('user'))
            $('#user_avatar').attr('src', '/uploads' + user.avatar).css('width', '60px');
            $('#user_name').html(user.username)
        }
        console.log(localStorage.getItem('userSettings'))
        if (localStorage.getItem('userSettings')) {
            var userSettings = JSON.parse(localStorage.getItem('userSettings'))


            if (userSettings.nickname) $('#nickname .weui_cell_ft').html(userSettings.nickname);
            if (userSettings.address) $('#address .weui_cell_ft').html(userSettings.address);
            if (userSettings.gender) $('#gender .weui_cell_ft').html(userSettings.gender);

            if (userSettings.region) $('#region .weui_cell_ft').html(userSettings.region);

            }
            if (userSettings.signname) $('#signname .weui_cell_ft').html(userSettings.signname);
    })();


    // 个人设置
    (function () {
        var $nickname = $('#nickname');
        var $nickname_info = $nickname.find('.weui_cell_ft');
        $nickname.on('click', function () {
            GLOBAL.weui.show_input_confirm('请输入昵称', function (info) {
                $nickname_info.html(info)
                GLOBAL.weui.remove_input_confirm();
            })
        })

        // 地址
        var $address = $('#address');
        var $n$address_info = $address.find('.weui_cell_ft');
        $address.on('click', function () {
            GLOBAL.weui.show_input_confirm('请输地址', function (info) {
                $n$address_info.html(info)
                GLOBAL.weui.remove_input_confirm();
            })
        })

        // 性别
        var $gender = $('#gender');
        var $gender_info = $gender.find('.weui_cell_ft');
        $gender.on('click', function () {
            GLOBAL.weui.show_action_sheet(['男', '女', '保密'], function (info) {
                GLOBAL.weui.remove_action_sheet()
                $gender_info.html(info)
            })
        });

        var $region = $('#region');
        var $region_info = $region.find('.weui_cell_ft');
        $region.on('click', function () {
            GLOBAL.weui.show_input_confirm('请输入地区(如北京市昌平区)', function (info) {
                $region_info.html(info)
                GLOBAL.weui.remove_input_confirm();
            })
        })
        // 地区
        /*  (function () {
         var $region = $('#region');
         var $province;
         var $city;
         var $zh_city;

         $region.click(function (e) {
         if (e.target.className != 'weui_cell_ft')return;
         $(this).find('.weui_cell_ft').html('');
         $(this).find('.weui_cell_ft').append('<select class="weui_select" name="select1" style="padding-left:0; width:40%;" id="province"></select><select class="weui_select" name="select1" style="padding-left:0; width:40%;" id="city"></select>')
         $province = $('#province');
         $city = $('#city');
         $.ajax({
         url: '/user/zh_city',
         dataType: 'json',
         type: 'get',
         success: function (result) {
         $zh_city = result
         console.log($zh_city)
         zh_city($zh_city);
         }
         })
         })


         // 二级联动
         function zh_city(data) {

         $.each(data, function (i, v) {
         if (v.province == '请选择一级地区') {
         $city.append('<option value="请选择二级地区">请选择二级地区</option>')
         }
         $province.append('<option value="' + v.province + '">' + v.province + '</option>');
         })

         $province.on('change', function (e) {
         $.each(data, function (i, v) {
         if (v.province == $province.val()) {
         $city.html('');
         $.each(v.city, function (ii, vv) {
         $city.append('<option value="' + vv + '">' + vv + '</option>')
         })
         }
         })
         })
         }
         })();*/

        // 签名
        var $signname = $('#signname');
        var $signname_info = $signname.find('.weui_cell_ft')
        $signname.on('click', function () {
            GLOBAL.weui.show_input_confirm('请输入昵称', function (info) {
                $signname_info.html(info)
                GLOBAL.weui.remove_input_confirm();
            })
        })

        // 提交
        var $btn_userSettings = $('#btn_userSettings');
        $btn_userSettings.on('click', function () {

            if (!$nickname_info.html()) {
                GLOBAL.weui.show_dialog_alert('提示', '请输入昵称')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }

            if (!$n$address_info.html()) {
                GLOBAL.weui.show_dialog_alert('提示', '请输入地址')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }

            if (!$gender_info.html()) {
                GLOBAL.weui.show_dialog_alert('提示', '请选择性别')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }
            if (!$region_info.html()) {
                GLOBAL.weui.show_dialog_alert('提示', '请填写地区')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }
            /* var $province = $('#province')
             var $city = $('#city')
             if ($province.val() == '请选择一级地区' || $city.val() == '请选择二级地区' || $city.val() == '请选择') {
             GLOBAL.weui.show_dialog_alert('提示', '请选择地区')
             $('.weui_btn_dialog').on('click', function () {
             GLOBAL.weui.remove_dialog_alert()
             })
             return false;
             }*/

            $.ajax({
                url: '/user/userSettings',
                type: 'post',
                data: {
                    nickname: $nickname_info.html().trim(),
                    address: $n$address_info.html().trim(),
                    gender: $gender_info.html().trim(),
                    region: $region_info.html().trim(),
                    signname: $signname_info.html().trim()
                },
                dataType: 'json',
                success: function (result) {
                    GLOBAL.weui.show_ok('修改成功', 1000)
                }
            })
        })
    }());
})
