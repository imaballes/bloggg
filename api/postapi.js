var db = require('../db/blogdb.js');

var addPost = function (req, res) {
    var details = req.body;
    var postid  = (1e4*(Date.now()+Math.random())).toString(16);
    details._id = postid;
    console.log(details);
    
    db.savePost(details, function(saved) {
        console.log("\n========== Successful Insert =========");
        console.log(saved);
        var session = req.session;
        session.msg = "Successfully created blog post!";
        res.redirect(301, '/dashboard');
    });
}

var displayPost = function(req, res, callback) {
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
    
    /*var render = function(posts){
        //res.render('profile.html', {msg:'', user:req.session.name, result:posts});
        callback(posts);
    }

    var result = {};
    db.find(function(err, posts) {
        if(err) {
            console.log(err);
        }
        else {
            result = posts;
            render(result);
        }
    });*/
}
exports.addPost  = addPost;
exports.displayPost = displayPost;