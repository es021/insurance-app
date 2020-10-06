import * as firebase from '@/firebase/firebase'
class _Client {
    constructor() {
        this.UID = "uid";
        this.Email = "email";
        this.FirstName = "firstName";
        this.LastName = "lastName";
        this.PhoneNumber = "phoneNumber";
        this.CreatedAt = "createdAt";
        this.init();
    }
    init() {
        this.lastVisible = null;
    }
    get({ uid, limit, orderBy }) {
        if (uid) {
            // let res = await firebase.clients.doc(uid).get();
            // return res.data();
        }

        if (limit) {
            var ref = null;
            if (!this.lastVisible) {
                ref = firebase.clients.orderBy(orderBy)
                    .limit(limit);
            } else {
                ref = firebase.clients.orderBy("population")
                    .startAfter(lastVisible)
                    .limit(limit);
            }

            return ref.get().then((snapshot) => {
                let toRet = snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
                var lastVisible = snapshot.docs[snapshot.docs.length - 1];
                this.lastVisible = lastVisible;
                return toRet;
            });
        }
    }
}

const Client = new _Client();
export default Client;