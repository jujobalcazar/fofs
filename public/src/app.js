/**
 * Created by BALJUA on 20/09/2017.
 */
(function (){
    var app = angular.module("mainApp", ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/src/components/login/login.html",
                controller: "LoginController"
            })
            .when("/signup", {
                templateUrl: "/src/components/signup/signup.html",
                controller: "SignUpController"
            })
            .when("/signupcode", {
                templateUrl: "/src/components/signupCode/signupcode.html",
                controller: "SignUpCodeController"
            })
            .otherwise({redirectTo: "/login"});

    });
}) ();