import Firebase from 'firebase';

class Storage {
  constructor() {
    this.app = Firebase.initializeApp({
      databaseURL: 'https://herpderp-monitor.firebaseio.com',
      apiKey: 'AIzaSyCiVJXotvMWNW5vPL-_vU2h9aYCJL9cVAc',
      authDomain: 'herpderp-monitor.firebaseapp.com',
    });
    this.auth = this.app.auth();
    this.db = this.app.database();
  }

  storeMonitor(monitor) {
    const userRef = this.db.ref('monitors');

    userRef.child(this.auth.currentUser.uid).child(monitor.niceName).set(monitor);
  }
}

export default new Storage;
