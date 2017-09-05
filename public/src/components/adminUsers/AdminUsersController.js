/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function AdminUsersController($scope, $http, $location) {  //$routeParams, service from ngroute module.
        $scope.currentView = "All Users";

        // Methods
        $scope.newUser = () => {
            $location.path("/admin/user/");
        }

        $scope.openUser = (userId) => {
            $location.path("/admin/user/" + userId);
        }

        $scope.showStatus = (x) => {
            if(x == 1){
                return "enabled";
            }
            return "disabled";
        }

        $scope.showPosts = (x) => {
            return (x ? x.length : 0);
        }

        $scope.deleteUser = (userId) => {
            $http.delete("/api/user/" + userId)
                .then(function(response) {
                    alert("User was deleted succesfully");
                    $location.path("/admin/users/");
                });
        }

        let loadInfo = () => {
            $http.get("/api/users/")
                .then(function(response) {
                    $scope.Users = response.data;
                });
        };

        loadInfo();
    }

    angular.module("mainAdminApp").controller("AdminUsersController", AdminUsersController);

})();