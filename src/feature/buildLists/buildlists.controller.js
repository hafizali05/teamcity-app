export default class BuildListsController {
    constructor(
        $scope,
        $state,
        $http,
        $rootScope
    ){
        this.$scope = $scope;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$scope.buildlist = null;
        this.teamcity = null;        
    }
    $onInit() {
        const chromeStorage = chrome.storage.sync;
        chromeStorage.get('teamcity',(ele)=>{
            this.populateBuilds(ele);
        })        
    }
    populateBuilds(ele){
        console.log(ele);
        var url = `${ ele.teamcity.teamcityURL }/httpAuth/app/rest/builds`;
        this.$http.get(url)
            .then((response)=>{
                this.$scope.buildlist = response.data.build;
            })
    }
}