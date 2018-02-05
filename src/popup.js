import './css/popup.css';
import angular from 'angular';
import 'angular-material'
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularAria from 'angular-aria';
import ngCookie from 'angular-cookies';
import uirouter from '@uirouter/angularjs';
import routing from './app.config';
import Run from './app.run';
import themeSettings from './themeSettings';
import loginPage from './feature/home';
import Settings from './feature/settings';
import Header from './feature/header';

angular.module('teamcityApp', [loginPage, Settings, Header, uirouter, angularMaterial, angularAnimate, angularAria, ngCookie])
    .controller('teamcityApp',function ($scope) {
        $scope.greeting = "welcome";
        console.log($scope.greeting)
    })
    .config(routing)
    .config(themeSettings)
    .run(Run)