/**
 * Created by BALJUA on 16/08/2017.
 */

(function(userApiController){

    var data = require("../../data");

    userApiController.init = function(app){

        app.get("/api/user/:id",function(req,res){
            data.getUser(req.params.id, function(err, result){
                if(err){
                    res.send(400, err);
                }else{
                    res.set("Content-Type", "application/json");
                    res.send(result);
                }
            });
        });

        app.post("/api/user/",function(req,res){

            var user = {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                status: req.body.status,
                posts:[]
            };

            console.log("create mode!!");
            data.createNewUser(user, function(err){
                if(err){
                    console.log(err);
                    res.status(400).send(err); // res.send(400, err);
                }
                else{
                    res.set("Content-Type", "application/json");
                    res.status(201).send(user);
                }
            });

        });


    };

})(module.exports);

