import angular from 'angular';

class Authentication {
    constructor() {
        // this.names = ['John', 'Elisa', 'Mark', 'Annie'];
    }


    authenticate(){
        return 'authentication working'
    }

}

export default angular.module('services.auth', [])
    .service('authentication', Authentication)
    .name;