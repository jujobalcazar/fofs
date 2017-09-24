/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function SignUpCodeController($scope, $location) {
        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

        var username = undefined;
        var loadUser = () =>{
            username = localStorage.getItem('username');
        }

        $scope.submitCode = () =>{

            var userData = {
                Username : username,
                Pool : userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.confirmRegistration($scope.Signupcode.scode, true, function(err, result) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log('call result: ' + result);
                alert("Your account has been activated. Please login.");

                $location.path("/login");
                $scope.$apply();
            });
        }

        loadUser();
    }

    angular.module("mainApp").controller("SignUpCodeController", SignUpCodeController);

})();