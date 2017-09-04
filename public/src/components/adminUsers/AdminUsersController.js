/**
 * Created by BALJUA on 02/09/2017.
 */
(function () {
    function AdminUsersController($scope, $http, $location) {  //$routeParams, service from ngroute module.

        // Methods
        $scope.newUser = function(){
            $location.path("/admin/user/");
        }

        $scope.openUser = function() {
            $location.path("/admin/user/" + "598905e51bd2ae3ad869c812");
        }

    }

    angular.module("mainAdminApp").controller("AdminUsersController", AdminUsersController);

})();