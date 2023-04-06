require('dotenv').config();
const ask = async (promptMessage) => {
    const chatMessages = [
        {
            role: "system", content: "You are an assistant"
        },
        {
            role: "user", content: promptMessage
        }
    ]

    return new Promise((getResponse) => {
        fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.VITE_OPEN_AI_KEY}`
                }, body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: chatMessages
                })
            })
            .then(response => response.json())
            .then(json => {
                getResponse(json.choices[0].message.content)
            })
    });
};

module.exports = {ask}