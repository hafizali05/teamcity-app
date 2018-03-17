export default class BuildListsController {
    constructor($scope,authentication,$state,$rootScope){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.auth = authentication;
        this.$state = $state;        
        // (function () {
        //     'use strict';
        //      var alarmName = 'remindme';
        //      function checkAlarm(callback) {
        //        chrome.alarms.getAll(function(alarms) {
        //          var hasAlarm = alarms.some(function(a) {
        //            return a.name == alarmName;
        //          });
        //          var newLabel;
        //          if (hasAlarm) {
        //            newLabel = 'Cancel alarm';
        //          } else {
        //            newLabel = 'Activate alarm';
        //          }
        //          document.getElementById('toggleAlarm').innerText = newLabel;
        //          if (callback) callback(hasAlarm);
        //        })
        //      }
        //      function createAlarm() {
        //        chrome.alarms.create(alarmName, {
        //          delayInMinutes: 0.1, periodInMinutes: 0.1});
        //      }
        //      function cancelAlarm() {
        //        chrome.alarms.clear(alarmName);
        //      }
        //      function doToggleAlarm() {
        //        checkAlarm( function(hasAlarm) {
        //          if (hasAlarm) {
        //            cancelAlarm();
        //          } else {
        //            createAlarm();
        //          }
        //          checkAlarm();
        //        });
        //      }
        //      var toggleAlarm = document.getElementById('toggleAlarm');
        //      toggleAlarm.addEventListener('click', doToggleAlarm);
        //     checkAlarm();
        //   })();        
    }
    startAlarm(){
        debugger;
        console.log('start alarm');
        chrome.runtime.sendMessage({setAlarm: true});
        
        // chrome.runtime.sendMessage('hello from hafiz',function(res){
        //     console.log(res);
        // });
        
        // chrome.alarms.create("myAlarm",{delayInMinutes: 0.1, periodInMinutes: 0.2});
    }
}
BuildListsController.$inject = ['$scope','authentication','$state','$rootScope'];