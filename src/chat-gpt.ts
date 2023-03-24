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
    interface ModelConfigs {
        [key: string]: () => any;
    }

    const text = {
        role: "user",
        content: promptMessage
    }
    chatMessages.push(text)
    addMessageByRole(text)

    const modelConfigs: ModelConfigs = {
        "gpt-4": () => {
            return getModelConfig("gpt-4", chatMessages);
        },
        "gpt-3.5-turbo": () => {
            const limitedMessages = chatMessages.slice(-6);
            return getModelConfig("gpt-3.5-turbo", limitedMessages);
        },
        "text-davinci-003": () => {
            return getModelConfig("text-davinci-003", null, text.content, 4000, 0.5, 1, 0, 0);
        }
    };

    if (aiModelId in modelConfigs) {
        return modelConfigs[aiModelId]();
    } else {
        return reportError("Only legal OpenAI models are allowed https://platform.openai.com/docs/models");
    }
}

const getModelConfig = (model: any, messages: any, prompt?: any, maxTokens?: any, temperature?: any, topP?: any, frequencyPenalty?: any, presencePenalty?: any) => {
    return {
        model: {
            model,
            messages,
            prompt,
            max_tokens: maxTokens,
            temperature,
            top_p: topP,
            frequency_penalty: frequencyPenalty,
            presence_penalty: presencePenalty
        },
        url: model.startsWith("gpt") ? "https://api.openai.com/v1/chat/completions" : "https://api.openai.com/v1/completions",
        messagePath: (json: { choices: { message?: { content: string }, text?: string }[] }) => json.choices[0].message?.content || json.choices[0].text
    };
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

