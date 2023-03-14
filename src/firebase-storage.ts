import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// Your Firebase project config object
const firebaseConfig = {
    apiKey: "AIzaSyAX-mHLaZU1NimhgpPbdcF1wcUuJS6FVlM",
    authDomain: "personal-ai-b6e27.firebaseapp.com",
    databaseURL: "https://personal-ai-b6e27-default-rtdb.firebaseio.com",
    projectId: "personal-ai-b6e27",
    storageBucket: "personal-ai-b6e27.appspot.com",
    messagingSenderId: "1068660482122",
    appId: "1:1068660482122:web:081254bbcf61810c0346b3",
    measurementId: "G-XGSW1CCCEN"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
// Get Firestore instance
const db = getFirestore(app)


// Add data to a collection
export const addData = async () => {

    const collectionRef = collection(db, 'myCollection');
    const docData = {
        name: 'John',
        age: 32,
        job: 'Developer',
    }
    try {
        console.log('Document writing with ID:',docData);
        const docRef = await addDoc(collectionRef, docData);
        console.log('Document written with ID:', docRef.id);
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

// Update data in a document
export const updateData = async (docId: string) => {
    const docRef = doc(db, 'myCollection', docId);
    const updateData = {
        age: 35,
    };
    try {
        await updateDoc(docRef, updateData);
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document:', e);
    }
};



