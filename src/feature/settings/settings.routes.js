routes.$inject = ['$stateProvider'];

import settings from './settings.html';
import header from '../header/header.html';

export default function routes($stateProvider) {
    $stateProvider
        .state('settings', {
            views: {
                "": {
                    template: settings,
                    controller: 'SettingsController',
                    controllerAs : 'setting'                    
                },
                "header": {
                    template: header,
                    controller: 'HeaderController',
                    controllerAs : 'header'                    
                }
            } 
        });
}