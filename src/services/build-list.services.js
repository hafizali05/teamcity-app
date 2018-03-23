import angular from 'angular';

class Build{
    constructor($http){
        this.$http = $http;
    }
    showbuild(){
        var baseURl  = `https://teamcity.keytree.net/httpAuth/app/rest`,
        
        
        headers = new Headers(),
        options = {
            credentials: 'include',
            headers: headers
        },
        rest = "/builds";
        var successLogin = {
            type: 'basic',
            iconUrl: 'icon-48.png',
            title: 'login successful',
            message: 'You are the man!successfully logged in'
        };
        var promise =   this.$http.get(baseURl + rest)
                            .then(ele =>{
                                return ele.data.build;
                                // console.log(JSON.parse(ele.data));
                            }).catch(error => {
                                console.log(error);
                                return error;
                            });
        return promise;
        // headers.append('Authorization', 'Basic ' + window.btoa('hdidarali' + ":" + 'sdsd'));
        // headers.append("Content-Type", "application/json");
        // headers.append("Accept", "application/json");
        // return fetch('http://api.open-notify.org/astros.json')
        //     .then(response =>{
        //         return response.json();
        //     })
        // return fetch(baseURl + rest,options)
        //         .then(response => {                                    
        //             return response.json();
        //         })
        //         .catch(error => {
        //             console.log('error from show projects',error);
        //             return error;
        //         })        
    }
}
Build.$inject = ['$http'];
export default angular.module('services.build', [])
    .service('build', Build)
    .name;