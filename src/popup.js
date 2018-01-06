import './css/popup.css';
import angular from 'angular';
import 'angular-material'
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularAria from 'angular-aria';
import uirouter from '@uirouter/angularjs';
import routing from './app.config';
import themeSettings from './themeSettings';
import loginPage from './feature/home';
import Settings from './feature/settings';
console.log(loginPage,Settings);
angular.module('teamcityApp', [loginPage, Settings,  uirouter, angularMaterial, angularAnimate, angularAria])
    .controller('teamcityApp',function ($scope) {
        $scope.greeting = "welcome";
    })
    .config(routing)
    .config(themeSettings)
    // .config(($mdThemingProvider) => {
    //     // Register the user `avatar` icons
    //
    //     $mdThemingProvider.theme('default')
    //         // .primaryPalette('white')
    //         .accentPalette('blue')
    // });