var bodyParser = require('body-parser');
var session    = require('express-session');
var userApi    = require('../api/userapi.js');
var postApi    = require('../api/postapi.js');

module.exports = function(app) {  
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: 'ssshhhhh',
        resave: true,
        saveUninitialized: true
    }));
    
    var sesh;
    
    /* ========== LOGIN SESSION ========== */
    /*  set session
        check existence of session (email)
        if existing: redirect to homepage
        if !existing: redirect to index.html(login page)*/
    app.get('/login', function(req, res){
        console.log("\n========= Homepage =========");
        
        sesh = req.session; 
        
        if(sesh.email) {
            console.log("You are still logged-in");
        }
        else {
            res.render('index.html', {msg:''});
        }
    });
    
    /*  check existence of email and pw on database
        if existing: set session for user's email
        if !existing: err msg = "Email not found, sign-up to start blogging!"*/
    app.post('/login', function(req, res) {
        userApi.logBlogger(req, res, function(result){
            res.render('index.html', {msg:result});
        });
    });

    /* ========== REGISTRATION ========== */
    app.get('/register', function(req, res) {
        sesh = req.session;
        if(sesh.email) {
            // user is logged in - show homepage
            console.log("You are still logged-in...");
        }
        else {
            console.log(":: Registration :: ");
            res.render('regform.html');
        }
    });
    
    app.post('/register', function(req, res) {
        userApi.addBlogger(req, res);
    });
    
    /* ========== PROFILE ========== */
    app.get('/dashboard', function(req, res) {
        sesh = req.session; 
        
        if(sesh.email) {
            console.log("SESSION USER: " + req.session.name);
            var msg = '';
            if (req.session.msg != undefined) {
                msg = req.session.msg;
            }
            postApi.displayPost(req, res, function(msg, posts){
                res.render('profile.html', {msg:msg, user:req.session.name, result:posts});
            });
        }
        else {
            res.redirect(301, '/login');
        }
    });
    
    /* ========== LOGOUT ========== */
    app.get('/logout', function(req, res) {
        console.log("========= Logging out =========");
        sesh = req.session; 
        
        if(sesh.email) {
            req.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                }
                else {
                    res.redirect(301, '/login');
                }
            });
        }
        else {
            res.redirect(301, '/login');
        }
    });
}