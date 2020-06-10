import {db} from '../UserAuthentication/firebase';
import firebase from 'firebase'
async function userget(uid){
    let res  = await db.collection('users').doc(uid).get();
    return res.data();
    }

const newUser = (uid, fname ,lname) => {
    db.collection('users').doc(uid).set({
        first_name: fname,
        last_name: lname
        },{merge : true})
      .then(console.log('done'))
      .catch(err => console.log(err))
    }
const addLike = (uid, url) => {
    db.collection('users').doc(uid).update({
        liked: firebase.firestore.FieldValue.arrayUnion(url)
      })
      .then(console.log('done'))
      .catch(err => console.log(err))
}
const removeLike = (uid, url) => {
    db.collection('users').doc(uid).update({
        liked: firebase.firestore.FieldValue.arrayRemove(url)
      })
      .then(console.log('done'))
      .catch(err => console.log(err))
}
const newMessage = (uid,message) =>{
    userget(uid).then( userData => {
        console.log(userData);
        const msg = {
            username : userData.first_name + ' ' + userData.last_name,
            message : message,
            email : uid
        }
        db.collection('chat').doc('GroupChat').update({
            CHAT : firebase.firestore.FieldValue.arrayUnion(msg)
        })
        .then(console.log('done'))
        .catch(err => console.log(err))
    }
    )
}
export {newUser , userget , addLike , removeLike , newMessage};