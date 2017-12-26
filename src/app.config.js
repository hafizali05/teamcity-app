routing.$inject = ['$urlRouterProvider', '$locationProvider','$stateProvider'];
import homeTpl from './feature/home/home.html';
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
            // we'll get to this in a bit
        });
}

