"use strict";
var clickerButton = document.getElementById("clicker-button");
var clickerCounterDisplay = document.getElementById("clicker-counter");

// loader elements
var body = document.getElementById("body");
var loader = document.getElementById('loader');

// Updates number of clicks on clicker button
function updateClickerCount(nbStart) {
  clickerCounterDisplay.innerText = nbStart;
}

// Bindings on load.
window.addEventListener("load",function() {
    var clickerClicksRef = firebase.database().ref("/clicks");

    // Automatically sign user in anonymously
    firebase.auth().signInAnonymously().catch(function(error) {
        // On error
        console.log(error.code);
        console.log(error.message);
      });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        initializeClicker();
      }
    });

    // Listen for clicker clicks counts

    function initializeClicker() {
      // Hide loader
      clickerClicksRef.once("value").then(function(){
        body.classList.remove('loading');
      });

      // Update clicker count display
      clickerClicksRef.on("value", function(snapshot) {
        updateClickerCount(snapshot.val());
      });
    }

    // Listen for clicks and update DB
    clickerButton.addEventListener("click", function() {
      clickerClicksRef.transaction(function(clicks) {
        clicks++;
        return clicks;
      });
    });
  },
  false
);
