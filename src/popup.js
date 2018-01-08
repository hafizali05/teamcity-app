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
angular.module('teamcityApp', [loginPage, Settings,  uirouter, angularMaterial, angularAnimate, angularAria, ngCookie])
    .controller('teamcityApp',function ($scope) {
    })
    .config(routing)
    .config(themeSettings)
    .run(['$rootScope', '$transitions', '$state', '$cookies', '$http',
        function ($rootScope, $transitions, $state, $cookies, $http) {
            chrome.cookies.getAll({},(cookies)=>{
                console.log(cookies);
                let cookie = cookies.find(ele => ele.name === "TCSESSIONID");
                console.log(cookie);
                if(cookie < 1 || cookie === undefined){
                    $state.go('home');
                } else {
                    $state.go('settings');                    
                }
            });
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