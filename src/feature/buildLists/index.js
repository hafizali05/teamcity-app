import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './buildlists.routes';
import BuildListsController from './buildlists.controller';

export default angular.module('Buildlists', [uirouter])
    .config(routing)
    .controller('BuildListsController', BuildListsController)
    .name;