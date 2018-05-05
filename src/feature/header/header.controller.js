export default class HeaderController {
	constructor($scope,$rootScope,$state){
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$state = $state;
		$scope.selectedProject = null;        
		// why do we have projects in rootscope?
		// because while loggin in and when app starts from app.run.js it loads projects in 
		// projects in rootscope
		$scope.projects = $rootScope.projects;
	}
	onChange(value){
		this.$scope.selectedProject = this.$scope.projects[value].name;
		this.$rootScope.$broadcast('filterProject',
			{
				href:this.$scope.projects[value].href,
			}
		);
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
