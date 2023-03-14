import {addChatData, chatId, updateChat} from "./firebase/queries";


const chatMessages = [
    {
        role: "system",
        content: "You are an assistant"
    }
]

export const setInitialStateChat = (chatBox: HTMLDivElement, chatTitle: HTMLInputElement) => {
    chatMessages.forEach(text => {
        addAiAnswerInChat(chatBox, text)
    })
    // TODO: add the previous chats in the left in order to continue converations, add the id also in this somehow
    addChatData(
        {
            title: chatTitle.value,
            messages: chatMessages,
            timeStamp:Date.now()
        }
    )
}

export const setAskButton = (
    prompt: HTMLInputElement,
    askButton: HTMLButtonElement,
    chatBox: HTMLDivElement
) => {
    askButton.onclick = async () => {
        askButton.setAttribute("disabled", String(true))
        const selectedModel = (document.querySelector<HTMLInputElement>('input[name="models"]:checked'))?.value!;
        const requestModel = getRequestModel(prompt.value, selectedModel, chatBox)
        await request(requestModel, askButton, chatBox)
    }
}

const addAiAnswerInChat = (
    chat: HTMLDivElement,
    text: { role: string; content: string; }
) => {
    const message: HTMLDivElement = document.createElement('div')
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


const getRequestModel = (
    promptMessage: string,
    id: string,
    chat: HTMLDivElement
) => {

    const text = {
        role: "user",
        content: promptMessage
    }

    chatMessages.push(text)
    addAiAnswerInChat(chat, text)

    switch (id) {
        case "gpt-3.5-turbo":
            return {
                model: {
                    model: "gpt-3.5-turbo",
                    messages: chatMessages
                },
                url: "https://api.openai.com/v1/chat/completions",
                message: (json: { choices: { message: { content: string } }[] }) => json.choices[0].message.content
            }

        case "text-davinci-003":
            console.log(text.content)
            return {
                model: {
                    model: "text-davinci-003",
                    prompt: text.content,
                    max_tokens: 4000,
                    temperature: 0.5,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0
                },
                url: "https://api.openai.com/v1/completions",
                message: (json: { choices: { text: string }[] }) => json.choices[0].text
            }
        default:
            return {
                model: null,
                url: null,
                message: null
            }
    }
}
//jo
const request = (
    requestModel: { model: any; url: any; message: any; },
    askButton: HTMLButtonElement,
    chat: HTMLDivElement
) => {
    return new Promise(
        (getResponse) => {
            fetch(
                requestModel.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`
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
                    chatMessages.push(text)
                    addAiAnswerInChat(chat, text)
                    updateChat(chatId, {
                        title: "messages",
                        messages: chatMessages
                    })
                    getResponse(text.content)
                });
        }
    )
}
