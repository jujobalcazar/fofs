/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function LoginController($scope, $http, $location) {
        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

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
                    console.log('access token + ' + result.getAccessToken().getJwtToken());

                    // Send toke to API. To validate it!
                    // Then redirect
                    // $location.path("/dashboard");
                    // $scope.$apply();

                    $location.path("/dashboard");
                    $scope.$apply();
                },

                onFailure: function(err) {
                    alert(err);
                },

            });
        }
    }

    angular.module("mainApp").controller("LoginController", LoginController);

})();