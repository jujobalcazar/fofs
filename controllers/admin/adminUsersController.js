(function(adminUsersController){
	
	var data = require("../../data");
	
	adminUsersController.init = function(app){
		app.get("/admin/users",function(req,res){
			
			data.getUsers(function(err,results){
				// Error or not we render the page with err and results.
				res.render("admin/users",
					{
						title: "Admin | Users List", 
						error: err,
						users: results //"The users list"
					});
			});
			
			
		});
	};
	
})(module.exports);