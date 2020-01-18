const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;
const User = require("../models/User");
const Company = require("../models/Company");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: async (parentValue, args) => {
        const { companyId } = parentValue;
        return await Company.findOne({ _id: companyId });
      }
    }
  })
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parentValue, args) => {
        const { companyId } = parentValue;
        return "haha";
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: async (parentValue, args) => {
        return await Company.findOne({ _id: args.id });
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (parentValue, args) => {
        return await User.findOne({ _id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
