/**
 * Created by chenmeng on 2017/2/6.
 */

let express = require('express');
let router = express.Router();
let User = require('../schema/user').User
let UserSettings = require('../schema/user').UserSettings;
let multer = require('multer');
let path = require('path')
let uploads = multer({dest: 'uploads/'})
let checkLogin = require('../middleware').checkLogin;

router.get('/', function (req, res) {
    res.render('user/signin');
})
router.get('/signin', function (req, res) {
    if (req.session.user) {
        res.redirect('/index/weixin');
    } else {
        res.render('user/signin');
    }
})

router.get('/signup', function (req, res) {
    res.render('user/signup');
})
router.get('/userSettings',checkLogin, function (req, res) {
    let user = req.session.user
    res.render('user/userSettings', user)
})


// 检测自动登录
router.get('/check', function (req, res) {
    console.log(3)
    if (req.session.user) {
        res.redirect('/index/weixin');
    } else {
        res.redirect('/user/signin')
    }
})

router.get('/zh_city', function (req, res) {
    res.sendFile(path.resolve('zh_city.json'))
})

// 注册
router.post('/signup', uploads.single('avatar'), function (req, res) {
    let user = req.body;
    user.avatar = `/${req.file.filename}`;

    User.create(user, function (err, user) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/user/signin')
        }
    })

})
// 登陆

router.post('/signin', function (req, res) {
    let user = req.user;
    User.findOne(user, function (err, result) {
        if (err) {
            res.send({
                msg: '登陆失败',
                code: 1
            })
        } else {
            if (result) {
                req.session.user = result;
                res.send({
                    msg: '登陆成功',
                    code: 0
                })
            } else {
                res.send({
                    msg: '用户名或密码错误',
                    code: 1
                })
            }
        }
    })
})

router.post('/userSettings', function (req, res) {
    var userSettings = req.body;
    UserSettings.findOne({}, function (err, result) {
        if (err) {
            res.send({
                msg: '登陆失败',
                code: 1
            })
        } else {
            if (!result) {
                userSettings.userinfo = req.session.user._id;
                UserSettings.create(userSettings, function (err, result) {
                    if (err) {
                        res.send({
                            msg: '登陆失败',
                            code: 1
                        })
                    } else {
                        UserSettings.find(userSettings._id).exec(function (err, result) {
                            res.send(result);
                        })
                    }
                })
            } else {
                UserSettings.update({_id: result._id}, userSettings, function (err, data) {
                    res.send(userSettings);
                })
            }
        }
    })
})

router.get('/getUserData', function (req, res) {
    console.log(req.session.user)
    User.findOne({_id: req.session.user._id}, function (err, user) {
        if (err) {
            res.send({
                msg: '登陆失败',
                code: 1
            })
        } else {
            if (user) {

                var userClone = JSON.parse(JSON.stringify(user));
                userClone.password = '';
                res.send({
                    code: 0,
                    data: userClone
                })
            } else {
                res.send({
                    code: 1,
                    data: {}
                });
            }
        }
    })
})
router.get('/getUserSettings', function (req, res) {
    UserSettings.findOne({}).exec(function (err, userSettings) {
        if (err) {
            res.send({
                msg: '获取失败',
                code: 1
            })
        } else {
            if (userSettings) {
                res.send({
                    code: 0,
                    data: userSettings
                })
            } else {
                res.send({
                    code: 1,
                    data: {}
                });
            }
        }
    })
})

module.exports = router;