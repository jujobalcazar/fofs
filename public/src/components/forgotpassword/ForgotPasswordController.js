/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function ForgotPasswordController($scope, $http, $location, ConstantService) {

        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(ConstantService.poolData);

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

            });
        }

    }

    angular.module("mainApp").controller("ForgotPasswordController", ['$scope', '$http', '$location', 'ConstantService', ForgotPasswordController]);

})();