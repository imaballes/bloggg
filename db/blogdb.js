var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bloggg');
var db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('Database connection error!', err);
});
db.once('open', function () {
    console.log('========= Connected to blogpost database =========\n');
});

var Post = mongoose.model('Posts', {
    _id        : {type:String, unique:true},
    title      : String,
    body       : String,
    timestamp  : {type:Date, default:Date.now}
});

// create new blog entry
var savePost = function(entry, callback) {
    var MyPost = new Post({
            _id        : entry._id,
            title      : entry.title,
            body       : entry.body
        });
    
    MyPost.save(function(err, saved) {
        if(err) {
            console.log(err);
            process.exit();
        }
        callback(saved);
    });
}

// get all posts
var getPosts = function(callback) {
    Post.find(function(err, posts){
        console.log("+++++++++");
        console.log(posts);
        console.log("+++++++++");
        
        if(err || posts == null) {
            var callback_err = {msg:"Nothing to display", err:true};
            callback(callback_err);
        }
        else {
            console.log(posts);
            callback(posts);
        }
    });
}

exports.savePost = savePost;
exports.getPosts = getPosts;