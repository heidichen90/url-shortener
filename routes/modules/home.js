const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const { generateShorteUrl } = require("../../utils/tools");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", async (req, res) => {
  try {
    const url = req.body.inputUrl;
    const currentUrl = req.headers.host;
    const protocol = req.protocol;
    let shortenUrl = "";
    let shortenUrlResult = await Url.findOne({ url }).lean();
    if (shortenUrlResult) {
      shortenUrl = shortenUrlResult.shortenUrl;
    } else {
      //generate a shorten url
      shortenUrl = generateShorteUrl(url);
      //look up shortenUrl and make sure its not in db
      let isExist = true;
      while (isExist) {
        isExist = await Url.exists({ shortenUrl });
        shortenUrl = generateShorteUrl(url);
      }
      //save it to db
      await Url.create({ url, shortenUrl });
    }
    //take the shorten url and render the result
    res.render("index", { url, shortenUrl, currentUrl, protocol });
  } catch (error) {
    console.log("error:", error );
  }
});

router.get("/:shortenUrl", (req, res) => {
  const shortenUrl = req.params.shortenUrl;
  Url.findOne({ shortenUrl })
    .lean()
    .then((result) => {
      const redirectUrl = result ? result.url : "/";
      res.redirect(redirectUrl);
    })
    .catch((error) => {
      console.log("error:", error );
    });
});

module.exports = router;
