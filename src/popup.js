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
angular.module('teamcityApp', [loginPage, Settings,  uirouter, angularMaterial, angularAnimate, angularAria])
    .controller('teamcityApp',function ($scope) {
        $scope.greeting = "welcome";
        console.log('chrome  cookies',chrome);
        chrome.cookies.getAll({domain:'teamcity.keytree.net'},function(cookies){
                console.log('cookies:',cookies);
        })
    })
    .config(routing)
    .config(themeSettings);