var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bloggg');
var db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('Database connection error!', err);
});
db.once('open', function () {
    console.log('========= Connected to database =========\n');
});

var Post = mongoose.model('Posts', {
    _id        : {type:String, unique:true},
    title      : String,
    body       : String,
    timestamp  : {type:Date, default:Date.now}
});

// register user
var savePost = function(entry, callback) {
    var MyPost = new Post({
            _id        : entry._id,
            title      : entry.title,
            body       : entry.body,
            last_name  : entry.last_name
        });
    
    MyUser.save(function(err, saved) {
        if(err) {
            console.log(err);
            process.exit();
        }
        callback(saved);
    });
}

/* validate login
var logUser = function(details, callback){
    var obj = {"email":details.email, "password":details.password};
    console.log(obj);
    
    User.findOne(obj, function(err, entry){
        if(err) {
            console.log(err);
            process.exit();
        }
        console.log(entry);
        callback(entry);
    });

}*/
exports.savePost = savePost;