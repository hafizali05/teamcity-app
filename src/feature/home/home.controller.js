export default class HomeController {
    constructor($scope,authentication) {
        this.auth = authentication;
    }
    randomName(data) {
        this.auth.validateURL(data.teamcityURL)
            .then(function (data) {
                console.log(data);
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