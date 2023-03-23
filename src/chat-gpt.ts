import {addChatData, updateChat} from "./firebase/queries";
import {chatMessages, currentAskButton, currentChatBox, setChatBox, setChatMessages} from "./ElementsSetup";

export const startNewChat = () => {
    currentChatBox.innerHTML = ""
    setChatMessages([{role: "system", content: "You are an assistant"}])
    setChatBox()
    addChatData()
}

export const addMessageByRole = (text: { role: string; content: string; }) => {
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
    currentChatBox.appendChild(message)
}

export const createJsonModel = (promptMessage: string, aiModelId: string) => {
    const text = {
        role: "user",
        content: promptMessage
    }
    chatMessages.push(text)
    addMessageByRole(text)

    switch (aiModelId) {
        case "gpt-3.5-turbo":
            //the context got a limit of around 4000 tokens for gpt turbo in the context
            const limitedMessages = chatMessages.slice(-6);

            return {
                model: {
                    model: "gpt-3.5-turbo",
                    messages: limitedMessages
                },
                url: "https://api.openai.com/v1/chat/completions",
                messagePath: (json: { choices: { message: { content: string } }[] }) => json.choices[0].message.content
            }

        case "text-davinci-003":
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
                messagePath: (json: { choices: { text: string }[] }) => json.choices[0].text
            }
        default:
            return {
                model: null,
                url: null,
                messagePath: null
            }
    }
}

export const ask = async (url: string, data: string) => {
    return await fetch(
        url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`
            },
            body: data
        }
    )
}

export const request = async (requestModel: { model: any; url: any; messagePath: any; }) => {
    const requestData = await ask(requestModel.url, JSON.stringify(requestModel.model)).then(response => response.json())
    currentAskButton.removeAttribute("disabled")

    const text = {
        role: "assistant",
        content: requestModel.messagePath(requestData)
    }

    chatMessages.push(text)
    addMessageByRole(text)
    updateChat()
}

export const quickTitleRequest = async () => {
    const newChatMessages = [...chatMessages]
    newChatMessages.push({
        role: "user",
        content: "provide a title for this"
    })

    const model = {
        model: "gpt-3.5-turbo",
        messages: newChatMessages
    }

    const requestData = await ask("https://api.openai.com/v1/chat/completions", JSON.stringify(model)).then(response => response.json())
    return requestData.choices[0].message.content
}

