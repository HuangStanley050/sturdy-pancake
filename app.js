const express = require("express");
const expressGraphQL = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const schema = require("./schema/schema");
const app = express();

app.use("/graphql", express.json(), expressGraphQL({ schema }));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;
