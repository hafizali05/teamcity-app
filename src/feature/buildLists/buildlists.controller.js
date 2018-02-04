export default class BuildListsController {
    constructor($scope,authentication,$state,$rootScope){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.auth = authentication;
        this.$state = $state;        
    }

}
BuildListsController.$inject = ['$scope','authentication','$state','$rootScope'];