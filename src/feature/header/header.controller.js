export default class HeaderController {
    constructor($scope,$rootScope,$state){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
        console.log('header controller');
    }
    logout() {
        // console.log('working',$rootScope);
        console.log('working with this ',this.$rootScope);        
        this.$rootScope.loggedIn = false;                    
        this.$state.go('home');                    
    }    
}

HeaderController.$inject = ['$scope','$rootScope','$state'];