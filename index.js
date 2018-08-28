var https = require('https');
const cheerio = require('cheerio');

module.exports.getEntry = getEntry();

function getEntry(subject, callback) {
    var subject = subject.toLocaleLowerCase();
    https.get('https://eksisozluk.com/' + encodeURI(subject), (res) => {
        var entries = [];
        var body = '';
        var movedto = '';
        process.on("uncaughtException", function (err) {
            console.log(err);
        })
        res.on('data', (d) => {
            body += d;
            var $ = cheerio.load(body);
            movedto = $("a").attr("href");
            https.get("https://eksisozluk.com" + encodeURI(movedto), (res2) => {
                var body2 = '';
                res2.on('data', (d2) => {
                    body2 += d2;
                })
                res2.on('end', function () {
                    var t = cheerio.load(body2);
                    var authors = [];
                    var texts = [];
                    t(".entry-author").each(function (i, elem) {
                        authors[i] = t(this).text();
                    })
                    t(".content").each(function(i, elem){
                        texts[i] = t(this).text();
                    })
                    for(i = 0; i < authors.length; i++){
                        entries.push(new Entry(texts[i], authors[i]));
                    }
                    var entry = "asdas";
                    if (entry == null || entry == " " || entry == "") {
                        var movedto2 = t("a").attr("href");
                        https.get("https://eksisozluk.com" + encodeURI(movedto2), (res3) => {
                            var body3 = ' ';
                            res3.on("data", (d3) => {
                                body3 += d3;
                            })
                            res3.on("end", function () {
                                var f = cheerio.load(body3);
                                f(".content").each(function(i, elem){
                                    texts[i] = f(this).text();
                                })
                                f(".entry-author").each(function(i, elem){
                                    authors[i] = f(this).text();
                                })
                                for(i = 0; i < authors.length; i++){
                                    entries.push(new Entry(texts[i], authors[i]));
                                }
                               // console.log(entries[0]);
                                callback(entries);
                            })
                        })
                    } else {
                        //console.log(entries);
                        callback(entries);
                    }
                })
            })
        });

    }).on('error', (e) => {
        console.error(e);
    });
}

function Entry(text, author){
    this.text = text;
    this.author = author;
}

