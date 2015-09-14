var bodyParser = require('body-parser');
var blog       = require('../api/blogapi.js');

module.exports = function(app) {  
    app.use(bodyParser.urlencoded({ extended: false }));

    // === LOGIN
    app.get('/', function(req, res){
        console.log("========= Welcome to Bloggg! =========");
        res.render('index.html');
    });

    // === REGISTRATION
    app.get('/register', function(req, res){
        console.log(":: Registration :: ");
        res.render('regform.html');
    });
    
    app.post('/register', function(req, res){
        blog.addBlogger(req, res);
    });
}