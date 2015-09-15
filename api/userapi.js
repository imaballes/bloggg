var db = require('../db/userdb.js');

var addBlogger = function (req, res) {
    var userid   = (1e4*(Date.now()+Math.random())).toString(16);
    var details  = req.body;
    var msg;
    
    details._id  = userid; //add id to details
    console.log(details);
    
    db.saveUser(details, function(saved) {
        console.log("\n========== Successful Insert =========");
        console.log(saved);
        
        msg = "Successfully created your account!";
        res.render('result.html', {msg:msg, user:saved.first_name});
    });
}

var logBlogger = function (req, res, callback) {
    console.log("\n========= Checking Database =========\n");
    db.logUser(req.body, function(result) {
        console.log(result.msg);
        
        if(result.err == true) {
            callback(result.msg);
        }
        else {
            console.log("DB NAME: " + result.first_name);
            
            console.log("\n========= Setting session =========\n");
            
            var sesh = req.session;       
            sesh.email = req.body.email;
            sesh.name  = result.first_name;
            console.log(sesh);
            
            res.redirect(301, '/dashboard');
        }
    });
}

exports.addBlogger = addBlogger;
exports.logBlogger = logBlogger;
