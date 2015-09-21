var db = require('../db/blogdb.js');

var displayPosts = function(req, res, callback) {
    db.getPosts(function(result){
        var msg = '';
        if(result.err == true) {
            msg = result.msg
            callback(msg, {});
        }
        else {
            callback(msg, result);
        }
    });
}

var displayPost = function(req, res, callback) {
    console.log('Getting post by id: ' + req.params.id);
    
    db.getPost(req.params.id, function(result){
        var msg = '';
        if(result.err == true) {
            msg = result.msg
            callback(msg, {});
        }
        else {
            callback(msg, result);
        }
    });
}

var addPost = function (req, res) {
    var details    = req.body;
    var postid     = (1e4*(Date.now()+Math.random())).toString(16);
    details._id    = postid;
    details.author = req.session.first_name;
    details.userid = req.session._id;
    console.log(details);
    
    db.savePost(details, function(saved) {
        console.log("\n========== Successful Insert =========");
        console.log(saved);
        var session = req.session;
        session.msg = "Successfully created blog post!";
        res.redirect(301, '/dashboard');
    });
}

var editPost = function(req, res, callback) {
    console.log('Updating post by id: ' + req.params.id);
    var params = req.query; // contains - title & body
    var query = {_id:req.params.id}; // contains post id
    params.query;
    console.log(params);
    console.log(query);
    
    db.updatePost(query, params, function(result){
        console.log(result.msg);
        callback(result.msg);
    });
}

var deletePost = function(req, res, callback) {
    console.log('Deleting post by id: ' + req.params.id);
   
    db.removePost(req.params.id, function(result){
        console.log(result.msg);
        callback(result.msg);
    });
}

exports.displayPosts = displayPosts;
exports.displayPost  = displayPost;
exports.addPost      = addPost;
exports.editPost     = editPost;
exports.deletePost   = deletePost;