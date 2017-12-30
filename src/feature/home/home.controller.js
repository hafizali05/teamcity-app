// import authentication from '../../services/authentication.service';
export default class HomeController {
    constructor(authentication) {
        this.auth = authentication;
    }
    randomName() {
        console.log('auth this',this);
    }
}



HomeController.$inject = ['$scope','authentication'];