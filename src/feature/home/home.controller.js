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
    this.creds = data;
    this.auth.validateURL(data.teamcityURL).then(response => {
            if(response.status === 200){
                this.auth.authenticate(this.creds)
                    .then( response => {
                        console.log('response from authenticate',response);
                    }).catch( error => {
                    console.log(error);
                    chrome.notifications.create(fetchError);
                });
            } else {
                chrome.notifications.create(InValidURL);
                return false;
            }
            }).catch(eror => {
            console.log(eror);
            chrome.notifications.create(fetchError);
        });
    }
}



HomeController.$inject = ['$scope','authentication'];