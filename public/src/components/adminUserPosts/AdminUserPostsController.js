/**
 * Created by BALJUA on 20/08/2017.
 */
(function () {
    function AdminUserPostsController($scope, $http, $location, $sce, $routeParams) {
        // Properties
        let userId = $routeParams.id;

        $scope.beautifyText = (text) => {
            return $sce.trustAsHtml( replaceAll(text, '\n', '<br />') );
        }

        $scope.linkNewPost = () => {
            $location.path("/admin/user/" + userId + "/post");
        }

        $scope.linkProfile = () => {
            $location.path("/admin/user/" + userId);
        }

        $scope.linkContacts = () => {
            //$location.path("/admin/usercontacts/" + userId);
            $location.path("/admin/user/" + userId );
        }

        $scope.openPost = (postId) =>{
            $location.path("/admin/user/" + userId + "/post/" + postId);
        }

        let loadInfo = () => {
            $http.get("/api/user/" + userId + "/?allposts=1")
                .then(function(response) {

                    var user = {
                        name: response.data.name,
                        email: response.data.email,
                        age: parseInt(response.data.age),
                        status: response.data.status.toString(),
                        posts:response.data.posts
                    };

                    $scope.User = user;
                });
        };

        loadInfo();


        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        function escapeRegExp(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

    }

    angular.module("mainAdminApp").controller("AdminUserPostsController", AdminUserPostsController);

})();