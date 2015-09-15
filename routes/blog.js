var bodyParser = require('body-parser');
var session    = require('express-session');
var blogapi       = require('../api/blogapi.js');
var db         = require('../js/mongoose.js');

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
        console.log("\n========= Welcome to Bloggg! =========");
        
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
        blogapi.logBlogger(req, res, function(result){
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
        blogapi.addBlogger(req, res);
    });
    
    /* ========== PROFILE ========== */
    app.get('/dashboard', function(req, res) {
        console.log("SESSION USER: " + req.session.name);
        res.render('profile.html', {user:req.session.name});
    });
    
    /* ========== LOGOUT ========== */
    app.get('/logout', function(req, res) {
        console.log("========= Logging out =========");
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            }
            else {
                res.redirect('/login');
            }
        });
    });
}