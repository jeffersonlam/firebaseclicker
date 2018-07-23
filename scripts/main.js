'use strict';
var clickerButton = document.getElementById('clicker-button');
var clickerCounterDisplay = document.getElementById('clicker-counter');

// Updates number of clicks on clicker button
function updateClickerCount(nbStart) {
  clickerCounterDisplay.innerText = nbStart;
}

// Bindings on load.
window.addEventListener('load', function() {
  // Listen for clicker clicks counts
  var clickerClicksRef = firebase.database().ref('/clicks');

  clickerClicksRef.on('value', function(snapshot) {
    updateClickerCount(snapshot.val());
  });

  clickerButton.addEventListener('click', function() {
    clickerClicksRef.transaction(function(clicks) {
      clicks++;
      return clicks;
    });
  });
}, false);
