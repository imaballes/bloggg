var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Database connection error!', err);
});
db.once('open', function () {
    console.log('========= Connected to postdb =========\n');
});
var mongoose = require('mongoose');
var Post = mongoose.model('Posts', {
    _id        : {type:String, unique:true},
    title      : {type:String, required:true},
    body       : String,
    author     : String,
    userid     : String,
    timestamp  : {type:Date, default:Date.now}
});

// create new blog entry
var savePost = function(entry, callback) {
    var MyPost = new Post({
            _id        : entry._id,
            title      : entry.title,
            body       : entry.body,
            author     : entry.author,
            userid     : entry.userid
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
        if(err || posts == null) {
            var callback_data = {msg:"Nothing to display", err:true};
            callback(callback_data);
        }
        else {
            callback(posts);
        }
    });
}

// get post by id
var getPost = function(id, callback) {
    var entry = {_id:id};
    console.log(entry);
    
    Post.findOne(entry, function(err, posts){        
        if(err || !posts) {
            var callback_data = {msg:"Post not existing..", err:true};
            callback(callback_data);
        }
        else {
            console.log("GET POST-----\n");
            console.log(posts);
            console.log("END GET POST-----\n");
            callback(posts);
        }
    });
}

// update post by id
var updatePost = function(query, params, callback) {
    var timestamp = {timestamp:new Date()};
    params.timestamp;
    console.log("\n===blogdb===\n");
    console.log(params);
    Post.update(query, params, function(err, result){
        if(err || !result){
            callback_data = {msg:"Error updating post.."};
            callback(callback_data);
        }
        else {
            callback_data = {msg:"ID: " + params._id + ", updated successfully!"};
            callback(callback_data);
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
                    callback_data = {msg:"ID: " + entry._id + ", deleted successfully!", err:false}; 
                    callback(callback_data);
                }
            });
        }
    });
}

exports.getPosts   = getPosts;
exports.getPost    = getPost;
exports.savePost   = savePost;
exports.updatePost = updatePost;
exports.removePost = removePost;