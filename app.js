const cors = require("cors");
const express = require("express");
const app = express();
var multer = require("multer");
const rfpRoute = require("./routes/rfp");
const categoriesRoute = require("./routes/categories");
const subCategoriesRoute = require("./routes/subCategories");
const vendorsRoute = require("./routes/vendors");
var bodyParser = require("body-parser");
var fs = require("fs");
var upload = multer();
const port = 3001;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(upload.any());
/*app.use(express.urlencoded({ extended: true })); */
/*app.use(upload.array()); */
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/rfps", rfpRoute);
app.use("/categories", categoriesRoute);
app.use("/subcategories", subCategoriesRoute);
app.use("/vendors", vendorsRoute);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
