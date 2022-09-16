import { loremIpsum } from "lorem-ipsum";
import { writeFileSync } from "fs";

writeFileSync(
  "dbtest.session.sql",
  `CREATE TABLE objekti (
    user_id serial PRIMARY KEY,
    naslov VARCHAR ( 100 ) NOT NULL,
    opis VARCHAR ( 5000 ) NOT NULL 
  );\n`,
  { flag: "a" }
)

writeFileSync(
  "mongo.js",
  `db = connect('mongodb://root:example@localhost:27017/objekti');\n`,
  { flag: "a" }
);


for (let i = 0; i < 100; i++) {
  let naslovi = loremIpsum({
    count: 1,
    units: "sentences",
    sentenceLowerBound: 1, // Min. number of words per sentence.
    sentenceUpperBound: 5, // Max. number of words per sentence.
  });

  let opisi = loremIpsum({
    count: 1,
    format: "plain", // "plain" or "html"
    paragraphLowerBound: 1, // Min. number of sentences per paragraph.
    paragraphUpperBound: 100, // Max. number of sentences per paragarph.
    units: "paragraph",
    sentenceLowerBound: 1, // Min. number of words per sentence.
    sentenceUpperBound: 7, // Max. number of words per sentence.
    suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
  });

  writeFileSync(
    "dbtest.session.sql",
    `INSERT INTO objekti (naslov, opis) VALUES ('${naslovi}','${opisi}');\n`,
    { flag: "a" }
  );

  writeFileSync(
    "mongo.js",
    `db.objekti.insert({
    naslov: '${naslovi}',
    opis: '${opisi}'
  })\n`,
    { flag: "a" }
  );
}
