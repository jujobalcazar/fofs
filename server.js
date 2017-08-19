var http = require("http");
var express = require("express");
var bodyParser  = require('body-parser');
var app = express();
var controllers = require("./controllers");

app.set("view engine", "vash");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Map routes
controllers.init(app);

app.set('views', __dirname+'/views/');

// web api
/*app.get("/api/users",function(req,res){	
	// Headers come first
	res.set("Content-Type", "application/json");
	//res.set("Custom-Header", "full of fools");	
	res.send({name: "JuanJo Balcazar", email: "jujobalcazar@hotmail.com", gender: "male"});	
});*/

var server = http.createServer(app);

server.listen(3001);