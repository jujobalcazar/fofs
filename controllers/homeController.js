(function(homeController){
	
	homeController.init = function(app){
		app.get("/home",function(req,res){
			res.render("index", {title: "Using Vash", body: "run you fool!"});
		});
	};
	
})(module.exports);