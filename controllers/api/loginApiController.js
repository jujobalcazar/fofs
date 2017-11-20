/**
 * Created by BALJUA on 19/10/2017.
 */


(function(loginApiController){

    loginApiController.init = function(app){

        app.post("/api/login/",function(req,res){
            console.log('loginApiController, get method');

            var loginObject ={
                result: "success"
            };

            res.set("Content-Type", "application/json");
            res.status(200).send(loginObject); // Result must be Json object.
        });
    };
})(module.exports);