/**
 * Created by BALJUA on 20/08/2017.
 */
(function (){
    var adminApp = angular.module("mainAdminApp", ['ngRoute']);

    adminApp.config(function($routeProvider) {
        $routeProvider
            .when("/admin/users", {
                templateUrl: "/src/components/adminUsers/users.html",
                controller: "AdminUsersController"
            })
            .when("/admin/user", {
                templateUrl: "/src/components/adminUser/user.html",
                controller: "AdminUserController"
            })
            .when("/admin/user/:id", {
                templateUrl: "/src/components/adminUser/user.html",
                controller: "AdminUserController"
            })
            .otherwise({redirectTo: "/admin/users"});

    });
}) ();