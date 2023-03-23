import './style.css'

import {setAllCurrentElements} from "./ElementsSetup";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="chat">
   <div class="more">
      <input type="radio" id="davinci" name="models" value="text-davinci-003">
      <label for="model1">text-davinci-003</label><br>
      <input type="radio" id="gpt35" name="models" value="gpt-3.5-turbo" checked>
      <label for="model2">gpt-3.5-turbo</label><br>
   </div>
   <div id="chatHistoryContainer" class="chat-history-container">
      <div id="resizeBorder" class="resize-border"></div>
      <div class="chat-history" id="chatHistory" ></div>
   </div>
   <div  class="chat-container">
      <div class="chat-header">
         <input class="chat-title" id="chatTitle" type="text" placeholder="A title ...">
         <button id="save" class="new-conversation-button">save</button>
         <button id="new" class="new-conversation-button">new</button>
      </div>
      <div id="chat" class="chat-box">
      </div>
   </div>
   
    <div class="chat-input">
      <textarea  id="prompt"  placeholder="Type a message..." > </textarea>
      <button id="ask">Send</button>
   </div>
</div>
`
const elements = new Map
const setElements = (ids: any) => {
    ids.forEach((id: any) => {
        elements.set(id, document.querySelector<HTMLInputElement>(`#${id}`)!)
    })
}

setElements(["prompt", "ask", "chat", "chatTitle", "chatHistory", "save", "new", "davinci", "gpt3", "resizeBorder", "chatHistoryContainer"])

setAllCurrentElements(elements)


