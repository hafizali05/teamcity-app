import './css/popup.css';
import angular from 'angular';
import 'angular-material'
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularAria from 'angular-aria';
import uirouter from '@uirouter/angularjs';
import routing from './app.config';

angular.module('teamcityApp', [uirouter,angularMaterial, angularAnimate, angularAria])
    .config(routing);




console.log('working');