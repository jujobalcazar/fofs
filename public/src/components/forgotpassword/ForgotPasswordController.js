/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function ForgotPasswordController($scope, $http, $location) {
        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

        $scope.submitForgotPassword = () => {
            var userData = {
                Username : $scope.ForgotPassword.email.replace("@", "_"),
                Pool : userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.forgotPassword({
                onSuccess: function (data) {
                    // successfully initiated reset password request
                    console.log('CodeDeliveryData from forgotPassword: ' + data);
                    alert("A new code has been sent to your inbox");

                    $location.path("/forgotpasswordcode");
                    $scope.$apply();
                },
                onFailure: function(err) {
                    alert(err);
                }

                // We need a new Controller that ask for verification code and new password!!
                //Optional automatic callback
                /*inputVerificationCode: function(data) {
                    console.log('Code sent to: ' + data);
                    var verificationCode = prompt('Please input verification code ' ,'');
                    var newPassword = prompt('Enter new password ' ,'');
                    cognitoUser.confirmPassword(verificationCode, newPassword, this);
                }*/
            });
        }

    }

    angular.module("mainApp").controller("ForgotPasswordController", ForgotPasswordController);

})();