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
    app.get('/', function(req, res){        
        res.redirect(301, '/login');
    });
    
    /* ==================================================
        GET: LOGIN
        set session
        check existence of session (email)
        if existing: redirect to homepage
        if !existing: redirect to index.html(login page)
    ==================================================== */
    app.get('/login', function(req, res){        
        sesh = req.session; 
        if(sesh.email) {
            console.log("You are still logged-in");
            res.render('profile.html', {msg:'', user:req.session.name, result:''});
        }
        else {
            res.render('index.html', {msg:''});
        }
    });
    
    /* ==================================================  
        POST: LOGIN
        check existence of email and pw on database
        if existing: set session for user's email
        if !existing: err msg = "Email not found, sign-up to start blogging!"
    ==================================================== */
    app.post('/login', function(req, res) {
        userApi.logBlogger(req, res, function(result){
            res.render('index.html', {msg:result});
        });
    });

    /* ==================================================
        GET:  REGISTRATION
        set session
        check existence of session (email)
        if existing: redirect to homepage
        if !existing: redirect to regform.html(registration page)
    ==================================================== */
    app.get('/register', function(req, res) {
        sesh = req.session;
        if(sesh.email) {
            console.log("You are still logged-in...");
            res.render('profile.html', {msg:'', user:req.session.name, result:''});
        }
        else {
            console.log(":: Registration ::");
            res.render('regform.html', {msg:''});
        }
    });
    
    /* ==================================================  
        POST: REGISTRATION
        check existence of email and pw on database
        if existing: set session for user's email
        if !existing: err msg = "Email not found, sign-up to start blogging!"
    ==================================================== */
    app.post('/register', function(req, res) {
        var msg = '';
        userApi.addBlogger(req, res, function(result){
            res.render(result.redirect, {msg:result.msg, user:result.user});
        });
    });
    
    /* ==================================================
        GET: DASHBOARD (VIEW ALL POSTS)
        set session
        check existence of session (email)
        if existing: redirect to homepage
        if !existing: redirect to regform.html(registration page)
    ==================================================== */
    app.get('/dashboard', function(req, res) {
        sesh = req.session; 
        
        if(sesh.email) {
            var msg = '';
            if (req.session.msg != undefined) {
                msg = req.session.msg;
            }
            postApi.displayPosts(req, res, function(msg, posts){
                var user_details = {
                    id:sesh._id,
                    first_name:sesh.first_name,
                    last_name:sesh.last_name,
                    email:sesh.email,
                    password:sesh.password,
                };
                
                res.render('profile.html', {msg:msg, user:user_details, result:posts});
            });
        }
        else {
            res.redirect(301, '/login');
        }
    });
    
    /* ==================================================
        GET: EDIT PROFILE
        set session
        check existence of session (email)
        if existing: redirect to homepage
        if !existing: redirect to regform.html(registration page)
    ==================================================== */
    app.get('/user/:id/edit', function(req, res) {
        sesh = req.session;
        if(sesh.email) {
            var user_details = {
                id:sesh._id,
                first_name:sesh.first_name,
                last_name:sesh.last_name,
                email:sesh.email,
                password:sesh.password
            };
            res.render('update_profile.html', {user: user_details})
        }
        else {
            res.redirect(301, '/login');
        }
    })
    
    /* ==================================================
        PUT: EDIT PROFILE
    ==================================================== */
    app.put('/user/:id', function(req, res) {               
        userApi.editBlogger(req, res, function(result){
            res.send(result);
        });
    });
    
    /* ==================================================
        GET: LOGOUT
        set session
        check existence of session (email)
        if existing: destroy user's session (email) - redirect to login page
        if !existing: redirect to login page
    ==================================================== */
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