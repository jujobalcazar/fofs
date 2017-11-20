/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function SignUpController($scope, $http, $location, ConstantService) {

        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(ConstantService.poolData);
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

                // 2. Create User.
                var user ={
                    name : $scope.Signup.fname + " " + $scope.Signup.lname,
                    email: $scope.Signup.email,
                    age: $scope.Signup.age,
                    status: "0"
                };

                $http.post("/api/user/", JSON.stringify(user))
                    .then(function(response) {
                        localStorage.setItem('usermongo', response.data._id);
                        $location.path("/signupcode");
                        $scope.$apply();
                    }, function (response) {
                        alert("Error: " + response.data);
                    });

            });
        }
    }

    angular.module("mainApp").controller("SignUpController", ['$scope', '$http', '$location', 'ConstantService', SignUpController]);

})();