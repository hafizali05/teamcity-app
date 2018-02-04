import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './header.routes';
import HeaderController from './header.controller';
// import authentication from '../../services/authentication.service';

export default angular.module('Header', [uirouter])
    .config(routing)
    .controller('HeaderController',HeaderController)
    .name;