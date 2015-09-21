// ========== PACKAGES
var express = require('express');
var app     = express();

// ========== ROUTES
require('./routes/user')(app);
require('./routes/post')(app);
require('./routes/static')(app);

// ========== VIEW ENGINE SETUP
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('static'));

// ========== BINDER
app.listen(8008, function(result){
    console.log("Listening on port 8008!\n");
});