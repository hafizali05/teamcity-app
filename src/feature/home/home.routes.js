routes.$inject = ['$stateProvider'];

import home from './home.html';
import header from '../header/header.html';

export default function routes($stateProvider) {
    $stateProvider
        .state('home', {
            views: {
                "": {
                    template: home,
                    controller: 'HomeController',
                    controllerAs : 'home'                    
                },
                "header": {
                    template: header,
                    controller: 'HeaderController',
                    controllerAs : 'header'                    
                }
            }  
        });
}




