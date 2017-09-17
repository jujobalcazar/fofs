/**
 * Created by BALJUA on 20/08/2017.
 */
(function () {
    function AdminUserController($scope, $http, $location, $routeParams) {  //$routeParams, service from ngroute module.
        // Properties
        let userId = $routeParams.id;

        $scope.showPosts = false;

        // Methods
        $scope.goback = () => {
            $location.path("/admin/users/");
        }

        $scope.linkPosts = () => {
            $location.path("/admin/user/" + userId + "/posts");
        }

        $scope.linkContacts = () => {
            //$location.path("/admin/usercontacts/" + userId);
            $location.path("/admin/user/" + userId);
        }

        // Post User
        $scope.submitUser = () => {

            if(userIsValid() == false){
                return;
            }

            if(userId != undefined){
                // Update mode
                $http.post("/api/user/" + userId, JSON.stringify($scope.User))
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

        let userIsValid = () => {
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

        let loadInfo = () => {
            $http.get("/api/user/" + userId)
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

        if(userId != undefined){
            loadInfo();
        }
    }

    angular.module("mainAdminApp").controller("AdminUserController", AdminUserController);

})();