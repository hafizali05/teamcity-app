export default class HomeController {
    constructor($scope) {
        this.$scope = $scope;
        $scope.submitForm = this.submitForm;
    }
    submitForm(data) {
        console.log('working',data);
        console.log(data);
    }

}



HomeController.$inject = ['$scope'];