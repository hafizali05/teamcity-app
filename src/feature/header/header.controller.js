export default class HeaderController {
    constructor($scope,$rootScope,$state){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
        $scope.selectedProject = null;        
        $scope.projects = $rootScope.projects;
        // this.$scope.project_model = $scope.projects[0];
    }
    onChange(value){
        this.$scope.selectedProject = this.$scope.projects[value].name;
        console.log('working on change',this.$scope);
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
