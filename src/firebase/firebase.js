import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebase-config.js';

// firebase init - add your own config here
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const users = db.collection('users')
const clients = db.collection('clients')

// export utils/refs
export {
  db,
  auth,
  users,
  clients
}