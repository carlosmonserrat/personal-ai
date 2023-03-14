 import firebaseClient from './firebase-client'
import { getFirestore, collection, doc, addDoc, updateDoc } from '@firebase/firestore';


const chat = document.getElementById('chat')
const prompt = document.getElementById('prompt')
const askButton = document.getElementById('ask')
const chatgptMessages = [{
    role: "system",
    content: "You are an assistant"
}]



 const db = getFirestore();
 const user = {
     name: "John Doe",
     email: "john.doe@example.com",
     age: 30
 };



askButton.onclick = async () => {
    askButton.setAttribute("disabled", true)
    const selectedValue = document.querySelector('input[name="models"]:checked').value;
    const requestModel = getRequestModel(selectedValue)
    await ask(requestModel)
}

const addAiAnswerInChat = (text) => {
    const message = document.createElement('div')
    message.classList.add("message")
    switch (text.role) {
        case "system":
            message.classList.add("sys")
            break;
        case "ai":
            message.classList.add("ai")
            break;
        case "user":
            message.classList.add("me")
            break;
    }

    message.innerText = text.content
    chat.appendChild(message)
}

chatgptMessages.forEach(text => {
    addAiAnswerInChat(text)
})

const getRequestModel = (id) => {
    let model;
    let url;
    let message;

    const text = {
        role: "user",
        content: prompt.value
    }

    chatgptMessages.push(text)
    addAiAnswerInChat(text)

    switch (id) {
        case "gpt-3.5-turbo":
            url = "https://api.openai.com/v1/chat/completions"
            message = (json) => json.choices[0].message.content
            model = {
                model: "gpt-3.5-turbo",
                messages: chatgptMessages
            };
            break;
        case "text-davinci-003":
            url = "https://api.openai.com/v1/completions"
            message = (json) => json.choices[0].text
            model = {
                model: "text-davinci-003",
                prompt: prompt.value,
                max_tokens: 4000,
                temperature: 0.5,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            };
            break;
    }


    return {model: model, url: url, message: message}
}

const ask = (requestModel) => {
    return new Promise(
        (getResponse) => {
            fetch(
                requestModel.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer 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"
                    },
                    body: JSON.stringify(requestModel.model),
                }
            )
                .then(response => response.json())
                .then(json => {
                    askButton.removeAttribute("disabled")
                    const text = {
                        role: "assistant",
                        content: requestModel.message(json)
                    }
                    chatgptMessages.push(text)
                    console.log(chatgptMessages)
                    addAiAnswerInChat(text)

                    // Add a new document with a generated ID to the "users" collection
                    addDoc(collection(db, "users"), user)
                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });

                    getResponse(requestModel.message(json))
                });
        }
    )
}
