import angular from 'angular';

class Authentication {
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
        var baseURl  = `${ data.teamcityURL }/httpAuth/app/rest`,
        headers = new Headers(),
        options = {
            body:data,
            headers: headers
        },
        rest = "/projects";


        headers.append('Authorization', 'Basic ' + window.btoa(data.username + ":" + data.password));
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");


        return fetch(baseURl + rest,options)
            // .then(response => console.log(response))
                .then(response => response.text().then(function(text){
                    return JSON.parse(text);
                }))
                .then(data => data)
                .catch(e => console.log(e))
    }

}

export default angular.module('services.auth', [])
    .service('authentication', Authentication)
    .name;