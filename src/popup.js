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

angular.module('teamcityApp', [uirouter,angularMaterial, angularAnimate, angularAria])
    .config(routing)
    .config(themeSettings)
    .controller('teamcityApp',function () {

    });
    // .config(($mdThemingProvider) => {
    //     // Register the user `avatar` icons
    //
    //     $mdThemingProvider.theme('default')
    //         // .primaryPalette('white')
    //         .accentPalette('blue')
    // });