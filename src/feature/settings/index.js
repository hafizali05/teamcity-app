import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './settings.routes';
import SettingsController from './settings.controller';

export default angular.module('Settings', [uirouter])
    .config(routing)
    .controller('SettingsController',SettingsController)
    .name;