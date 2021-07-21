const db = require("../../config/mongoose");
const Url = require("../url");
const mockData = require("../../mock_data/shortenUrl.json");

db.once("open", () => {
  Url.create(mockData.shortenurlSeeds)
    .then(() => {
      console.log("url seeder done!");
      db.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
