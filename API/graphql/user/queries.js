import { gql } from "@apollo/client";
import Handler from "../handler";

const Queries = {
  Signup: async (params) => {
    const query = gql`
      mutation ($input: AddUserInput!) {
        addUser(input: $input) {
          success
          message
          errors
        }
      }
    `;

    const result = await Handler.Mutate({
      statement: query,
      variables: {
        input: params,
      },
    });

    if ("type" in result && "errors" in result) {
      //error
      return result;
    }

    return result.data.addUser;
  },
  Login: async (params) => {
    const query = gql`
      query ($phoneNumber: String!, $password: String!) {
        user(phoneNumber: $phoneNumber, password: $password) {
          id
          firstName
          lastName
          profileImage
          phoneNumber
          isOtpChecked
          roleLvl
        }
      }
    `;

    const result = await Handler.Query({
      statement: query,
      variables: params,
    });

    if ("type" in result && "errors" in result) {
      //error
      return result;
    }

    return result.data.user;
  },
};

export default Queries;
