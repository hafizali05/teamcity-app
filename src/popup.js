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
    .run(['$rootScope', '$transitions', '$state', '$cookies', '$http',
        function ($rootScope, $transitions, $state, $cookies, $http) {
            // $rootScope.globals.loggedIn = false;
            chrome.cookies.getAll({},(cookies)=>{
                let cookie = cookies.filter(ele => ele.name === "TCSESSIONID");
                console.log(cookie);
                if(cookie.length < 1 || cookie === undefined){
                    console.log('in home')                    
                    $rootScope.loggedIn = false;                    
                    $state.go('home');
                } else {
                    console.log('in settings')
                    $rootScope.loggedIn = true;                    
                    $state.go('settings');                    
                }
            });
            console.log('$rootScope after run in popup');
            // $transitions.onStart({
            //     to: function (state) {
            //         console.log(chrome.cookies);
            //         chrome.cookies.getAll({},(cookies)=>{
            //             console.log(cookies);
            //             let cookie = cookies.find(ele => ele.name === "TCSESSIONID");
            //             console.log(cookie);
            //             if(cookie < 1 || cookie === undefined){
            //                 $state.go('home');
            //             }
            //         });
            //     }
            // });
        }]
    );