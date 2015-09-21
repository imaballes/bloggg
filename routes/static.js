var cons = require('consolidate');

module.exports = function(app) {     
    // ========== BOOTSTRAP
    app.get('/js/bootstrap.min.js', function(req, res){
        cons.swig("public/bootstrap/js/bootstrap.min.js", {},
            function(err, js) {
                res.writeHead(200, {"Content-Type":"text/javascript"});
                res.end(js);
        });
    })
    app.get('/css/bootstrap.min.css', function(req, res){
        cons.swig("public/bootstrap/css/bootstrap.min.css", {},
            function(err, css) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(css);
        });
    })
    app.get('/css/bloggg.css', function(req, res){
        cons.swig("public/bootstrap/css/bloggg.css", {},
            function(err, mystyle) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(mystyle);
        });
    })
    app.get('/jquery-1.11.3.min.js', function(req, res){
        cons.swig("public/jquery/jquery-1.11.3.min.js", {},
			function(err, js) {
				res.writeHead(200, {"Content-Type":"text/javascript"});
				res.end(js);
        });
    })
    
    
    // ========== REGISTER
    app.get('/register/js/bootstrap.min.js', function(req, res){
        cons.swig("public/bootstrap/js/bootstrap.min.js", {},
            function(err, js) {
                res.writeHead(200, {"Content-Type":"text/javascript"});
                res.end(js);
        });
    })
    app.get('/register/css/bootstrap.min.css', function(req, res){
        cons.swig("public/bootstrap/css/bootstrap.min.css", {},
            function(err, css) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(css);
        });
    })
    app.get('/register/css/bloggg.css', function(req, res){
        cons.swig("public/bootstrap/css/bloggg.css", {},
            function(err, mystyle) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(mystyle);
        });
    })
    app.get('/register/jquery-1.11.3.min.js', function(req, res){
        cons.swig("public/jquery/jquery-1.11.3.min.js", {},
			function(err, js) {
				res.writeHead(200, {"Content-Type":"text/javascript"});
				res.end(js);
        });
    })
    
    // ========== DASHBOARD
    app.get('/dashboard/js/bootstrap.min.js', function(req, res){
        cons.swig("public/bootstrap/js/bootstrap.min.js", {},
            function(err, js) {
                res.writeHead(200, {"Content-Type":"text/javascript"});
                res.end(js);
        });
    })
    app.get('/dashboard/css/bootstrap.min.css', function(req, res){
        cons.swig("public/bootstrap/css/bootstrap.min.css", {},
            function(err, css) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(css);
        });
    })
    app.get('/dashboard/css/bloggg.css', function(req, res){
        cons.swig("public/bootstrap/css/bloggg.css", {},
            function(err, mystyle) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(mystyle);
        });
    })
    app.get('/dashboard/jquery-1.11.3.min.js', function(req, res){
        cons.swig("public/jquery/jquery-1.11.3.min.js", {},
			function(err, js) {
				res.writeHead(200, {"Content-Type":"text/javascript"});
				res.end(js);
        });
    })
    
    // ========== POST
    app.get('/post/:id/js/bootstrap.min.js', function(req, res){
        cons.swig("public/bootstrap/js/bootstrap.min.js", {},
            function(err, js) {
                res.writeHead(200, {"Content-Type":"text/javascript"});
                res.end(js);
        });
    })
    app.get('/post/:id/css/bootstrap.min.css', function(req, res){
        cons.swig("public/bootstrap/css/bootstrap.min.css", {},
            function(err, css) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(css);
        });
    })
    app.get('/post/:id/css/bloggg.css', function(req, res){
        cons.swig("public/bootstrap/css/bloggg.css", {},
            function(err, mystyle) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(mystyle);
        });
    })
    app.get('/post/:id/jquery-1.11.3.min.js', function(req, res){
        cons.swig("public/jquery/jquery-1.11.3.min.js", {},
			function(err, js) {
				res.writeHead(200, {"Content-Type":"text/javascript"});
				res.end(js);
        });
    })
    
    // ========== USER
    app.get('/user/:id/js/bootstrap.min.js', function(req, res){
        cons.swig("public/bootstrap/js/bootstrap.min.js", {},
            function(err, js) {
                res.writeHead(200, {"Content-Type":"text/javascript"});
                res.end(js);
        });
    })
    app.get('/user/:id/css/bootstrap.min.css', function(req, res){
        cons.swig("public/bootstrap/css/bootstrap.min.css", {},
            function(err, css) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(css);
        });
    })
    app.get('/user/:id/css/bloggg.css', function(req, res){
        cons.swig("public/bootstrap/css/bloggg.css", {},
            function(err, mystyle) {
                res.writeHead(200, {"Content-Type":"text/css"});
                res.end(mystyle);
        });
    })
    app.get('/user/:id/jquery-1.11.3.min.js', function(req, res){
        cons.swig("public/jquery/jquery-1.11.3.min.js", {},
			function(err, js) {
				res.writeHead(200, {"Content-Type":"text/javascript"});
				res.end(js);
        });
    })
}