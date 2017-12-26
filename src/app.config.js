routing.$inject = ['$urlRouterProvider', '$locationProvider','$stateProvider'];
import homeTpl from './feature/home/home.html';
import settingsTpl from './feature/settings/settings.html';
export default function routing($urlRouterProvider,$locationProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            template: homeTpl
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('settings', {
            url: '/settings',
            template: settingsTpl
        });
}

