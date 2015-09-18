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
    console.log("========= Checking Database =========\n");
    if(req.body.email == '' || req.body.password == ''){
        callback("Please fill-up all fields.");
    }
    else {
        db.logUser(req.body, function(result) {
            console.log(result.msg);
            
            if(result.err == true) {
                callback(result.msg);
            }
            else {
                console.log("DB NAME: " + result.first_name);
                
                console.log("\n========= Setting session =========\n");
                console.log("ID:: " + result._id);
                var sesh = req.session;       
                sesh.email      = req.body.email;
                sesh._id        = result._id;
                sesh.first_name = result.first_name;
                sesh.last_name  = result.last_name;
                sesh.password   = result.password;
                console.log(sesh);
                
                res.redirect(301, '/dashboard');
            }
        });
    }
}

var editBlogger = function(req, res, callback) {
    var params = req.query;
        var query = {_id:req.params.id}; //user id
        console.log("\n===== SETTING VALUES FOR PARAMS =====\n");
        console.log(params);
        var sesh = req.session;
        sesh._id        = req.params.id;
        sesh.first_name = params.first_name;
        sesh.last_name  = params.last_name;
        sesh.email      = params.email;
        sesh.password   = params.password;
        console.log("\n===== SETTING NEW VALUES FOR SESSION =====\n");
        console.log(sesh);
        
        db.updateUser(query, params, function(result){
        if(result.err==true) {
            console.log(result.msg);
        }
        else {
            console.log(result.msg);
            callback(result.msg);
        }
    });
}

exports.addBlogger  = addBlogger;
exports.logBlogger  = logBlogger;
exports.editBlogger = editBlogger;