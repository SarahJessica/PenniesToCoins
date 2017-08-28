var express = require('express');

var app = express();

var port = 8800;
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});

//ROUTING
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('index');
});
