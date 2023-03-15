import './style.css'
import {setAskButton, setHistoryChats, setChatBox} from "./chat-gpt";
import {getAllCollections} from "./firebase/queries";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <div class="chat">
    <div class="more">
        <input type="radio" id="model1" name="models" value="text-davinci-003">
        <label for="model1">text-davinci-003</label><br>
        <input type="radio" id="model2" name="models" value="gpt-3.5-turbo" checked>
        <label for="model2">gpt-3.5-turbo</label><br>
        <button class="new-conversation-button">+</button>
    </div>

    <div id="chatsHistory" class="conversation-history">
    </div>

    <div class="chat-container">
        <div class="chat-header"><input id="chatTitle" type="text" value="example title"></div>
        <div id="chat" class="chat-history">
        </div>

        <div class="chat-input">
            <textarea  id="prompt"  placeholder="Type a message..." > </textarea>
            <button id="ask">Send</button>
        </div>
    </div>
</div>
`

const prompt: HTMLInputElement = document.querySelector<HTMLInputElement>('#prompt')!
const askButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#ask')!
const chat: HTMLDivElement = document.querySelector<HTMLDivElement>('#chat')!
const chatTitle: HTMLInputElement = document.querySelector<HTMLInputElement>('#chatTitle')!
const chatsHistoryDiv: HTMLDivElement = document.querySelector<HTMLDivElement>('#chatsHistory')!

const commonEvents = {
    updateHistoryChats: async () => {
        chatsHistoryDiv.innerHTML = ""
        setHistoryChats(chatsHistoryDiv, await getAllCollections())
    },
    updateChatBox: ()=>{

    }
}

setChatBox(chat, chatTitle)
setAskButton(prompt, askButton, chat, chatTitle, commonEvents)

await commonEvents.updateHistoryChats()
