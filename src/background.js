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

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    if (msg.setAlarm) {
      // For testing only.  delayInMinutes will be rounded up to at least 1 in a
      // packed or released extension.
      chrome.alarms.create({delayInMinutes: 0.1});
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

  chrome.alarms.onAlarm.addListener(function() {
    alert("Time's up!");
  });

// chrome.alarms.onAlarm.addListener(function( alarm ) {
//     console.log("Got an alarm!", alarm);
//   });