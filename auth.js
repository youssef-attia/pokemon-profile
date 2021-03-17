import { firebaseConfig } from './firebase-config.js';
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const signUpForm = document.querySelector(".register-form")
const signInForm = document.querySelector(".login-form")

var currentUser

auth.onAuthStateChanged(user=>{
    currentUser = user
    console.log(currentUser)
    db.collection('users').doc(user.uid).get().then(e=>{
        console.log(e.data().hi)
        pokeFavList = e.data().hi
        applyFavs();
    })
})
setTimeout(() => {
    document.querySelectorAll('.fa-heart,.fa-heart-o').forEach(fav => {
        fav.addEventListener("click",function (){
            console.log('////////////SAVED////////////')
            db.collection('users').doc(currentUser.uid).set(
                {hi: pokeFavList}
            )
        })
    })
}, 2000);
    
    signUpForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const email = signUpForm['signUpEmail'].value
    const pass = signUpForm['signUpPass'].value

    
    console.log(email, pass)
    
    auth.createUserWithEmailAndPassword(email, pass).then(cred=>{
        return db.collection('users').doc(cred.user.uid).set(
            {hi:[]}
        ).then(()=>{
            console.log(cred)
            signUpForm.reset();
        })
    })
})
signInForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const email = signInForm['signInEmail'].value
    const pass = signInForm['signInPass'].value

    console.log(email, pass)

    auth.signInWithEmailAndPassword(email, pass).then(cred=>{
        console.log(cred)
        signInForm.reset();
        applyFavs();
    })
})
