/**
 * Created by BALJUA on 20/08/2017.
 */
(function (){
    var adminApp = angular.module("mainAdminApp", ['ngRoute']);

    adminApp.config(function($routeProvider) {
        $routeProvider
            .when("/admin/login", {
                templateUrl: "/src/components/adminLogin/login.html",
                controller: "AdminLoginController"
            })
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
            .when("/admin/user/:id/posts", {
                templateUrl: "/src/components/adminUserPosts/userposts.html",
                controller: "AdminUserPostsController"
            })
            .when("/admin/user/:id/post", {
                templateUrl: "/src/components/adminUserPost/userpost.html",
                controller: "AdminUserPostController"
            })
            .when("/admin/user/:id/post/:postid", {
                templateUrl: "/src/components/adminUserPost/userpost.html",
                controller: "AdminUserPostController"
            })
            .otherwise({redirectTo: "/admin/login"});

    });
}) ();