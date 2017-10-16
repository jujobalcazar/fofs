/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function ForgotPasswordCodeController($scope, $http, $location) {
        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

        var username = undefined;
        var loadUser = () =>{
            username = localStorage.getItem('username');
        }

        $scope.submitForgotPasswordCode = () => {
            var userData = {
                Username : username,
                Pool : userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            // cognitoUser.confirmPassword(verificationCode, newPassword, this);
            cognitoUser.confirmPassword($scope.ForgotPasswordCode.code, $scope.ForgotPasswordCode.newpassword, {
                onSuccess: function (result) {
                    alert("Your password has been changed. Please login!");
                    // Send toke to API. To validate it!
                    // Then redirect
                    // $location.path("/dashboard");
                    // $scope.$apply();

                    $location.path("/login");
                    $scope.$apply();
                },

                onFailure: function(err) {
                    alert(err);
                }

            });
        }

        loadUser();

    }

    angular.module("mainApp").controller("ForgotPasswordCodeController", ForgotPasswordCodeController);

})();