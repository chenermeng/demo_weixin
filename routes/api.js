/**
 * Created by chenmeng on 2017/2/6.
 */
let express = require('express');
let router = express.Router();

router.get('/weixin',function (req, res) {
    res.render('index/weixin',{isweixin:'true'});
})
router.get('/phonebook',function (req, res) {
    res.render('index/phonebook',{isphonebook:'true'});
})
router.get('/discover',function (req, res) {
    res.render('index/discover',{isdiscover:'true'});
})
router.get('/myself',function (req, res) {
    console.log(res.locals)
    res.render('index/myself',{ismyself:'true'});
})
module.exports = router;