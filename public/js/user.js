/**
 * Created by chenmeng on 2017/2/14.
 */
$(function(){
    // 注册
    (function () {

        // 本地预览
        $('#input_img').on('change', function (e) {
            var files = this.files;
            var img = new Image();
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function (e) {
                var mb = (e.total / 1024) / 1024
                if (mb >= 2) {
                    alert('文件大小大于2M');
                    return;
                }
                img.src = this.result;
                img.style.width = "100%";
                $('#signup_avatar').html('');
                $('#signup_avatar').append(img)
            }
        });


        // 提交信息
        $('#formSubmit').on('submit', function () {
            console.log(1)
            var $username = $('#signup_name'),
                $userpassword = $('#signup_password'),
                $signupAvatar = $('#signup_avatar'),
                $input_img = $('#input_img'),
                fd = new FormData;
            if (!$username.val()) {
                GLOBAL.weui.show_dialog_alert('提示', '用户名不能为空')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }
            if (!$userpassword.val()) {
                GLOBAL.weui.show_dialog_alert('提示', '密码不能为空')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }
            if (!$signupAvatar.html().trim()) {
                GLOBAL.weui.show_dialog_alert('提示', '请上传头像')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }
        });
    }());



    // 登录
    (function () {
        var $username = $('#signin_name');
        var $password = $('#signin_password');
        var $login = $('#btn_signin');

        $login.on('click', function () {
            if (!$username.val().trim()) {
                GLOBAL.weui.show_dialog_alert('提示', '请输入账号')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }
            if (!$password.val().trim()) {
                GLOBAL.weui.show_dialog_alert('提示', '请输入密码')
                $('.weui_btn_dialog').on('click', function () {
                    GLOBAL.weui.remove_dialog_alert()
                })
                return false;
            }

            $.ajax({
                url: '/user/signin',
                method: 'POST',
                data: {
                    username: $username.val().trim(),
                    password: $password.val().trim()
                },
                dataType: 'json',
                beforeSend: function () {
                    GLOBAL.weui.show_loading()
                },
                success: function (result) {
                    console.log(result)
                    if (result && result.code == 0) {
                        GLOBAL.weui.hide_loading();
                        window.location.href = '/index/weixin';
                    }
                },
                error: function (result) {
                    console.log(result)
                    GLOBAL.weui.hide_loading();
                    GLOBAL.weui.show_dialog_alert('提示', '登陆失败')
                    $('.weui_btn_dialog').on('click', function () {
                        GLOBAL.weui.remove_dialog_alert()
                    })
                    console.log(result)
                }
            })
        })

    }());


})