var db   = require('../js/mongoose.js');

var addBlogger = function (req, res){
    var userid   = (1e4*(Date.now()+Math.random())).toString(16);
    var details  = req.body;
    
    details._id  = userid; //add id to details
    console.log(details);
    
    db.saveUser(details, function(saved){
        console.log("\n========== Successful Insert =========");
        console.log(saved);
        
        var msg = "Successfully created your account!";
        res.render('result.html', {msg:msg, user:saved.first_name});
    })
}

var logBlogger = function (req, res){
    var details  = req.body;
    
    db.logUser(details, function(saved){
        console.log(saved);
        
        /*var msg = "Successfully created your account!";
        res.render('home.html', {msg:msg, user:saved.first_name});*/
    })
}

exports.addBlogger = addBlogger;
exports.logBlogger = logBlogger;
