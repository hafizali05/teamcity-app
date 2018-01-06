routes.$inject = ['$stateProvider'];

import settings from './settings.html';

export default function routes($stateProvider) {
    $stateProvider
        .state('settings', {
            url: '/settings',
            controller: 'SettingsController',
            template: settings,
            controllerAs : 'setting'
        });
}