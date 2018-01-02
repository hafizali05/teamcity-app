export default class HomeController {
    constructor($scope,authentication){
        this.auth = authentication;
    }
    origURL(data){

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
                this.auth.authenticate(this.creds)
                    .then( response => {
                        chrome.notifications.create(successLogin);                        
                    }).catch( error => {
                    chrome.notifications.create(fetchError);
                });
            } else {
                chrome.notifications.create(InValidURL);
            }
            }).catch(eror => {
            chrome.notifications.create(fetchError);
        });
    }
}



HomeController.$inject = ['$scope','authentication'];