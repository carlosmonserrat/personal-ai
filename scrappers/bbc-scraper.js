
const cheerio = require('cheerio');
const request = require('request');

request('https://www.bbc.com/news', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const headlines = [];

        $('.gs-c-promo-heading__title, .gs-c-promo-summary').each(function() {
            const title = $(this).text().trim();
            headlines.push(title);
        });

        console.log(headlines);
    }else{
        console.log(error)
    }
});