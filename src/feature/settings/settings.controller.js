export default class SettingsController {
    constructor($scope,authentication){
        this.auth = authentication;
    }
    showBuild(){
        this.auth.showBuildCount()
            .then(response => console.log(response));
        console.log('show build working');
    }
}
SettingsController.$inject = ['$scope','authentication'];