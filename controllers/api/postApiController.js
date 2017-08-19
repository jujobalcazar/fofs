/**
 * Created by BALJUA on 18/08/2017.
 */

(function(postApiController){

    var data = require("../../data");

    postApiController.init = function(app){

        // *************** POST: Create post ***************
        app.post("/api/post/",function(req,res){

            var userId = req.body.userid;
            var thePost = {
                text: req.body.text,
                video: req.body.video
            };

            console.log("create mode!!");
            data.addPost(userId, thePost, function(err){
                if(err){
                    console.log(err);
                    res.status(400).send(err); // res.send(400, err);
                }
                else{
                    res.set("Content-Type", "application/json");
                    res.status(201).send(thePost);
                }
            });

        });


    };

})(module.exports);