const menuLinks = document.querySelectorAll('.menu a');

const topics = [
    'A deep talk about the history of Bolivia in the 23 of March',
    'How to plan your next vacation without breaking the bank',
    'The rise of plant-based diets and its impact on health',
    'The latest trends in fashion and style',
    'Mastering the art of public speaking',
    'The benefits of meditation and mindfulness',
    'Exploring the world of video game design',
    'The impact of social media on our lives',
    'How to build a successful startup from scratch',
    'The future of space exploration and travel',
    'The art of writing compelling fiction',
    'The best tips and tricks for staying fit and healthy',
    'The latest advances in technology and innovation',
    'The power of positive thinking and visualization',
    'The secrets of successful relationships and dating',
    'The art of cooking and baking like a pro',
    'The impact of climate change on our planet',
    'How to master a new language in record time',
    'The history and culture of ancient civilizations',
    'The latest breakthroughs in medical research',
    'The rise of e-commerce and online shopping',
    'The world of professional sports and athletes',
    'The secrets of successful investing and finance',
    'The power of creativity and self-expression',
    'The latest trends in beauty and personal care',
    'The art of photography and visual storytelling',
    'The impact of artificial intelligence and automation',
    'The importance of mental health and self-care',
    'The rise of digital marketing and advertising',
    'The art of public relations and communication',
    'The latest trends in home design and decor',
    'The world of fine arts and museum exhibitions',
    'The power of networking and building relationships',
    'The history and culture of different music genres',
    'The secrets of successful entrepreneurship',
    'The latest trends in sustainable living and eco-friendly products',
    'The world of travel and exploration',
    'The impact of globalization on our society',
    'How to master the art of negotiation and persuasion',
    'The history and culture of different dance styles',
    'The rise of social entrepreneurship and activism',
    'The secrets of successful time management and productivity',
    'The latest trends in education and online learning',
    'The power of storytelling and personal narrative',
    'The world of beauty and fashion influencers',
    'The impact of cultural diversity on our communities',
    'The history and culture of different religious beliefs',
    'How to master the art of leadership and management'
];

// Shuffle the topics array
for (let i = topics.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [topics[i], topics[j]] = [topics[j], topics[i]];
}

const navElement = document.querySelector(".content");

// Assign titles and links to the side menu
for (let i = 0; i < topics.length; i++) {
    const linkElement = document.createElement("a");
    linkElement.classList.add(
        "text-white",
        "block",
        "py-2.5",
        "px-4",
        "rounded",
        "transition",
        "duration-200",
        "hover:bg-gray-100"
    );
    linkElement.href = "#";
    linkElement.textContent = topics[i];
    navElement.appendChild(linkElement);
}