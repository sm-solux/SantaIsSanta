const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
   
    name:{
        type:String,
        maxLength:10,
        required : true
    },
    id:{
        type:String,
        maxLength:12,
        required : true
    },
    password:{
        type:String,
        minlength:6,
        required : true
    },
    user_info:{
        type:String,
        maxLength:30,
        required : true
    },
    birth:{
        type:Date
    },
    gender:{
        type:Boolean
    },
    badge_cnt:{
        type:Number,
        default:0
    },
    image:{
        type: String
    },
    token:{
        type: String
    },
    tokenExp:{
        type:Number
    }
    })

userSchema.pre('save', function(next){
    var user = this;
    
    console.log(123)
    if (user.isModified('password')){
        // 비밀번호 암호화
        console.log(456)
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //암호화된 비밀번호와 일치하는지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })

}

userSchema.methods.generateToken = function(cb){
    //토큰 생성
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}



userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰 디코드 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 후
        //클라이언트에서 가져온 토큰과 DB에 보관된 토큰 일치확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)
module.exports = { User }