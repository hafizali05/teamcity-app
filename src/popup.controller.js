export default class PopupController {
    constructor($scope,authentication,$rootScope){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        console.log('$rootScope popup controller',$rootScope);
        $scope.$watch('$root.loggedIn',function(){
            $scope.loggedIn = $rootScope.loggedIn;
        });
        // $scope.logout = function(){
        //     $rootScope.loggedIn = false;                    
        //     $state.go('home');            
        // }        
    }
    logout() {
        console.log('working');
        // this.$rootScope.loggedIn = false;                    
        // this.$state.go('home');                    
    }
}
PopupController.$inject = ['$scope','authentication','$rootScope','$state'];