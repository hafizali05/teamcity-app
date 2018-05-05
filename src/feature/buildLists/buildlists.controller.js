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
		const href = '/httpAuth/app/rest/buildTypes';
		this.$rootScope.$on('filterProject',(event, data)=>{
			this.changeProject(data.href);
		});
		chromeStorage.get('teamcity', (ele,error) => {
			if(!error){
				this.populateBuilds(ele,href);
			} else {
				throw new Error(error);
			}
		});
	}
	changeProject(href){
		const chromeStorage = chrome.storage.local;
		chromeStorage.get('teamcity', (ele,error) => {
			if(!error){
				this.populateBuilds(ele,href);
			} else {
				throw new Error(error);
			}
		});		
	}
	populateBuilds (ele,href) {
		const url = `${ele.teamcity.teamcityURL}${href}`;
		this.$http.get(url)
			.then((response) => {
				this.getUserDataToUpdateBuilds(response.data.buildType || response.data.buildTypes.buildType);
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
		// console.log('filter build');	s	
		if(builds.length < 1){
			throw new Error('no builds available to show');
		}            
		if(bids.length !== 0){
			builds.map(b=>{
				return bids.includes(b.id) ? b.watched = true : b.watched =  false;
			});
			// console.log(builds);
			this.$scope.allbuilds = builds;
			this.$scope.$apply();
		} else {
			builds.map(b => b.watched = false);      
			this.$scope.allbuilds = builds;            
			this.$scope.$apply();            
		}     
	}    
	startWatch (data) {
		// console.log('data:',data);
		chrome.storage.local.get('teamcity', (userdata, error) => {
			var bids = userdata.teamcity.buildIds;
			if(!bids.includes(data)){ // true if build doesnt have the buildId
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
	setData(userdata){
		chrome.storage.local.set({
			teamcity: userdata.teamcity,
		}, (error) => {
			if(error){
				throw new Error(error);
			}
		});
	}
	stopWatch(data){
		// console.log(data);
		chrome.storage.local.get('teamcity', (userdata, error) => {
			if(!error){
				var bids = userdata.teamcity.buildIds;
				var index = bids.indexOf(data);
				if (index >= 0) {
					bids.splice( index, 1 );
				}
				this.setData(userdata);
			}else {
				throw new Error(error);
			}         
		});        
	}
	onChanged () {
		chrome.storage.onChanged.addListener((changes) => {
			var newValLen = changes && changes.teamcity && changes.teamcity.newValue && changes.teamcity.newValue.buildIds && changes.teamcity.newValue.buildIds.length;
			var oldValLen = changes && changes.teamcity && changes.teamcity.oldValue && changes.teamcity.oldValue.buildIds && changes.teamcity.oldValue.buildIds.length;                                                    
			if(newValLen > oldValLen || oldValLen > newValLen){
				this.getUserDataToUpdateBuilds(this.$scope.allbuilds);
			}
		});
	}
}
