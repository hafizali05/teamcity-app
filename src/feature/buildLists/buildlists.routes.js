routes.$inject = ['$stateProvider'];

import buildLists from './buildlist.html';
import header from '../header/header.html';



export default function routes($stateProvider) {
    $stateProvider
        .state('buildLists', {
            views: {
                "": {
                    template: buildLists,
                    controller: 'BuildListsController',
                    controllerAs : 'buildlist'                    
                },
                "header": {
                    template: header,
                    controller: 'HeaderController',
                    controllerAs : 'header'                    
                }
            }  
        });
}