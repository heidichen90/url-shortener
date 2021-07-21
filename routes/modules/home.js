const express = require("express");
const router = express.Router();
const Url = require("../../models/url");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  console.log(req.body);
  const url = req.body.inputUrl;
  let shortenResult = "";
  //look up in db to check if exisitng record
  //need to move it out as a function and then do a await here
  Url.findOne({ url })
    .lean()
    .then((shortenurl) => {
      shortenResult = shortenurl;
      if (!shortenurl) {
        //generate a shorten url and make sure it's not exist
        //save it to db
      }
      //take the shorten url and render the result
      console.log(shortenResult);
    });
});

module.exports = router;
