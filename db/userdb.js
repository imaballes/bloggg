var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bloggg');
var db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('Database connection error!', err);
});
db.once('open', function () {
    console.log('========= Connected to userdb =========');
});
var User = mongoose.model('User', {
    _id        : {type:String, unique:true},
    email      : {type:String, unique:true, required:true},
    password   : {type:String, required:true},
    first_name : String,
    last_name  : String
});

// register user
var saveUser = function(users, callback) {
    var MyUser = new User({
            _id        : users._id,
            email      : users.email,
            password   : users.password,
            first_name : users.first_name,
            last_name  : users.last_name
        });
    
    MyUser.save(function(err, saved) {
        if(err) {
            console.log(err.errmsg);
            
            var msg = err.errmsg;
            
            //duplicate key
            if(err.code='11000') {
                msg = "Email is already in use. Please try a different email.";
            }
            var callback_err = {err:true, msg:msg};
            callback(callback_err);
        }
        else {
            callback(saved);
        }
    });
}

// validate login
var logUser = function(details, callback){
    var obj = {"email":details.email, "password":details.password};

    User.findOne(obj, function(err, entry){
        console.log("+++++++++");
        console.log(entry);
        console.log("+++++++++");
        
        if(err || entry == null) {
            var callback_err = {msg:"Email or password is incorrect. Please try again.", err:true};
            callback(callback_err);
        }
        else {
            callback(entry);
        }
    });
}

// update profile
var updateUser = function(query, params, callback) {
    User.update(query, params, function(err, result){
        if(err || !result) {
            callback_err = {msg:"Error updating profile..", err:true};
            callback(callback_err);
        }
        else {
            callback_data = {msg:"Profile updated successfully!"};
            callback(result);
        }
    });
}

exports.saveUser   = saveUser;
exports.logUser    = logUser;
exports.updateUser = updateUser;