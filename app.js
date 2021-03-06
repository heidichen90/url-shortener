const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const routes = require("./routes");
require("./config/mongoose");

const PORT = process.env.PORT || 3000;

//set up handlebars
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//set up body-parser
app.use(express.urlencoded({ extended: true }));

//set up router
app.use(routes);

// setting static files
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
