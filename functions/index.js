"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const secureCompare = require("secure-compare");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.reset = functions.https.onRequest((req, res) => {
  const key = req.query.key;

  if (!functions.config().cron) {
    console.log("cron is undefined");

    res.status(403).send("cron is undefined");
  } else if (!key || !secureCompare(key, functions.config().cron.key)) {
    console.log(
      "The key provided in the request does not match the key set in the environment. Check that",
      key,
      "matches the cron.key attribute in `firebase env:get`"
    );
    res
      .status(403)
      .send(
        'Security key does not match. Make sure your "key" URL query parameter matches the ' +
          "cron.key environment variable."
      );
    return null;
  }

  return admin
    .database()
    .ref("/clicks")
    .set(0)
    .then(() => {
      return res.send("Reset complete");
    });
});
