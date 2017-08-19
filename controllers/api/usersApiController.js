/**
 * Created by BALJUA on 16/08/2017.
 */

(function(usersApiController){

    var data = require("../../data");

    usersApiController.init = function(app){

        app.get("/api/users",function(req,res){

            data.getUsers(function(err,results){
                if(err){
                    res.send(400, err);
                }else{
                    res.set("Content-Type", "application/json");
                    res.send(results);
                }
            });
        });

        // app.post()

    };

})(module.exports);
