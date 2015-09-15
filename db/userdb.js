var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bloggg');
var db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('Database connection error!', err);
});
db.once('open', function () {
    console.log('========= Connected to database =========\n');
});

var User = mongoose.model('User', {
    _id        : {type:String, unique:true},
    email      : {type:String, unique:true},
    password   : String,
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
            console.log(err);
            process.exit();
        }
        callback(saved);
    });
}

// validate login
var logUser = function(details, callback){
    var obj = {"email":details.email, "password":details.password};
    console.log(obj);
    
    User.findOne(obj, function(err, entry){
        console.log("+++++++++");
        console.log(entry);
        console.log("+++++++++");
        
        if(err || entry == null) {
            var callback_err = {msg:"Email or password is incorrect. Please try again.", err:true};
            callback(callback_err);
        }
        else {
            console.log(entry);
            callback(entry);
        }
    });
}

exports.saveUser = saveUser;
exports.logUser  = logUser;