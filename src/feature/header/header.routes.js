routes.$inject = ['$stateProvider'];

import header from './header.html'

export default function routes($stateProvider) {
    $stateProvider
        .state('header', {
            template: header,
            controller: 'HeaderController',
            controllerAs : 'header'
        });
}