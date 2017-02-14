/**
 * Created by chenmeng on 2017/2/10.
 */
let mongoose = require('mongoose');
mongoose.Promise = Promise
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://127.0.0.1/weixin')
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String
})
exports.User = mongoose.model('User', UserSchema);

let UserSettingsSchema = new mongoose.Schema({
    userinfo: {
        type: ObjectId,
        ref: 'User'
    },
    nickname: String,
    address: String,
    gender: String,
    region: String,
    signname: String
})
exports.UserSettings = mongoose.model('UserSettingsSchema', UserSettingsSchema);