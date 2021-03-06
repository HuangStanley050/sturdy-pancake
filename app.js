const express = require("express");
const expressGraphQL = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const dataBaseURI = "mongodb://localhost:27017/graphqlPrimer";
const app = express();
mongoose
  .connect(dataBaseURI)
  .then(client => console.log("connected"))
  .catch(err => console.log(err));
app.use("/graphql", express.json(), expressGraphQL({ schema }));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;
