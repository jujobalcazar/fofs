/**
 * Created by BALJUA on 20/08/2017.
 */
(function () {
    function AdminUserPostController($scope, $http, $location, $routeParams) {
        let postid = $routeParams.postid;

        $scope.Post = {
            userid: $routeParams.id
        }

        $scope.goback = () => {
            $location.path("/admin/user/" + $scope.Post.userid + "/posts");
        }

        $scope.linkProfile = () => {
            $location.path("/admin/user/" + $scope.Post.userid);
        }

        $scope.linkContacts = () => {
            //$location.path("/admin/usercontacts/" + $scope.Post.userid);
            $location.path("/admin/user/" + $scope.Post.userid);
        }

        $scope.submitPost = () => {

            if(postid != undefined){
                // Update mode
                $http.post("/api/post/" + postid, JSON.stringify($scope.Post))
                    .then(function (response) {
                        alert("Post was updated succesfully");
                        $location.path("/admin/user/" + $scope.Post.userid + "/posts");
                    }, function (response) {
                        alert("Error: " + response.data);
                    });
            }
            else {
                // create object
                $http.post("/api/post/", JSON.stringify($scope.Post))
                    .then(function (response) {
                        alert("Post was created succesfully");
                        $location.path("/admin/user/" + $scope.Post.userid + "/posts");
                    }, function (response) {
                        alert("Error: " + response.data);
                    });
            }
        }

        let loadInfo = () => {
            $http.get("/api/post/" + postid + "?userId=" + $scope.Post.userid)
                .then(function(response) {

                    var post = {
                        userid: response.data._id,
                        text: response.data.posts[0].text,
                        video: response.data.posts[0].video,
                        image: response.data.posts[0].image
                    };

                    $scope.Post = post;
                });
        };


        if(postid != undefined){
            loadInfo();
        }
    }

    angular.module("mainAdminApp").controller("AdminUserPostController", AdminUserPostController);

})();