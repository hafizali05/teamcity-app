
export default function run($rootScope, $transitions, $state, $http,authentication){
	chrome.storage.local.get("teamcity", function(info,error) {
		if(!chrome.runtime.error){
			if(info.hasOwnProperty(['teamcity'])){                
				authentication.showProjects(info.teamcity)
					.then((response)=>{
						// console.log(response)
						if(response && response.count >= 0){
							$rootScope.projects = response.project;                                            
							$rootScope.loggedIn = true;                                            
							$state.go('buildLists');
						} else {
							$rootScope.loggedIn = false;                                                                        
							$state.go('home');                                       
						}
					})
					.catch((error)=>{
						$rootScope.loggedIn = false;                                                                    
						$state.go('home');               
						throw new Error(error);
					});
			} else {
				$rootScope.loggedIn = false;                                                            
				$state.go('home');
			}
		} else {
			$state.go('home');            
			throw new Error(error);
		}       
	});
}
