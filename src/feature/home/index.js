// import homeTemplate from '../src/features/test/test.html';
import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './home.routes';
import HomeController from './home.controller';

export default angular.module('loginPage', [uirouter])
    .config(routing)
    .controller('HomeController', function ($scope) {
        console.log($scope);
        $scope.submitForm = function (data) {
            console.log('working',data);
            console.log(data);
        }

    })
    .name;