# Firebase Clicker Counter

Based on [Firebase realtime database quickstart](https://github.com/firebase/quickstart-js/tree/master/database).

## Dev
1. Create your project on the [Firebase Console](https://console.firebase.google.com).
1. Enable the **anonymous** sign-in provider in the **Authentication > SIGN-IN METHOD** tab.
1. You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
1. On the command line run `firebase use --add` and select the Firebase project you have created.
1. On the command line run `firebase serve` using the Firebase CLI tool to launch a local server and go to `localhost:5000`
1. Deploy via `firebase deploy`
1. Reset DB at https://us-central1-<PROJECT NAME>.cloudfunctions.net/reset?key=<CRON KEY>
1. Set up a cron-job to automatically hit the above url every 24 hours. I'm using https://cron-job.org/en/
1. ???
1. Profit

## What I learned
- How to make simple queries to a realtime firebase DB and make live updates
- How to deploy a firebase app
- How to use firebase anonymous authentication so that the DB isn't open to the public
- How to use cloud functions to make DB queries
- How to set up a cron job
