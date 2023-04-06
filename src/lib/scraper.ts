import {JSDOM} from 'jsdom';
import fetch from 'node-fetch';

export const fetchFeedContent = async (baseUrl: string, section?: string) => {
    const url = section ? `${baseUrl}${section}` : baseUrl;
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const links = document.querySelectorAll('.headline a');
    const contentPromises = Array.from(links).map(async (link) => {
        const postUrl = link.getAttribute('href');
        const postResponse = await fetch(`${baseUrl}${postUrl}`);
        const postHtml = await postResponse.text();
        const postDom = new JSDOM(postHtml);
        const postDocument = postDom.window.document;
        const title = postDocument.querySelector('.headline h1')?.textContent?.trim() || '';

        const author1 = postDocument.querySelector('.author_img_txt a')?.textContent?.trim() || '';
        const author2 = postDocument.querySelector('.nombre a')?.textContent?.trim() || '';
        const author = author1 == '' ? author2 : author1;
        const content = postDocument.querySelector('.texto')?.textContent?.trim() || '';
        return {title, author, content};
    });

    return Promise.all(contentPromises);
};
