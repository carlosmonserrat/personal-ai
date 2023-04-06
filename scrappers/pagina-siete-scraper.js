const request = require('request');
const cheerio = require('cheerio');
//
// request('https://www.paginasiete.bo', function (error, response, html) {
//     if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);
//         const allClasses = [];
//
//         $('[class]').each(function() {
//             const classes = $(this).attr('class').split(' ');
//             classes.forEach(function(className) {
//                 if (allClasses.indexOf(className) === -1) {
//                     allClasses.push(className);
//                 }
//             });
//         });
//
//         console.log(allClasses);
//     }
// });

request('https://www.paginasiete.bo', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const headlines = [];

        $('.headline h2').each(function() {
            const title = $(this).text().trim();
            headlines.push(title);
        });

        console.log(headlines);
    }
});