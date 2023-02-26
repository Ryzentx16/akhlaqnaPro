import { gql } from "@apollo/client";
import Handler from "../handler";
import { GraphQlParamsGenerator } from "../utils";

const Queries = {
  Create: async (params) => {
    const query = gql`
      mutation ($input: AddCommentInput!) {
        addComment(input: $input) {
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

    return result.data.addComment;
  },

  Edit: async (id, params) => {
    const query = gql`
      mutation ($id: Int!, $input: EditCommentInput!) {
        editComment(id: $id, input: $input) {
          success
          message
          errors
        }
      }
    `;

    const result = await Handler.Mutate({
      statement: query,
      variables: {
        id: id,
        input: params,
      },
    });

    if ("type" in result && "errors" in result) {
      //error
      return result;
    }

    return result.data.editComment;
  },

  Retrieve: async (params) => {
    const { paramDefsString, paramBindingsString } =
      GraphQlParamsGenerator.default(params);

    const query = gql`
      query (${paramDefsString}) {
        comment(${paramBindingsString}) {
        id
        createdDateTime
        content
        image
          user {
            id
            firstName
            lastName
          }
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
    return result.data.comment;
  },
};

export default Queries;
