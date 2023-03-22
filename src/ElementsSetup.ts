import {addMessageByRole, createJsonModel, request, startNewChat} from "./chat-gpt";
import {deleteChat, getAllCollections, setCurrentId, updateChat} from "./firebase/queries";

export let currentChatBox: HTMLDivElement
export let currentChatHistory: HTMLDivElement
export let currentTitle: HTMLInputElement
export let currentAskButton: HTMLInputElement
export let currentPrompt: HTMLInputElement
export let currentNewButton: HTMLInputElement
export let currentSaveButton: HTMLInputElement
export let chatMessages: any

export const setChatMessages = (newMessages: any) => {
    chatMessages = newMessages
    setAskButtonState()
}

export const setAllCurrentElements = (elements: any) => {
    currentChatBox = elements.get("chat")
    currentTitle = elements.get("chatTitle")
    currentAskButton = elements.get("ask")
    currentPrompt = elements.get("prompt")
    currentNewButton = elements.get("new")
    currentSaveButton = elements.get("save")
    currentChatHistory = elements.get("chatHistory")

    setAskButton()
    setNewChatButton()
    setSaveButton()
    updateHistoryChats()
}

const updateHistoryChats = async () => {
    const history = await getAllCollections()
    currentChatHistory.innerHTML = ""
     await setHistoryChats(history)
}

const setHistoryChats = async (historyChats: any) => {
    for (const historyChat of historyChats) {
        const historyChatLink = document.createElement("div")
        historyChatLink.classList.add("conversation")
        historyChatLink.innerText = historyChat.title
        historyChatLink.setAttribute("article-id", historyChat.id)

        await deleteChat(historyChat.id)

        historyChatLink.onclick = () => {
            setChatMessages(historyChat.messages)
            currentChatBox.innerHTML = ""
            currentTitle.value = historyChat.title
            setCurrentId(historyChat.id)
            setChatBox()
        }

        currentChatHistory.appendChild(historyChatLink)
    }
}

const setAskButton = () => {
    setAskButtonState()

    currentAskButton.onclick = async () => {
        setAskButtonState(true)
        const selectedModel = (document.querySelector<HTMLInputElement>('input[name="models"]:checked'))?.value!;
        const jsonAiModel = createJsonModel(currentPrompt.value, selectedModel)
        await request(jsonAiModel)
        await updateHistoryChats()
    }
}

export const setChatBox = () => {
    chatMessages.forEach(
        (text: { role: string; content: string; }) => {
            addMessageByRole(text)
        }
    )
}

const setAskButtonState = (state: any = false) => {
    if (chatMessages == null || state) {
        currentAskButton.setAttribute("disabled", "true")
    } else {
        currentAskButton.removeAttribute("disabled")
    }
}

const setNewChatButton = () => {
    currentNewButton.onclick = async () => {
        currentTitle.value = ""
        await startNewChat()
        await updateHistoryChats()
    }
}
const setSaveButton = () => {
    currentSaveButton.onclick = async () => {
        await updateChat()
        await updateHistoryChats()
    }
}


