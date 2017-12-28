var http = require("http");
var express = require("express");
var bodyParser  = require('body-parser');
var CognitoExpress = require("cognito-express");


var app = express();
var controllers = require("./controllers");

app.set("view engine", "vash");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ***************************************************************************************************
// Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions
// ***************************************************************************************************
//Initializing CognitoExpress constructor
var cognitoExpress = new CognitoExpress({
    region: "us-west-2",
    cognitoUserPoolId: "us-west-2_Sygc95OQO",
    tokenUse: "access", //Possible Values: access | id
    tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});


app.use("/api", function (req, res, next) {
    var originalUrl = req.originalUrl;
    console.log('Authenticated Request URL:', req.originalUrl);
    console.log('Authenticated Request Type:', req.method);

    // The method next is replacing all the commented code.
    next();

     /*
     if(originalUrl.indexOf("login") !== -1){
         next();
     }
     else {
         //I'm passing in the access token in header under key accessToken
         var accessTokenFromClient = req.headers.accesstoken;

         //Fail if token not present in header.
         if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

         cognitoExpress.validate(accessTokenFromClient, function (err, response) {

             //If API is not authenticated, Return 401 with error message.
             if (err) return res.status(401).send(err);

             //Else API has been authenticated. Proceed.
             console.log('response:', response);
             res.locals.user = response;
             next();
         });
     }*/
});

// ***************************************************************************************************

// Map routes
controllers.init(app);

app.set('views', __dirname+'/views/');


var server = http.createServer(app);

server.listen(3001);