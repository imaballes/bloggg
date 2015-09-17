var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bloggg');
var db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('Database connection error!', err);
});
db.once('open', function () {
    console.log('========= Connected to postdb =========\n');
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
        /*console.log("+++++++++");
        console.log(posts);
        console.log("+++++++++");*/
        
        if(err || posts == null) {
            var callback_data = {msg:"Nothing to display", err:true};
            callback(callback_data);
        }
        else {
            //console.log(posts);
            callback(posts);
        }
    });
}

// delete post by id
var removePost = function(id, callback) {
    var entry = {_id:id};
    console.log(entry);
    
    Post.findOne(entry, function(err, result){
        if(err || !result){
            callback_data = {msg:"Post not existing..", err:true};
            callback(callback_data);
        }
        else{
            console.log(result);
            Post.remove(entry, function(err, deleted){       
                if(err || !deleted) {
                    callback_data = {msg:"Error deleting..", err:true};
                    callback(callback_data);
                }
                else {
                    callback_data = {msg:"ID: " + entry._id + ", deleted successfully!", err:false} 
                    callback(callback_data);
                }
            });
        }
    });
}

exports.savePost   = savePost;
exports.getPosts   = getPosts;
exports.removePost = removePost;