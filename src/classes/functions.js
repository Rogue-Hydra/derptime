import Storage from './storage';

class Functions {
  constructor() {
    this.storage = Storage;
    this.user = false;
  }

  checkAuth() {
    return new Promise((fulfill, reject) => {
      this.storage.auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          fulfill(user);
        } else {
          this.user = false;
          fulfill(false);
        }
      });
    });
  }
}

export default new Functions;
