const express = require("express");
const router = express.Router();
const Url = require("../../models/url");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  const url = req.body.inputUrl;
  let shortenUrl = "";
  Url.findOne({ url })
    .lean()
    .then(async (searchResult) => {
      shortenUrl = searchResult ? searchResult.shortenUrl : "";
      if (shortenUrl.length === 0) {
        //generate a shorten url
        shortenUrl = generateShorteUrl(url);
        //look up shortenUrl and makesure this havent exist before
        let isExist = true;
        while (isExist) {
          isExist = await Url.exists({ shortenUrl });
          shortenUrl = generateShorteUrl(url);
        }
        //save it to db
        await Url.create({ url, shortenUrl });
      }
      //take the shorten url and render the result
      res.render("success", { url, shortenUrl });
    });
});

router.get("/:shortenUrl", (req, res) => {
  const shortenUrl = req.params.shortenUrl;
  Url.findOne({ shortenUrl })
    .lean()
    .then((result) => {
      const redirectUrl = result ? `http://${result.url}` : "/";
      res.redirect(redirectUrl);
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
