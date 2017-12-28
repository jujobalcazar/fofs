(function(controllers){

    // These 2 controllers "home and login" are not used by the Angular application.
    // They are keep just to show how node && express return views to the browser
	var homeController = require("./homeController.js");
	var loginController = require("./loginController.js");
	
	//Admin controllers
	// var adminUsersController = require("./admin/adminUsersController.js");
    // var adminUserController = require("./admin/adminUserController.js");

    //Api controllers
    var loginApiController = require("./api/loginApiController.js");
	var usersApiController = require("./api/usersApiController.js");
    var userApiController = require("./api/userApiController.js");
    var postApiController = require("./api/postApiController.js");
    var adminLoginApiController = require("./api/adminLoginApiController.js");
	
	controllers.init = function(app){
		homeController.init(app);
		loginController.init(app);

        loginApiController.init(app);
        usersApiController.init(app);
        userApiController.init(app);
        postApiController.init(app);
        adminLoginApiController.init(app);
	};
	
})(module.exports);