export default class HomeController {
    constructor($scope,authentication) {
        this.auth = authentication;
    }
    randomName(data) {
        console.log(chrome)
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
        // chrome.storage.sync.

        function callback() {
            console.log('working notification');
        }
        //
        this.auth.validateURL(data.teamcityURL)
            .then(function (response) {
                if(response.status === 200){
                    chrome.notifications.create(ValidURL);
                } else {
                    chrome.notifications.create(InValidURL);
                }
            }).catch(function (eror) {
                console.log(eror);
            })




        // console.log('res from randomName',res);
        // if(res){
        //     console.log('authenticated');
        // } else {
        //     console.log('not authenticated');
        // }

    }
}



HomeController.$inject = ['$scope','authentication'];