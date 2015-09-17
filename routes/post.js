var bodyParser = require('body-parser');
var session    = require('express-session');
var postApi    = require('../api/postapi.js');

module.exports = function(app) {    
    /* ========== PROFILE ========== */
    var sesh;
    
    app.get('/post', function(req, res) {
        sesh = req.session; 
        
        if(sesh.email) {
            res.render('newpost.html', {user:req.session.name});
        }
        else {
            res.redirect(301, '/login');
        }
    });
    
    app.post('/post', function(req, res) {
        postApi.addPost(req, res);
    });
    
    app.delete('/post/:id', function(req, res) {
        console.log("\nROUTE: " + req.route.path);
        postApi.deletePost(req, res, function(msg, posts){
            res.render('profile.html', {msg:msg, user:req.session.name, result:posts});
        });
    });
    
    app.put('/post/:id', function(req, res) {
        console.log("route: updating.... " + req.route.path);
        postApi.deletePost(req, res, function(msg, posts){
            res.render('profile.html', {msg:msg, user:req.session.name, result:posts});
        });
    });
}