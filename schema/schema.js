const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
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
        //console.log(parentValue);
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
        const companyId = parentValue._id;

        let results = await Company.findOne({ _id: companyId })
          .populate("userId")
          .exec();
        //console.log(results.userId);
        return results.userId;
      }
    }
  })
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (parentValue, args) => {
        const { id } = args;
        return await User.findByIdAndRemove({ _id: id });
      }
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve: async (parentValue, args) => {
        const { email, firstName, companyId } = args;

        const newUser = new User({
          email,
          firstName,
          companyId
        });
        const result = await newUser.save();
        return result;
      }
    }
  }
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
  query: RootQuery,
  mutation
});
