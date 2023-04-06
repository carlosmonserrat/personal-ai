Sure, here's the same example using Firebase SDK version 9.0.0:

First, initialize Firebase by importing and initializing the app:

```
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, updateDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firestore database service
const db = getFirestore();
```

Next, let's assume we have a JSON object representing a user with some initial data:

```
const user = {
name: "John Doe",
email: "john.doe@example.com",
age: 30
};
```

To store this object in Firebase, we need to create a new document in a collection. We can do that as follows:

```
// Add a new document with a generated ID to the "users" collection
addDoc(collection(db, "users"), user)
.then((docRef) => {
console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
console.error("Error adding document: ", error);
});
```

This will create a new document in the "users" collection with the data from the `user` object. The `addDoc()` method returns a promise that resolves to a `DocumentReference` object, which contains the ID of the newly created document.

Now, let's say we want to update the user's age. We can do that by retrieving the document and updating its data:

```
// Get the document reference for the user we just created
const userRef = doc(db, "users", docRef.id);

// Update the user's age
updateDoc(userRef, { age: 31 })
.then(() => {
console.log("Document updated successfully!");
})
.catch((error) => {
console.error("Error updating document: ", error);
});
```

This code retrieves the document reference for the user we just created, and updates the `age` property of the document. The `updateDoc()` method returns a promise that resolves when the update is complete.

And that's it! Now the user's age has been updated in Firebase.