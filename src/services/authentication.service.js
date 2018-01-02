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
        var baseURl  = `${ data.teamcityURL }/httpAuth/app/rest`;
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + window.btoa(data.username + ":" + data.password));
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");


        var options = {
            body:data,
            headers: headers
        };
        var rest = "/projects";
        var res = fetch(baseURl + rest,options)
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