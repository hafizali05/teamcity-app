import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './home.routes';
import HomeController from './home.controller';
import authentication from '../../services/authentication.service';
// import Settings from '../settings';
console.log(uirouter,authentication);

export default angular.module('loginPage', [uirouter,authentication])
    .config(routing)
    .controller('HomeController',HomeController)
    .name;