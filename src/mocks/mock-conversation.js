// Define an array of prompts and answers
const prompts = [
    "Where is the toilet?",
    "Can you recommend a good restaurant?",
    "How do I get to the nearest gas station?",
    "Do you have any tourist attractions to recommend?",
    "What is the best time to visit?",
    "Where can I find a pharmacy?",
    "Is there a hospital nearby?",
    "Can you help me find a hotel?",
    "Where can I find a good shopping center?",
    "Can you recommend a good beach?",
    "What is the local currency?",
    "Do you have any festivals coming up?",
    "Can you recommend a good museum?",
    "How do I get to the airport?",
    "Where can I rent a car?",
    "What is the local language?",
    "Do you have any cultural events coming up?",
    "Where can I find a good bar?",
    "What is the weather like today?",
    "Can you recommend a good park?"
];

const answers = [
    "The toilet is in four steps from the kitchen",
    "I would recommend the restaurant on the corner of 5th and Main",
    "You can get to the nearest gas station by taking a left on Main Street and then a right on 2nd Avenue",
    "There are many tourist attractions to see, such as the local museum, the botanical gardens, and the historic district",
    "The best time to visit is during the summer months when the weather is warm and sunny",
    "You can find a pharmacy on the corner of 3rd and Elm",
    "There is a hospital located downtown, just a few blocks from here",
    "I can help you find a hotel that meets your needs, just let me know what you're looking for",
    "There are several good shopping centers in the area, such as the mall on 4th Street and the outlet center on the outskirts of town",
    "I would recommend the beach on the north side of town, it's known for its beautiful views and clear water",
    "The local currency is the dollar, but some places also accept credit cards",
    "There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food,There is a festival coming up next weekend, it's a celebration of local music and food",
    "The museum on 2nd Avenue is a great place to learn about local history and culture",
    "You can get to the airport by taking the shuttle from the bus station downtown",
    "There are several car rental companies in town, including Hertz and Enterprise",
    "The local language is English, but you may also hear some Spanish and French spoken in certain areas",
    "There is a cultural event coming up next month, it's a festival of dance and music",
    "You can find a good bar on the corner of 7th and Elm, it's known for its craft cocktails and live music",
    "The weather is sunny and warm today, with a high of 80 degrees",
    "The park on the south side of town is a great place to relax and enjoy nature"
];

// Get a reference to the main element
const mainElement = document.querySelector("main");

// Generate a random conversation
function generateConversation() {
    // Start with the admin message
    let conversation = '<div class="flex mt-4">';
    conversation += '<span class="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg rounded-r-lg mr-4 ">';
    conversation += '<i class="fas fa-user-tie mr-3"></i>';
    conversation += '<span class="text-gray-900 font-bold">Admin: </span>';
    conversation += '<span class="text-gray-600">Welcome to Personal Assistant, please write your prompt</span>';
    conversation += '</span></div>';

    // Generate 20 prompts and answers
    for (let i = 0; i <150; i++) {
        // Generate a random prompt and answer
        const promptIndex = Math.floor(Math.random() * prompts.length);
        const answerIndex = Math.floor(Math.random() * answers.length);
        const prompt = prompts[promptIndex];
        const answer = answers[answerIndex];

        // Generate the user message
        conversation += '<div class="flex mt-4 justify-end">';
        conversation += '<span class="bg-gray-400 text-white px-4 py-2 rounded-l-lg rounded-r-lg ml-4">';
        conversation += '<i class="fas fa-user  mr-3"></i>';
        conversation += '<span class="text-white font-bold">User: </span>';
        conversation += '<span class="text-white">' + prompt + '</span>';
        conversation += '</span></div>';

        // Generate the assistant message
        conversation += '<div class="flex mt-4">';
        conversation += '<span class="bg-gray-900 text-white px-4 py-2 rounded-l-lg rounded-r-lg mr-4">';
        conversation += '<i class="fas fa-user-md mr-3"></i>';
        conversation += '<span class="text-white font-bold">Assistant: </span>';
        conversation += '<span class="text-white">' + answer + '</span>';
        conversation += '</span></div>';
    }

    // Add the conversation to the main element
    mainElement.innerHTML = conversation;
}

// Generate the conversation on page load
window.addEventListener("DOMContentLoaded", generateConversation);
