import "../css/popup.css";


var baseURl  = "https://teamcity.keytree.net/httpAuth/app/rest"
var username = "hdidarali";
var password = "W2+h`g*!2q)fHQrf";
var headers = new Headers();
headers.append('Authorization', 'Basic ' + window.btoa(username + ":" + password));
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");


var options = {
//   method: 'POST',
    headers
    // mode: 'cors'
};

console.log(Headers);
var rest = "/projects";
fetch(baseURl + rest,options)
    .then(response => response.text().then(function(text){
    return JSON.parse(text);
}))
.then(data => console.log(data))
.catch(e => console.log(e))
