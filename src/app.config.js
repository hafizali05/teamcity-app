routing.$inject = ['$urlRouterProvider', '$locationProvider','$stateProvider'];
import homeTpl from './home.html';
export default function routing($urlRouterProvider,$locationProvider,$stateProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: homeTpl
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('settings', {
        //     // we'll get to this in a bit
        // });
}

