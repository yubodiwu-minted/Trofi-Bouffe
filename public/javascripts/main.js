var app = angular.module("TrofiBouffe", []);

app.controller("AppControl", function($scope, $location) {
    $scope.currentPath = $location.path();

    $scope.buttonClick = function() {
        console.log("button clicked");
        $location.path('users/new');
        $scope.$apply();
    }
});
