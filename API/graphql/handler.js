import { ApolloClient, InMemoryCache } from "@apollo/client";

const domain = "192.168.1.8";
const port = "2000";
const endPointUrl = `http://28d0-156-211-236-150.eu.ngrok.io/graphql`
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

const ClearCache = async () => {
  await client.clearStore().catch((er) => console.error(er));
};

const Handler = {
  Query: async (params) => {
    // console.log(params)
    try {
      const result = await client.query({
        query: params.statement,
        variables: params.variables,
      });

      // await ClearCache();
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
