import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAFNt6V-TQjfnx0FGYhK6zvwiWvWUFnYhM",
    authDomain: "atfly-295c9.firebaseapp.com",
    databaseURL: "https://atfly-295c9.firebaseio.com",
    projectId: "atfly-295c9",
    storageBucket: "atfly-295c9.appspot.com",
    messagingSenderId: "316931128379",
    appId: "1:316931128379:web:db9b0433c2ca8554"
};

export default firebase.initializeApp(firebaseConfig);

/*function SomePromise(trigger: boolean): Promise<any> {
    const some = 'djksdjksjdkakdj';
    return new Promise<any>((resolve, reject) => {
        if (trigger) {
            resolve(some)
        } else {
            reject('TRIGGER IS FALSE')
        }
    })
}

SomePromise(true).then(value => console.log(value)).catch(error => console.log(error));*/
