(function(loginController){
	
	loginController.init = function(app){
		app.get("/login",function(req,res){
			res.render("index", {title: "Login", body: "Enter Username and password"});
		});
	};
	
})(module.exports);