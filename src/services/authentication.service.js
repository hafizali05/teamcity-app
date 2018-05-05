import angular from 'angular';

class Authentication {
	validateURL(url){
		chrome.storage.local.set({ "teamcityURL" : url }, function(error) {
			if (error) {
				throw new Error(error);
			}
		});
		return fetch(`${ url }/app/rest/latest`);
	}
	showProjects(data){
		var baseURl  = `${ data.teamcityURL }/httpAuth/app/rest`,        
			headers = new Headers(),
			options = {
				credentials: 'include',
				headers: headers,
			},
			rest = "/projects";
		var successLogin = {
			type: 'basic',
			iconUrl: 'icon-48.png',
			title: 'login successful',
			message: 'You are the man!successfully logged in',
		};
		headers.append('Authorization', 'Basic ' + window.btoa(data.username + ":" + data.password));
		headers.append("Content-Type", "application/json");
		headers.append("Accept", "application/json");

		return fetch(baseURl + rest,options)
			.then(response => {                                    
				return response.json();
			})
			.catch(error => {
				throw new Error(error);
			});
	}

	authenticate(data){
		// var baseURl  = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";
		// var baseURl  = `teamcity.keyt.net/httpAuth/app/rest`,
		var baseURl  = `${ data.teamcityURL }/httpAuth/app/rest`,        
			headers = new Headers(),
			options = {
				credentials: 'include', // here's the magical line that fixed everything            
				// method: 'POST',
				// body:data,
				headers: headers,
				// credentials: 'same-origin'            

			},
			// rest = "/projects";
			rest = "/projects";
		var successLogin = {
			type: 'basic',
			iconUrl: 'icon-48.png',
			title: 'login successful',
			message: 'You are the man!successfully logged in',
		};
		headers.append('Authorization', 'Basic ' + window.btoa(data.username + ":" + data.password));
		headers.append("Content-Type", "application/json");
		headers.append("Accept", "application/json");

		return fetch(baseURl + rest,options)
			.then(response => {                                    
				return response.json();
			})
			.catch(error => {
				throw new Error(error);
			});
	}

}

export default angular.module('services.auth', [])
	.service('authentication', Authentication)
	.name;