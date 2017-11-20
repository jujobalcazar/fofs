/**
 * Created by BALJUA on 17/10/2017.
 */

(function() {
    var ConstantService = function() {

        var poolData = {
            UserPoolId : 'us-west-2_Sygc95OQO', // Your user pool id here
            ClientId : '2f0pdsvug1e0d3ihm9863868u6' // Your client id here
        };

        // Here the API is returned.
        return {
            poolData: poolData
        };

    }

    angular.module("mainApp").service("ConstantService", ConstantService);

}());