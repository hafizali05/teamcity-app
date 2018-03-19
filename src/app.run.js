
export default function run($rootScope, $transitions, $state, $http,authentication){
    chrome.storage.sync.get("teamcity", function(info) {
        console.log('chrome storage:',chrome.runtime.error);
        if(!chrome.runtime.error){
            if(info.hasOwnProperty(['teamcity'])){                
                console.log('info:',info);
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
                        console.log(error);
                        return error;             
                    })
            } else {
                $rootScope.loggedIn = false;                                                            
                $state.go('home');
            }
        }
        $state.go('home');          
    });
        
 
}

run.$inject = ['$rootScope', '$transitions', '$state', '$http','authentication'];