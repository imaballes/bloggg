var db = require('../db/userdb.js');
var dns = require('dns');

var addBlogger = function (req, res, callback) {
    var details  = req.body;
    var result;
    var validation_msg;
        
    // incomplete reg details
    if(details.email == '' || details.password == '' || details.first_name == '' || details.last_name =='') {
        result = {redirect:'regform.html', msg:"All fields are required.", user:''};
        callback(result);
    }
    else {
        // validate email
        var splitEmail = details.email.split("@");
        dns.resolveMx(splitEmail[1], function(err, data){
            if(err) {
                result = {redirect:'regform.html', msg:"Invalid email. Please use a valid email.", user:''};
                callback(result);
            }
            else {
                console.log("[SUCCESS] Email is valid: " + details.email);
                var userid   = (1e4*(Date.now()+Math.random())).toString(16);
            
                details._id  = userid; //add id to details
                console.log(details);
                
                db.saveUser(details, function(result) {
                    console.log("\n========== Duplicate Key (Email) =========");
                    if(result.err==true){
                        result = {redirect:'regform.html', msg:result.msg, user:''};
                    }
                    else {
                        console.log("\n========== Successful Insert =========");
                        result = {redirect:'result.html', msg:"Successfully created your account!", user:result.first_name};
                    }
                    callback(result);
                });
            }
        });
    }
    
    /*else {
        var userid   = (1e4*(Date.now()+Math.random())).toString(16);
        
        details._id  = userid; //add id to details
        console.log(details);
        
        db.saveUser(details, function(result) {
            console.log("\n========== Duplicate Key (Email) =========");
            if(result.err==true){
                result = {redirect:'regform.html', msg:result.msg, user:''};
            }
            else {
                console.log("\n========== Successful Insert =========");
                result = {redirect:'result.html', msg:"Successfully created your account!", user:result.first_name};
            }
            callback(result);
        });
    }*/
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