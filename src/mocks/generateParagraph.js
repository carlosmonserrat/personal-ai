const phrases = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Vivamus lacinia odio vitae vestibulum.",
    "Aliquam eget metus ut ante venenatis hendrerit.",
    "Phasellus posuere sem a malesuada ultricies.",
    "Ut volutpat lectus justo, non ullamcorper arcu fringilla eget.",
    "Nunc suscipit mi at turpis consectetur, quis volutpat nisi lacinia.",
    "Curabitur consequat ex vitae quam consequat, ac tempor erat venenatis.",
    "Integer et vehicula dolor, ut pellentesque neque.",
    "Sed feugiat dui eu quam cursus, at fermentum orci bibendum."
];

function getRandomPhrase() {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function generateRandomParagraph() {
    const paragraphLength = Math.floor(Math.random() * 5) + 1;
    let paragraph = "";

    for (let i = 0; i < paragraphLength; i++) {
        paragraph += getRandomPhrase() + " ";
    }

    return paragraph.trim();
}

function addRandomParagraphsToMockParagraphs() {
    const mockParagraphs = document.getElementsByClassName("mock-paragraph");

    for (const mockParagraph of mockParagraphs) {
        mockParagraph.textContent = generateRandomParagraph();
    }
}

window.addEventListener("DOMContentLoaded", addRandomParagraphsToMockParagraphs);
