import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "./config";
import {chatMessages, currentTitle} from "../ElementsSetup";
import {quickTitleRequest} from "../chat-gpt";

export let currentChatId: string
export const setCurrentId = (newId: string) => {
    currentChatId = newId
}
export const addChatData = async () => {
    const collectionRef = collection(db, 'chats');
    try {
        const docRef = await addDoc(
            collectionRef, {
                title: currentTitle.value,
                messages: chatMessages,
                timeStamp: Date.now()
            });

        currentChatId = docRef.id
        console.log('Document written with ID:', docRef.id);
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

export const updateChat = async () => {
    const docRef = doc(db, 'chats', currentChatId);
    const titleValue = currentTitle.value == "" ? await quickTitleRequest() : currentTitle.value
    console.log(titleValue)
    currentTitle.value = titleValue
    try {
        await updateDoc(
            docRef,
            {
                title: titleValue,
                messages: chatMessages,
                timeStamp: Date.now()
            });
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document:', e);
    }
};

export const deleteChat = async (id: string) => {
    const docRef = doc(db, 'chats', id);

    try {
        await deleteDoc(
            docRef
        );
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document:', e);
    }
}

// Retrieve all collections in the database
export async function getAllCollections() {
    const collections: any[] = [];
    const collectionsRef = await getDocs(collection(db, "chats"));

    collectionsRef.forEach((collection) => {
        const data = collection.data()
        data.id = collection.id
        collections.push(data);
    });
    return collections;
}