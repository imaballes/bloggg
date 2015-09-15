var bodyParser = require('body-parser');
var session    = require('express-session');
var postApi    = require('../api/postapi.js');

module.exports = function(app) {    
    /* ========== PROFILE ========== */
    var sesh;
    
    app.get('/newpost', function(req, res) {
        sesh = req.session; 
        
        if(sesh.email) {
            res.render('newpost.html', {user:req.session.name});
        }
        else {
            res.redirect(301, '/login');
        }
    });
    
    app.post('/newpost', function(req, res) {
        postApi.addPost(req, res);
    });
    
    //app.put
    //app.delete
}