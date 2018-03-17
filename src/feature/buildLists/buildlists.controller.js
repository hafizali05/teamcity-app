export default class BuildListsController {
    constructor($scope,authentication,$state,$rootScope){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.auth = authentication;
        this.$state = $state;         
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