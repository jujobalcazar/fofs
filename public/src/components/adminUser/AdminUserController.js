/**
 * Created by BALJUA on 20/08/2017.
 */
(function () {
    function AdminUserController($scope, $http, $location, $routeParams) {  //$routeParams, service from ngroute module.
        // Properties
        var currentId = $routeParams.id;
        $scope.msg = "coming from angular";

        // Methods
        $scope.goback = function(){
            $location.path("/admin/users");
        }

        var loadInfo = function () {
            $http.get("/api/user/" + currentId)
                .then(function(response) {

                    var user = {
                        name: response.data.name,
                        email: response.data.email,
                        age: parseInt(response.data.age),
                        status: response.data.status.toString()
                    };

                    $scope.User = user;
                });
        };

        if(currentId != undefined){
            loadInfo();
        }
    }

    angular.module("mainAdminApp").controller("AdminUserController", AdminUserController);

})();