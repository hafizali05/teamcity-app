
export default class HomeController {
	constructor($scope,authentication,$state,$rootScope){
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.auth = authentication;
		this.$state = $state;
	}

	loginSubmit(data) {
		var ValidURL = {
			type : 'basic',                // type of notification we can change it in chrome developer tools
			iconUrl: 'icon-48.png',          // icon appear for limit
			title: 'Status',
			message: "dope! its working!",
		};

		var InValidURL = {
			type : 'basic',                // type of notification we can change it in chrome developer tools
			iconUrl: 'icon-48.png',          // icon appear for limit
			title: 'Status',
			message: "Fuck! get your fucking URL straight!",
		};

		var fetchError = {
			type : 'basic',                // type of notification we can change it in chrome developer tools
			iconUrl: 'icon-48.png',          // icon appear for limit
			title: 'ERROR',
			message: "fetch error",
		};

		var successLogin = {
			type: 'basic',
			iconUrl: 'icon-48.png',
			title: 'login successful',
			message: 'You are the man!successfully logged in',
		};
		this.creds = data;



		const teamcityURL = this.creds.teamcityURL;
		const username = this.creds.username;
		const buildIds = [];
		const authenticated = (response)=>{
			if(response && response.project && response.project.length > 1){
				this.$rootScope.loggedIn = true;
				this.$rootScope.projects = response.project;                
				this.$state.go('buildLists');
				chrome.notifications.create(successLogin);
				chrome.storage.local.set({ 
					"teamcity":{
						buildIds,
						teamcityURL,
						username,                        
					},
				}, function(error) {
					if (error) {
						throw new Error(error);
					}
				});                                                                   
			} else {
				chrome.notifications.create(fetchError);                                                                       
			}
		};

		const validateURL = (response)=>{
			if(response.status === 200){
				this.auth.authenticate(this.creds)
					.then(authenticated);
			} else {
				chrome.notifications.create(InValidURL);
				throw new Error(InValidURL);
			}            
		};



		this.auth.validateURL(data.teamcityURL)
			.then(validateURL)
			.catch(error => {
				chrome.notifications.create(fetchError);
				throw new Error(error);          
			});
	}
}
