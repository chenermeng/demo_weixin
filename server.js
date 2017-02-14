/**
 * Created by chenmeng on 2017/2/6.
 */
let express = require('express');
let app = express();
let path = require('path')
let fs = require('fs')
let user = require('./routes/user');
let api = require('./routes/api');

let middleware = require('./middleware');

let session = require('express-session')
let MongoStore = require('connect-mongo')(session);

let mongoose = require('mongoose');


let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'meng',
    store: new MongoStore({url: 'mongodb://127.0.0.1/weixin'})
}));

// 设置模版
app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html', require('ejs').__express);
// 静态资源处理

app.use('/public', express.static(path.resolve('public')))
app.use('/uploads', express.static(path.resolve('uploads')));



app.get('/', function (req, res) {
    console.log(2)
    res.redirect('/user/check')
})

app.use('/index', function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/user/signin')
    }
})

app.use('/user', user);

app.use('/index', api);


app.get('*', function (req, res, next) {
    res.redirect('/user/signin')
})
app.listen(3000)