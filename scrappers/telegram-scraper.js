const cheerio = require('cheerio');
const axios = require('axios');
const request = require("request");
const {ask} = require("./chatgpt");


request('https://t.me/s/varlamov_news', async (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const headlines = [];

        $('.js-message_text').each(function () {

            const title = $(this).text().trim();
            headlines.push(title);
        });

        headlines.reverse()

        const chunkedData = [];

        for (let i = 0; i < headlines.length; i += 4) {
            const chunk = headlines.slice(i, i + 4);
            chunkedData.push(chunk);
        }

        for (const chunk of chunkedData) {
            const news = chunk.map((data, index) => `${index + 1}.${data}`).join('\n');
            const question = `
            what are this articles about:  
           
            ${news}
            
            `

            const askForInterpretationInEnglish = await ask(question)
            console.log(askForInterpretationInEnglish)
        }
    }
});