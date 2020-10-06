import * as firebase from '@/firebase/firebase'
class _User {
    constructor() {
        // from login
        this.UID = "uid";
        this.Email = "email";
        this.DisplayName = "displayName";
        this.PhoneNumber = "phoneNumber";
        this.PhotoURL = "photoURL";

        // custom
        this.FirstName = "firstName";
        this.LastName = "lastName";
    }
    async get(uid) {
        let user = await firebase.users.doc(uid).get();
        return user.data();
    }
    async addFromLogin(users) {
        let uid = users.uid
        let userData = {}
        userData[User.UID] = uid;
        if (users.email) {
            userData[User.Email] = users.email;
        }
        if (users.displayName) {
            userData[User.DisplayName] = users.displayName;
        }
        if (users.PhoneNumber) {
            userData[User.PhoneNumber] = users.PhoneNumber;
        }
        if (users.photoURL) {
            userData[User.PhotoURL] = users.photoURL;
        }
        await firebase.users.doc(uid).set(userData, { merge: true });
        return userData;
    }
}

const User = new _User();
export default User;