const express = require("express");
const expressGraphQL = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: false
  }),
  expressPlayground({ endpoint: "/graphql" })
);

module.exports = app;
