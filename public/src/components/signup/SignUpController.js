/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function SignUpController($scope, $http, $location) {
        var CognitoUserPool = AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool;

        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var attributeList = [];


        $scope.submitSignUp = () =>{
            // 1. Validate email and PW with AWS cognito.
            var dataEmail = {
                Name : 'email',
                Value : $scope.Signup.email
            };

            var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
            attributeList.push(attributeEmail);

            // 1. Submit to Cognito
            userPool.signUp($scope.Signup.email.replace("@", "_"), $scope.Signup.password, attributeList, null, function(err, result){
                if (err) {
                    alert(err);
                    return;
                }
                var cognitoUser = result.user;
                localStorage.setItem('username', cognitoUser.getUsername());

                $location.path("/signupcode");
                $scope.$apply();
            });

            // 2. Submit to internal API.
        }
    }

    angular.module("mainApp").controller("SignUpController", SignUpController);

})();