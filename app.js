const express = require("express");
const expressGraphQL = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const dataBaseURI = "mongodb://mongo/graphqlPrimer";
const app = express();
mongoose.connect(dataBaseURI, () => console.log("connected to mongo"));
app.use("/graphql", express.json(), expressGraphQL({ schema }));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;
