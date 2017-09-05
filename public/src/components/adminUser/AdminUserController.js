/**
 * Created by BALJUA on 20/08/2017.
 */
(function () {
    function AdminUserController($scope, $http, $location, $routeParams) {  //$routeParams, service from ngroute module.
        // Properties
        let currentId = $routeParams.id;

        $scope.showPosts = false;

        // Methods
        $scope.goback = () => {
            $location.path("/admin/users");
        }

        // Post User
        $scope.submitUser = () => {

            if(userIsValid() == false){
                return;
            }

            if(currentId != undefined){
                // Update mode
                $http.post("/api/user/" + currentId, JSON.stringify($scope.User))
                    .then(function(response) {
                        alert("User was updated succesfully");
                    }, function (response) {
                        alert("Error: " + response.data);
                    });
            }
            else{
                // Create Mode
                $http.post("/api/user/", JSON.stringify($scope.User))
                    .then(function(response) {
                        alert("User was created succesfully");
                        $location.path("/admin/user/" + response.data._id);
                    }, function (response) {
                        alert("Error: " + response.data);
                    });
            }
        }

        var userIsValid = () => {
            if($scope.User == undefined){
                alert("User form is not complete");
                return false;
            }
            else if($scope.User.name == undefined || $scope.User.name == ""){
                alert("User name is required");
                return false;
            }
            else if($scope.User.email == undefined || $scope.User.email == ""){
                alert("User email is required");
                return false;
            }
            else if($scope.User.age == undefined || $scope.User.age == ""){
                alert("User age is required");
                return false;
            }
            else if($scope.User.status == undefined || $scope.User.status == ""){
                alert("User status is required");
                return false;
            }
            return true;
        }

        var loadInfo = () => {
            $http.get("/api/user/" + currentId)
                .then(function(response) {

                    var user = {
                        name: response.data.name,
                        email: response.data.email,
                        age: parseInt(response.data.age),
                        status: response.data.status.toString(),
                        posts:response.data.posts
                    };

                    $scope.User = user;

                    if(user.posts != undefined && user.posts.length > 0){
                        $scope.showPosts = true;
                    }
                });
        };

        if(currentId != undefined){
            loadInfo();
        }
    }

    angular.module("mainAdminApp").controller("AdminUserController", AdminUserController);

})();