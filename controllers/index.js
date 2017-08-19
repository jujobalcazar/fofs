(function(controllers){
	
	var homeController = require("./homeController.js");
	var loginController = require("./loginController.js");
	
	//Admin controllers
	var adminUsersController = require("./admin/adminUsersController.js");
    var adminUserController = require("./admin/adminUserController.js");

    //Api controllers
	var usersApiController = require("./api/usersApiController.js");
    var userApiController = require("./api/userApiController.js");
    var postApiController = require("./api/postApiController.js");
	
	controllers.init = function(app){
		homeController.init(app);
		loginController.init(app);
		
		adminUsersController.init(app);
        adminUserController.init(app);

        usersApiController.init(app);
        userApiController.init(app);
        postApiController.init(app);
	};
	
})(module.exports);