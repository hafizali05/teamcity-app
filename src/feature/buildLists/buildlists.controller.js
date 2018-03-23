export default class BuildListsController {
    constructor(
        $scope,
        authentication,
        build,
        $state,
        $rootScope
    ){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.auth = authentication;
        this.build = build;
        this.$state = $state;
        this.$scope.buildlist = null;                     
    }
    $onInit() {
        // this.$http
        this.build.showbuild()
            .then((response)=>{
                this.$scope.buildlist = response;
            })
            .catch(error => {
                console.log('error from show show build',error);
                return error;
            })            
    }    

}
BuildListsController.$inject = ['$scope','authentication','build','$state','$rootScope'];