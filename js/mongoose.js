var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bloggg');

var saveUser = function(users, callback){
    var User = mongoose.model('User', {
        _id        : {type:String, unique:true},
        email      : {type:String, unique:true},
        password   : String,
        first_name : String,
        last_name  : String
    });

    var MyUser = new User({
            _id        : users._id,
            email      : users.email,
            password   : users.password,
            first_name : users.first_name,
            last_name  : users.last_name
        });
    
    MyUser.save(function(err, saved) {
        if(err){
            console.log(err);
            process.exit();
        }
        callback(saved);
    });
}

var logUser = function(user, callback){
    callback("Logging in....");
}

exports.saveUser = saveUser;
exports.logUser  = logUser;