import { ApolloClient, InMemoryCache } from "@apollo/client";
import domain from "../domain";

const endPointUrl = `${domain}/graphql`;
const client = new ApolloClient({
  uri: endPointUrl,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const Handler = {
  Query: async (params) => {
    try {
      const result = await client.query({
        query: params.statement,
        variables: params.variables,
      });

      return result;
    } catch (error) {
      console.error("req error: " + error);
      return {
        message: "Appolo client error",
        errors: [error],
        type: "Appolo errror",
      };
    }
  },

  Mutate: async (params) => {
    try {
      const result = await client.mutate({
        mutation: params.statement,
        variables: params.variables,
      });

      // await ClearCache();
      return result;
    } catch (error) {
      console.error("req error: " + error);
      return {
        success: false,
        message: "Appolo client error",
        errors: [error],
        type: "Appolo errror",
      };
    }
  },
};

export default Handler;
