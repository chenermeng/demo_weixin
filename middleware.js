/**
 * Created by chenmeng on 2017/2/8.
 */
exports.checkLogin = function (req, res, next) {
    if(req.session.user){
        next();
    }else{
        res.redirect('/user/signin');
    }
}
