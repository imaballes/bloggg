// ========== PACKAGES
var express    = require('express');
var app        = express();

// ========== ROUTES
require('./routes/blog')(app);
require('./routes/static')(app);

// ========== RENDER CLIENTVIEW
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//MISC
// ========== STATIC
app.use(express.static('static'));

// ========== BINDER
app.listen(8008, function(result){
    console.log("Listening on port 8008!");
});