var https = require('https');
const cheerio = require('cheerio');

 module.exports.getEntry = function(subjectname, callback) {
    subjectname = subjectname.replace(/ç/g, "c");
    subjectname = subjectname.replace(/ğ/g, "g");
    subjectname = subjectname.replace(/ü/g, "u");
    subjectname = subjectname.replace(/ö/g, "o");
    subjectname = subjectname.replace(/ş/g, "s");
    subjectname = subjectname.replace(/ı/g, "i");
    subjectname = subjectname.toLocaleLowerCase();
    https.get("https://eksisozluk.com/" + subjectname, (res) => {
        var body = "";
        var movedto = "";
        res.on('data', (d) => {
            body += d;
            var $ = cheerio.load(body);
            movedto = $("a").attr("href");
            https.get("https://eksisozluk.com/" + movedto, (res2) => {
                var body2 = "";
                res2.on("data", (d2) => {
                    body2 += d2;
                })
                res2.on("end", function () {
                    var t = cheerio.load(body2);
                    var entry = t(".content").first().text();
                    entry = entry.replace(/(\r\n\t|\n|\r\t)/gm,"");
                    callback(entry);
                })
            })
        })
    })
}
