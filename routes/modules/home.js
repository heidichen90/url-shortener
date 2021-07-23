const express = require("express");
const router = express.Router();
const Url = require("../../models/url");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  console.log(req.body);
  const url = req.body.inputUrl;
  let shortenUrl = "";
  //look up in db to check if exisitng record
  //need to move it out as a function and then do a await here
  Url.findOne({ url })
    .lean()
    .then((searchResult) => {
      shortenUrl = searchResult;
      if (!shortenUrl) {
        //generate a shorten url and make sure it's not exist
        shortenUrl = generateShorteUrl(url);
        //save it to db
        Url.create({ url, shortenUrl }).then(() => {
          res.render("success", { url, shortenUrl });
        });
      }
      //take the shorten url and render the result
      console.log(shortenResult);
    });
});

function generateShorteUrl(url) {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = "1234567890";

  const options = {
    length: "5",
    lowercase: "on",
    uppercase: "on",
    numbers: "on",
    excludeCharacters: undefined,
  };

  let collection = [];

  if (options.lowercase === "on") {
    collection = collection.concat([...lowerCaseLetters]);
  }

  if (options.uppercase === "on") {
    collection = collection.concat([...upperCaseLetters]);
  }

  if (options.numbers === "on") {
    collection = collection.concat([...numbers]);
  }

  if (options.symbols === "on") {
    collection = collection.concat([...symbols]);
  }

  //exclude thins user do not want
  if (options.excludeCharacters) {
    collection = collection.filter(
      (char) => !options.excludeCharacters.includes(char)
    );
  }

  //if it's empty collection, return error
  if (collection.length === 0) {
    return "This is not a valid option";
  }

  let result = "";

  for (let i = 1; i <= options.length; i++) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    result += collection[randomIndex];
    collection.splice(randomIndex, 1);
  }

  return result;
}

module.exports = router;
