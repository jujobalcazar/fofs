/**
 * Created by BALJUA on 18/08/2017.
 */

(function(postApiController){

    var data = require("../../data");

    postApiController.init = function(app){

        app.get("/api/post/:id/",function(req,res){

            data.getPost(req.params.id, req.query, function(err, result){
                if(err){
                    res.send(400, err);
                }else{
                    // Here we can rework the result.
                    res.set("Content-Type", "application/json");
                    res.send(result);
                }
            });
        });

        // *************** POST: Create post ***************
        app.post("/api/post/",function(req,res){

            var userId = req.body.userid;
            var thePost = {
                text: req.body.text,
                video: req.body.video,
                image: req.body.image
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

        // *************** POST: Update post ***************
        app.post("/api/post/:id",function(req,res){
            var userId = req.body.userid;
            var thePost = {
                _id: req.params.id,
                text: req.body.text,
                video: req.body.video,
                image: req.body.image
            };

            console.log("update mode!!");
            data.updatePost(userId, thePost, function(err){
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