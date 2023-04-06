import {addMessageByRole, createJsonModel, request, startNewChat} from "./chat-gpt";
import {deleteChat, getAllCollections, setCurrentId, updateChat} from "./firebase/queries";

export let currentChatBox: HTMLDivElement
export let currentChatHistory: HTMLDivElement
export let currentTitle: HTMLInputElement
export let currentAskButton: HTMLInputElement
export let currentPrompt: HTMLInputElement
export let currentNewButton: HTMLInputElement
export let currentSaveButton: HTMLInputElement
export let currentResizeBorder: HTMLInputElement
export let currentChatHistoryContainer: HTMLInputElement
export let chatMessages: any

let isResizing = false;
let startPositionX = 0;
let startWidth = 0;

export const setAllCurrentElements = async (elements: any) => {
    currentChatBox = elements.get("chat")
    currentTitle = elements.get("chatTitle")
    currentAskButton = elements.get("ask")
    currentPrompt = elements.get("prompt")
    currentNewButton = elements.get("new")
    currentSaveButton = elements.get("save")
    currentChatHistory = elements.get("chatHistory")
    currentResizeBorder = elements.get("resizeBorder")
    currentChatHistoryContainer = elements.get("chatHistoryContainer")

    setAskButton()
    setNewChatButton()
    setSaveButton()
    await updateHistoryChats()
    setHistoryResizeEventListeners()
}

const startResize = (event: { clientX: number; }) => {
    console.log("RESIZE")
    isResizing = true;
    startPositionX = event.clientX;
    const {getComputedStyle} = document.defaultView!;
    startWidth = parseInt(getComputedStyle(currentChatHistoryContainer).width, 10);
}

const resize = (event: { clientX: number; }) => {
    if (isResizing) {
        console.log("RESIZING")
        const delta = event.clientX - startPositionX;
        currentChatHistoryContainer.style.width = `${startWidth + delta}px`;
    }
}

export const setChatMessages = (newMessages: any) => {
    chatMessages = newMessages
    setAskButtonState()
}

const stopResize = () => {
    isResizing = false;
}

// @ts-ignore
const setHistoryResizeEventListeners = () => {
    currentResizeBorder.addEventListener("mousedown", startResize);
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
}

export const updateHistoryChats = async () => {
    const history = await getAllCollections()
    history.sort((a, b) => b.timeStamp - a.timeStamp)
    currentChatHistory.innerHTML = ""
    await setHistoryChats(history)
}

const setHistoryChats = async (historyChats: any) => {
    for (const historyChat of historyChats) {

        const historyChatSingleContainer = document.createElement("div")
        historyChatSingleContainer.classList.add("single-chat-link-container")

        const historyChatLink = document.createElement("div")
        historyChatLink.classList.add("conversation")
        historyChatLink.innerText = historyChat.title
        historyChatLink.setAttribute("article-id", historyChat.id)

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "-"
        deleteButton.classList.add("delete-button")

        deleteButton.onclick = async () => {
            await deleteChat(historyChat.id)
            await updateHistoryChats()
        }

        historyChatLink.onclick = () => {
            setChatMessages(historyChat.messages)
            currentChatBox.innerHTML = ""
            currentTitle.value = historyChat.title
            setCurrentId(historyChat.id)
            setChatBox()
        }

        historyChatSingleContainer.appendChild(deleteButton)
        historyChatSingleContainer.appendChild(historyChatLink)

        currentChatHistory.appendChild(historyChatSingleContainer)
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


