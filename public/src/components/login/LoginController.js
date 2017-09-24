/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function LoginController($scope, $http, $location) {


        $scope.submitLogin = () =>{
            // 1. Validate email and PW with AWS cognito.

            // 2. Send token to application. To validate it.
            $http.post("/api/adminlogin/", JSON.stringify($scope.Login))
                .then(function(response) {
                    $location.path("/admin/users/");
                }, function (response) {
                    alert("Error: " + response.data);
                    console.log(response.data);
                });
        }
    }

    angular.module("mainApp").controller("LoginController", LoginController);

})();