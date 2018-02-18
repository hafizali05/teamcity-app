
export default class HomeController {
    constructor($scope,authentication,$state,$rootScope){
        // this.$scope;
        // this.$rootScope;
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
            message: "dope! its working!"
        };

        var InValidURL = {
            type : 'basic',                // type of notification we can change it in chrome developer tools
            iconUrl: 'icon-48.png',          // icon appear for limit
            title: 'Status',
            message: "Fuck! get your fucking URL straight!"
        };

        var fetchError = {
            type : 'basic',                // type of notification we can change it in chrome developer tools
            iconUrl: 'icon-48.png',          // icon appear for limit
            title: 'ERROR',
            message: "fetch error"
        };

        var successLogin = {
            type: 'basic',
            iconUrl: 'icon-48.png',
            title: 'login successful',
            message: 'You are the man!successfully logged in'
        };
        this.creds = data;



        let teamcityURL = this.creds.teamcityURL;
        let username = this.creds.username;
        const authenticated = (response)=>{
            if(response && response.project && response.project.length > 1){
                this.$rootScope.loggedIn = true;
                this.$state.go('buildLists');
                chrome.notifications.create(successLogin);
                chrome.storage.sync.set({ 
                    "teamcity":{
                        teamcityURL,
                        username                        
                    }
                 }, function() {
                    if (chrome.runtime.error) {
                      console.log("Runtime error.");
                    }
                });                                                                   
            } else {
                chrome.notifications.create(fetchError);                                                                       
            }
        }

        const validateURL = (response)=>{
            if(response.status === 200){
                this.auth.authenticate(this.creds)
                    .then(authenticated)
            } else {
                console.log('Invalid URL');                
                chrome.notifications.create(InValidURL);
            }            
        }



        this.auth.validateURL(data.teamcityURL)
            .then(validateURL)
            .catch(error => {
                    console.log(error);
                    chrome.notifications.create(fetchError);
                    return error;                
            });
    }
}

HomeController.$inject = ['$scope','authentication','$state','$rootScope'];