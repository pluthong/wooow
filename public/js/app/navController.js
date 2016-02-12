
/* Nav Controller */

angular.module('navMod', []).controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.getClass = function (action) {

        var protocol = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var url = "";

        
        if (port > 0)
        {
            url = protocol + "://" + host + ":" + port;
        }
        else
        { 
            url = protocol + "://" + host;
        }

        

        var absurl = $location.absUrl();
        var substr = absurl.substr(url.length, action.length);

        if (substr === action) {
            if (substr == '/' && url.length + 2 < absurl.length)
                return ''
            return 'active';
        } else {
            return '';
        }

    }
}]);