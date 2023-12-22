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
      mutation ($phoneNumber: String!, $password: String!) {
        loginUser(phoneNumber: $phoneNumber, password: $password) {
          success
          message
          result {
            id
            firstName
            lastName
            profileImage
            phoneNumber
            isOtpChecked
            roleLvl
          }
          errors
        }
      }
    `;

    const result = await Handler.Mutate({
      statement: query,
      variables: params,
    });

    if ("type" in result && "errors" in result) {
      //error
      return result;
    }

    return result.data.loginUser;
  },

  Edit: async (params) => {
    const query = gql`
      mutation ($phoneNumber: String!, $input: EditUserInput!) {
        editUser(phoneNumber: $phoneNumber, input: $input) {
          success
          message
          errors
        }
      }
    `;

    const result = await Handler.Query({
      statement: query,
      variables: {
        phoneNumber: params.phoneNumber,
        input: params.input,
      },
    });

    if ("type" in result && "errors" in result) {
      //error
      return result;
    }

    return result.data.editUser;
  },
};

export default Queries;
