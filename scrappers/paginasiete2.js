const cheerio = require('cheerio');
const request = require('request-promise');

const url = 'https://www.paginasiete.bo';

request(url)
    .then(html => {

        const $ = cheerio.load(html);
        const links = $('.headline a');

        links.each((i, link) => {
            const postUrl = $(link).attr('href');
            request(`${url}${postUrl}`).then(postHtml => {
                const $post = cheerio.load(postHtml);
                const title = $post('.headline h1').text().trim();
                const content = $post('.texto').text().trim();

                console.log("****")
                console.log("TITULO: ", title)
                console.log("****")
                console.log("CONTENT:", content);
                console.log("****")
            });
        });
    })
    .catch(error => console.log(error));