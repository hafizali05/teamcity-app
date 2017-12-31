import angular from 'angular';

class Authentication {
    constructor() {
        // this.names = ['John', 'Elisa', 'Mark', 'Annie'];
    }

    validateURL(url){
        let baseURl = `${ url }/app/rest/latest`;

        const fetchData = async ()=>{
            const response = await fetch(baseURl)
            return response;
        }

        return fetchData();
    }
    authenticate(data){
        // https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo
        // var baseURl  = `https://${ data.teamcityURL }/httpAuth/app/rest`;
        // var baseURl  = "https://teamcity.keytree.net/httpAuth/app/rest";
        var baseURl = "https://teamcity.keytree.net/app/rest/latest";
        var username = "hdidarali";
        var password = "W2+h`g*!2q)fHQrf";
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + window.btoa(username + ":" + password));
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");


        var options = {
            body:data
            // headers
        };
        // var rest = "/projects";
        var rest = "";
        // var res = fetch(baseURl + rest,options)
        var res = fetch(baseURl)
            .then(response => console.log(response))
                    // .then(response => response.text().then(function(text){
                    //     return JSON.parse(text);
                    // }))
            .then(data => data)
            .catch(e => console.log(e))
        return res;
    }

}

export default angular.module('services.auth', [])
    .service('authentication', Authentication)
    .name;