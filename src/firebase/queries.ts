import {addDoc, collection, doc, updateDoc,getDocs} from "firebase/firestore";
import {db} from "./config";

export let chatId: string
export const addChatData = async (chat: any) => {
    const collectionRef = collection(db, 'chats');

    try {
        const docRef = await addDoc(collectionRef, chat);
        chatId = docRef.id
        console.log('Document written with ID:', docRef.id);
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

export const updateChat = async (docId: string, chat: any) => {
    const docRef = doc(db, 'chats', docId);

    try {
        await updateDoc(docRef, chat);
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document:', e);
    }
};

// Retrieve all collections in the database
export async function getAllCollections() {
    const collections: any[] = [];
    const collectionsRef = await getDocs(collection(db, "chats"));

    collectionsRef.forEach((collection) => {
        console.log(collection.data())
        collections.push(collection);
    });
    console.log(collections)
    return collections;
}