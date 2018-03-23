import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './buildlists.routes';
import BuildListsController from './buildlists.controller';
import authentication from '../../services/authentication.service';
import builds from '../../services/build-list.services';

export default angular.module('Buildlists', [uirouter,authentication,builds])
    .config(routing)
    .controller('BuildListsController', BuildListsController)
    .name;