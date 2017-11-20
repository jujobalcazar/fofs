/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function SignUpCodeController($scope, $http, $location, ConstantService) {
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(ConstantService.poolData);

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

                // 2. Submit to internal API.
                var userId = localStorage.getItem('usermongo');

                // Get the user and update it
                $http.get("/api/user/" + userId)
                    .then(function(response) {

                        var user = {
                            name: response.data.name,
                            email: response.data.email,
                            age: parseInt(response.data.age),
                            status: "1"
                        };

                        $http.post("/api/user/" + userId, JSON.stringify(user))
                            .then(function(response) {
                                localStorage.removeItem('usermongo');
                                alert("Your account has been activated. Please login.");

                                $location.path("/login");
                                $scope.$apply();
                            }, function (response) {
                                alert("Error: " + response.data);
                            });

                    });

            });
        }

        loadUser();
    }

    angular.module("mainApp").controller("SignUpCodeController", ['$scope', '$http', '$location', 'ConstantService', SignUpCodeController]);

})();