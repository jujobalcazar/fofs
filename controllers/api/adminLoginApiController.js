/**
 * Created by BALJUA on 20/09/2017.
 */

(function(adminLoginApiController){

    adminLoginApiController.init = function(app){

        app.post("/api/adminlogin/",function(req,res){
            var loginObject ={
                result: "success"
            };

            res.set("Content-Type", "application/json");
            res.status(200).send(loginObject); // Result must be Json object.
        });
    };
})(module.exports);