import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './header.routes';
import HeaderController from './header.controller';

export default angular.module('Header', [uirouter])
	.config(routing)
	.controller('HeaderController',HeaderController)
	.name;