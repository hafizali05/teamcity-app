export default class HeaderController {
    constructor($scope,$rootScope,$state){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
    }
    logout() {     
        
        chrome.storage.sync.remove(["teamcity"],()=>{
            var error = chrome.runtime.lastError;
            if (!error) {
                    this.$rootScope.loggedIn = false;                    
                    this.$state.go('home');                              
                } else {
                    this.$rootScope.loggedIn = false;                    
                    console.error(error);                    
                }
           })
           
    }    
}

HeaderController.$inject = ['$scope','$rootScope','$state'];