"use strict";
exports.__esModule = true;
var lorem_ipsum_1 = require("lorem-ipsum");
var fs_1 = require("fs");
(0, fs_1.writeFileSync)("dbtest.session.sql", "CREATE TABLE objekti (\n    user_id serial PRIMARY KEY,\n    naslov VARCHAR ( 100 ) NOT NULL,\n    opis VARCHAR ( 5000 ) NOT NULL \n  );\n", { flag: "a" });
(0, fs_1.writeFileSync)("mongo.js", "db = connect('mongodb://root:example@localhost:27017/objekti');\n", { flag: "a" });
for (var i = 0; i < 100; i++) {
    var naslovi = (0, lorem_ipsum_1.loremIpsum)({
        count: 1,
        units: "sentences",
        sentenceLowerBound: 1,
        sentenceUpperBound: 5
    });
    var opisi = (0, lorem_ipsum_1.loremIpsum)({
        count: 1,
        format: "plain",
        paragraphLowerBound: 1,
        paragraphUpperBound: 100,
        units: "paragraph",
        sentenceLowerBound: 1,
        sentenceUpperBound: 7,
        suffix: "\n"
    });
    (0, fs_1.writeFileSync)("dbtest.session.sql", "INSERT INTO objekti (naslov, opis) VALUES ('".concat(naslovi, "','").concat(opisi, "');\n"), { flag: "a" });
    (0, fs_1.writeFileSync)("mongo.js", "db.objekti.insert({\n    naslov: '".concat(naslovi, "',\n    opis: '").concat(opisi, "'\n  })\n"), { flag: "a" });
}
