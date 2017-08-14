(function(controllers){
	
	var homeController = require("./homeController.js");
	var loginController = require("./loginController.js");
	
	//Admin controllers
	var adminUsersController = require("./admin/adminUsersController.js");
    var adminUserController = require("./admin/adminUserController.js");
	
	controllers.init = function(app){
		homeController.init(app);
		loginController.init(app);
		
		adminUsersController.init(app);
        adminUserController.init(app);
	};
	
})(module.exports);