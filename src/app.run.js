export default function run($rootScope, $transitions, $state, $cookies, $http,authentication){
    console.log('authentication:',authentication);
    chrome.storage.sync.get("teamcityURL", function(items) {
        if (!chrome.runtime.error) {
          console.log('data from chrome local storage',items);
        }
    });
        
    $state.go('home');   
}

run.$inject = ['$rootScope', '$transitions', '$state', '$cookies', '$http','authentication'];