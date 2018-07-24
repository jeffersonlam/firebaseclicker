"use strict";
var clickerButton = document.getElementById("clicker-button");
var clickerCounterDisplay = document.getElementById("clicker-counter");

// loader elements
var body = document.getElementById("body");
var loader = document.getElementById('loader');

var down = false;

// Update firebase DB
function firebaseClicksIncrement(ref) {
  ref.transaction(function(clicks) {
    clicks++;
    return clicks;
  });
}

// Updates number of clicks on clicker button
function updateClickerDisplay(num) {
  clickerCounterDisplay.innerText = num;
}

function clickerAnimation() {
  clickerButton.classList.remove("press");
  clickerButton.offsetWidth;
  clickerButton.classList.add("press");
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

      // Hide loader
      clickerClicksRef.once("value").then(function(){
        body.classList.remove('loading');
      });

      // Update clicker count display
      clickerClicksRef.on("value", function(snapshot) {
        updateClickerDisplay(snapshot.val());
        clickerAnimation();
      });
    }
  });

  // Listen for clicks and update DB
  clickerButton.addEventListener("mouseup", function(e) {
    firebaseClicksIncrement(clickerClicksRef);
    clickerAnimation();
  }, false);

  clickerButton.addEventListener("keyup", function() {
    down = false;
  }, false);

  clickerButton.addEventListener("keydown", function(e) {
    if (e.keyCode != 13 || down) return;
    down = true;
    firebaseClicksIncrement(clickerClicksRef);
    clickerAnimation();
  }, false);
}, false);
