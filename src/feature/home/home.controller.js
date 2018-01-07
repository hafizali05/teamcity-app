
export default class HomeController {
    constructor($scope,authentication,$state){
        this.auth = authentication;
        this.$state = $state;
    }

    randomName(data) {
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
    this.auth.validateURL(data.teamcityURL).then(response => {
            if(response.status === 200){
                console.log('passed validate url')
                this.auth.authenticate(this.creds)
                    .then( response => {
                        console.log('response from controller',response);
                        return false;
                        if(response.status === 200){
                            console.log('response from this.auth',response);
                            chrome.notifications.create(successLogin);
                            let credentials = {
                                server: data.teamcityURL,
                                logins: window.btoa(data.username + ":" + data.password)
                            };
                            chrome.storage.local.set({'credentials':credentials});
                            chrome.storage.local.get('credentials',result=>{
                                console.log('storage data:',result);
                            })
                            this.$state.go('settings');                            
                        }
                    }).catch( error => {
                    console.log('error from home controller',error);
                    chrome.notifications.create(fetchError);
                });
            } else {
                console.log('Invalid URL');                
                chrome.notifications.create(InValidURL);
            }
            }).catch(error => {
                console.log(error);
                return error;                
            chrome.notifications.create(fetchError);
        });
    }
}

HomeController.$inject = ['$scope','authentication','$state'];