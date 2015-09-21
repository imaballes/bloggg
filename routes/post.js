/*var bodyParser = require('body-parser');
var session    = require('express-session');*/
var postApi    = require('../api/postapi.js');

module.exports = function(app) {
    var sesh;
    
    /* ==================================================
        ** /POST
        set session
        check existence of session (email)
        if existing: redirect to create post page
        if !existing: redirect to login.html(login page)
    ==================================================== */
    app.get('/post', function(req, res) {
        sesh = req.session; 
        
        if(sesh.email) {
            var user_details = {
                id:sesh._id,
                first_name:sesh.first_name
            };
            res.render('newpost.html', {user:user_details});
        }
        else {
            res.redirect(301, '/login');
        }
    });
    
    /* ==================================================
        ** ADD NEW POST
        user must be logged-in to access form
        user enters title and post body
        user hits POST button
        Entry from form is saved, author uses DB name (from login session)
        datetime uses current datetime
    ==================================================== */
    app.post('/post', function(req, res) {
        postApi.addPost(req, res);
    });
    
    /* ==================================================
        ** GET POST FOR EDIT
        query using blogpost ID from req parameters
        render pre-populated edit form using query result
    ==================================================== */
    // API by :id
    app.get('/post/:id/edit', function(req, res) {
        sesh = req.session;
        postApi.displayPost(req, res, function(msg, data){
            console.log("\nROUTE: /post/:id/edit --- FUNC: displayPost\n");
            console.log(data);
            console.log("END ROUTE-----\n");
            var user_details = {
                id:sesh._id,
                first_name:sesh.first_name
            };
            res.render('editpost.html', {user:user_details, result:data});
        });
    });
    
    /* ==================================================
        ** EDIT POST
        called by editpost.html via AJAX - PUT
        query update fields
        on success display success msg & redirect to dashboard
    ==================================================== */
    app.put('/post/:id', function(req, res) {
        postApi.editPost(req, res, function(result){
            res.send(result);
        });
    });
    
    app.delete('/post/:id', function(req, res) {
        postApi.deletePost(req, res, function(result){
            res.send(result);
        });
    });
    
    app.get('/error', function(req, res){
        res.render('error.html');
    });
}