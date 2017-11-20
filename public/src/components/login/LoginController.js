/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function LoginController($scope, $http, $location, $cookies, ConstantService) { //

        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(ConstantService.poolData);

        $scope.submitLogin = () =>{
            // 1. Validate email and PW with AWS cognito.
            var authenticationData = {
                Username : $scope.Login.email.replace("@", "_"),
                Password : $scope.Login.password
            };
            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

            var userData = {
                Username : $scope.Login.email.replace("@", "_"),
                Pool : userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('login token + ' + result.getAccessToken().getJwtToken()); // getAccessToken()

                    // We have to install npm cookies on Angular to make it work !!
                    // https://www.npmjs.com/package/angular-cookies

                    $cookies.put("cognito_accesstoken", result.getAccessToken().getJwtToken());
                    $cookies.put("cognito_idToken", result.getIdToken().getJwtToken());
                    // $cookies.put("cognito_refreshToken", result.getRefreshToken().getJwtToken());


                    // Send toke to API. To validate it!
                    $http({
                        method: "POST",
                        url: "/api/login/",
                        headers: {
                            accesstoken: result.getAccessToken().getJwtToken() //$cookies.get("ClientAccessToken")
                        }
                    }).then(
                        function success(response) {
                            // Authenticated. From now on, every request has to pass the Cognito acess token ON the Header.
                            $location.path("/dashboard");
                            $scope.$apply();
                        },
                        function error(err) {
                            console.log(err);
                        }
                    );

                },

                onFailure: function(err) {
                    alert(err);
                },

            });
        }
    }

    angular.module("mainApp").controller("LoginController", ['$scope', '$http', '$location', '$cookies', 'ConstantService', LoginController]); //

})();