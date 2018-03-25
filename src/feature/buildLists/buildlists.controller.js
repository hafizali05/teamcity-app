export default class BuildListsController {
	constructor (
		$scope,
		$state,
		$rootScope,
		$http
	) {
		this.$scope = $scope;
		this.$state = $state;
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.$scope.allbuilds = null;
		this.$scope.watched = null;
	}
	$onInit () {
		this.onChanged();
		const chromeStorage = chrome.storage.local;
		chromeStorage.get('teamcity', (ele,error) => {
			if(!error){
				this.populateBuilds(ele);
			} else {
				throw new Error(error);
			}
		});
	}
	populateBuilds (ele) {
		const url = `${ele.teamcity.teamcityURL}/httpAuth/app/rest/buildTypes`;
		this.$http.get(url)
			.then((response) => {
				this.getUserDataToUpdateBuilds(response.data.buildType);
			}).catch((error)=>{
				throw new Error(error);
			});
	}

	getUserDataToUpdateBuilds (builds) {
		chrome.storage.local.get('teamcity', (userdata) => {
			if (!chrome.runtime.error) {
				this.filterbuilds(userdata.teamcity.buildIds,builds);
			} else {
				throw new Error(chrome.runtime.error);
			}
		});
	}

	filterbuilds(bids,builds){
		
		if(bids.length != 0){
			bids.forEach((id) => {
				builds.map((build) => {
					if (build.id === id) {
						build.watched = true;
					}
				});
			});
			this.$scope.allbuilds = builds;
			this.$scope.$apply();
		} else {      
			this.$scope.allbuilds = builds;            
			this.$scope.$apply();            
		}     
	}    
	startWatch (data) {
		// console.log('data:',data);
		chrome.storage.local.get('teamcity', (userdata, error) => {
			var bids = userdata.teamcity.buildIds;
			if(!bids.includes(data)){
				if (!error) {	
					if (Array.isArray(bids)) {
						bids.push(data);
						chrome.storage.local.set({
							teamcity: userdata.teamcity,
						}, (error) => {
							if(error){
								throw new Error(error);
							}
						});
					} else {
						bids = [data];
						chrome.storage.local.set(userdata, (error) => {
							if (error) {
								throw new Error(error);
							}
						});
					}
				} else {
					throw new Error(error);
				}
			}
		});
	}

	onChanged () {
		chrome.storage.onChanged.addListener((changes) => {
			if(changes.newValue){
				var builds = this.$scope.allbuilds;
				var newValLen = changes.newValue.buildIds.length;
				var oldValLen = changes.oldValue.buildIds.length;
				if(newValLen > oldValLen){
					this.getUserDataToUpdateBuilds(builds);
				}
			}  
		});
	}
}
