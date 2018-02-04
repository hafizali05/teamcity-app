import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './buildlists.routes';
import BuildListsController from './buildlists.controller';
import authentication from '../../services/authentication.service';

export default angular.module('buildlists', [uirouter,authentication])
    .config(routing)
    .controller('BuildListsController', BuildListsController)
    .name;