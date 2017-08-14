(function(adminUserController){

    var data = require("../../data");

    adminUserController.init = function(app){

        // *************** GET: Create user ***************
        app.get("/admin/user/",function(req,res){
            var user = {};

            // Error or not we render the page with err and results.
            res.render("admin/user",
                {
                    title: "Admin | Create new user",
                    error: null,
                    user: user //"The users list"
                });

        });

        // *************** POST: Create user ***************
        app.post("/admin/user/", function (req,res) {
            var user = {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                status: req.body.status,
                posts:[]
            };

            if(req.body.id == 0){
                // Create
                console.log("create mode!!");
                data.createNewUser(user, function(err){
                    if(err){
                        console.log(err);
                        res.redirect("/admin/users/");
                    }
                    else{
                        res.redirect("/admin/user/"+user._id);
                    }
                });
            }
            else{
                //update
                console.log("update mode!!");
                user._id = req.body.id;
                data.updateUser(user, function(err){
                    if(err){
                        console.log(err);
                        res.redirect("/admin/users/");
                    }
                    else{
                        res.redirect("/admin/user/"+user._id);
                    }
                });
            }
        });

        // *************** GET: Edit user ***************
        app.get("/admin/user/:id",function(req,res){

            data.getUser(req.params.id, function(err,result){
                // Error or not we render the page with err and results.
                res.render("admin/user",
                    {
                        title: "Admin | User",
                        error: err,
                        user: result //"The users list"
                    });
            });
        });


    };

})(module.exports);