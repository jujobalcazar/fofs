/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function AdminLoginController($scope, $http, $location) {
        /*var CognitoUserPool = AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool;

        var x = 5;

        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

        var attributeList = [];

        var dataEmail = {
            Name : 'email',
            Value : 'juan.lacoop@gmail.com'
        };

        var dataPhoneNumber = {
            Name : 'phone_number',
            Value : '+15555555555'
        };
        var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);

        var y = 5;*/

        /*userPool.signUp('juanlacoop1', 'TestTest123', attributeList, null, function(err, result){
            if (err) {
                alert(err);
                return;
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });*/

        $scope.submitLogin = () =>{
            $http.post("/api/adminlogin/", JSON.stringify($scope.Login))
                .then(function(response) {
                    $location.path("/admin/users/");
                }, function (response) {
                    alert("Error: " + response.data);
                    console.log(response.data);
                });
        }
    }

    angular.module("mainAdminApp").controller("AdminLoginController", AdminLoginController);

})();