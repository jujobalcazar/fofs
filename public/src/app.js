/**
 * Created by BALJUA on 20/09/2017.
 */
(function (){
    // All dependencies has to be added to the module
    var app = angular.module("mainApp", ['ngRoute', 'ngCookies']);

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
            .when("/forgotpassword", {
                templateUrl: "/src/components/forgotpassword/forgotpassword.html",
                controller: "ForgotPasswordController"
            })
            .when("/forgotpasswordcode", {
                templateUrl: "/src/components/forgotpasswordCode/forgotpasswordcode.html",
                controller: "ForgotPasswordCodeController"
            })
            .when("/dashboard", {
                templateUrl: "/src/components/dashboard/dashboard.html",
                controller: "DashboardController"
            })
            .otherwise({redirectTo: "/login"});

    });
}) ();