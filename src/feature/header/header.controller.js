export default class HeaderController {
	constructor($scope,$rootScope,$state){
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$state = $state;
		$scope.selectedProject = null;        
		$scope.projects = $rootScope.projects;
	}
	onChange(value){
		this.$scope.selectedProject = this.$scope.projects[value].name;
	} 
	logout() {     
		chrome.storage.local.remove(["teamcity"],(error)=>{
			if (!error) {
				this.$rootScope.loggedIn = false;                    
				this.$state.go('home');                              
			} else {
				this.$rootScope.loggedIn = false;                    
				throw new Error(error);                    
			}
		});
           
	}    
}
