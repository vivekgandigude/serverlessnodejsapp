const serverless = require("serverless-http");
const app = require('./handler')
const port = process.env.PORT || 8011;

// Server
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});
//module.exports.handler = serverless(app);