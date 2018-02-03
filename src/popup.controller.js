export default class PopupController {
    constructor($scope,authentication,$rootScope){
        console.log('$rootScope popup controller',$rootScope);
        $scope.$watch('$root.loggedIn',function(){
            console.log('when logged in event',$rootScope.loggedIn);
            $scope.loggedIn = $rootScope.loggedIn;
        })
    }
}
PopupController.$inject = ['$scope','authentication','$rootScope'];