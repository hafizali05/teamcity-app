// // chrome.alarms.onAlarm.addListener(function( alarm ) {
// //   console.log("Got an alarm!", alarm);
// // });
// // chrome.alarms.onAlarm.addListener(function(alarm) {
// //     alert("Beep");
// // });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log('on message');
//     chrome.alarms.create('arbitrary', {
//         when: 1000,
//         periodInMinutes: 0.05
//     });
// });
// chrome.alarms.onAlarm.addListener(function (alarm) {

//     console.log('alarm called');
//     alert('beep');
//  });
let buildsToWatch = null;
let genCounter = 0;
let priorityCounter = 0;
let headers = new Headers();
let username;
let password = '';
headers.append('Authorization', 'Basic ' + window.btoa(username + ":" + password));
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
let options = {
	credentials: 'include',
	headers: headers,
};


chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	chrome.storage.local.get('teamcity', (userdata, error) => {
		if(!error){
			username = userdata.teamcity.username;
		}else {
			throw new Error(error);
		}         
	});     	
	if (msg.setAlarm) {
		// For testing only.  delayInMinutes will be rounded up to at least 1 in a
		// packed or released extension.


		//Trigger the alarm

		chrome.alarms.create(
			'general',
			{
				delayInMinutes: 0.1, // delay before it starts the first time
				periodInMinutes: 3, // interval on which it would trigger
			}
		);

		// clear all alarms
	} else if(msg.setAlarm === false){
		chrome.alarms.clearAll();
	} else if (msg.delayedResponse) {
		// Note: setTimeout itself does NOT keep the page awake. We return true
		// from the onMessage event handler, which keeps the message channel open -
		// in turn keeping the event page awake - until we call sendResponse.
		setTimeout(function() {
			sendResponse("Got your message.");
		}, 5000);
		return true;
	} else if (msg.getCounters) {
		sendResponse({counter: counter++,
			persistentCounter: localStorage.counter++});
	}
	// If we don't return anything, the message channel will close, regardless
	// of whether we called sendResponse.
});
// start the alarm here
chrome.alarms.onAlarm.addListener((callback)=> {
	console.log('this is a general alarm',callback);
	// if its a priority alarm triggered than just stop here
	if(callback.name === 'general' && buildsToWatch === null){
		genCounter++;
		checkIfMyBuildIsOn()
			.then(whatsTheStatus)
			.catch((error)=>{
				throw new Error(error);
			});
	} else if(callback.name === 'priority'){
		priorityCounter++;
		console.log('checkin priority');
		watchBuild();
	}

});

let checkIfMyBuildIsOn = ()=> {
	console.log('<<<<<<<<<<<<<<<<<<<<<<<<<,                ' + 'genCounter' +  genCounter + '                <<<<<<<<<<<<<<<<<<<<<<<<<,');	
	return fetch('https://teamcity.keytree.net/httpAuth/app/rest/builds?locator=running:true',options)
		.then((response)=>{
			return response.json();
		})
		.catch((error)=>{
			throw new Error(error);
		});
};
let whatsTheStatus = (response)=> {
	console.log('whatsTheStatus',response);
	let count = response.count;
	return count > 0 ? checkIfMyBuildExist(response) : chrome.alarms.clear('priority');
};
let watchBuild = ()=>{
	console.log('<<<<<<<<<<<<<<<<<<<<<<<<<,                ' + 'priority' +  priorityCounter + '                <<<<<<<<<<<<<<<<<<<<<<<<<,');
	console.log('I am watchbuild ' + buildsToWatch);
	checkStatusOfTheBuild()
		.then(getStatusOfBuild)
		.catch(error =>{
			throw new Error(error);
		});
	// if the build status is finished 
	// than send the notification of the status
	// clear the priority alarm
};
let checkStatusOfTheBuild = ()=>{
	console.log('checkStatusOfTheBuild',buildsToWatch);
	return fetch('https://teamcity.keytree.net/httpAuth/app/rest/builds?locator=id:' + `${buildsToWatch}`,options)
		.then(response=>{
			return response.json();
		})
		.catch(error =>{
			throw new Error(error);
		});
};
let getStatusOfBuild = (response)=> {
	console.log('getStatusOfBuild:',response);
	return !(response.build[0].running) ? sendNotification(response.build[0].status) : null; 
};
let sendNotification = (status) => {
	console.log('sendNotification', status);
	buildsToWatch = null;
	chrome.alarms.clear('priority');
	chrome.notifications.create({
		type: 'basic',
		iconUrl: 'icon-48.png',
		title: status === 'success' ? 'Deployment Successful' : 'Deployment failed',
		message: status === 'success' ? 'Deployment Successful' : 'Deployment failed',
	});
};
let checkIfMyBuildExist = (response)=> {
	console.log('checkIfMyBuildExist',response);
	chrome.storage.local.get('teamcity', (userdata, error) => {
		if(!error){
			let bids = userdata.teamcity.buildIds;
			let ifMyBuildExists = bids.includes(response.build[0].buildTypeId);
			return ifMyBuildExists ? addItToPiorityList(response.build[0]) : null; 
		}else {
			throw new Error(error);
		}         
	});     
};
let addItToPiorityList = (buildInfo)=>{
	console.log('addItToPiorityList',buildInfo);
	buildsToWatch = buildInfo.id;
	triggerPriorityAlarm();		
};
let triggerPriorityAlarm = ()=>{
	chrome.alarms.create(
		'priority',
		{
			delayInMinutes: 0.1, // delay before it starts the first time
			periodInMinutes: 1, // interval on which it would trigger
		}
	);	
};				