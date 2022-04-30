const path = require("path");
// define path to homepage
module.exports = (app) => app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/dist/index.html")));
