export default class HomeController {
    constructor($scope,authentication) {
        this.auth = authentication;
    }
    randomName() {
        console.log('auth this',this.auth.authenticate());

    }
}



HomeController.$inject = ['$scope','authentication'];