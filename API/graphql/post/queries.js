import { gql } from "@apollo/client";
import Handler from "../handler";
import { GraphQlParamsGenerator } from "../utils";

const Queries = {
  Create: async (params) => {
    const query = gql`
      mutation ($input: AddPostInput!) {
        addPost(input: $input) {
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

    return result.data.addPost;
  },

  Edit: async (id, params) => {
    const query = gql`
      mutation ($id: Int!, $input: EditPostInput!) {
        editPost(id: $id, input: $input) {
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

    return result.data.editPost;
  },

  Like: async (params) => {
    const query = gql`
      mutation ($id: Int!, $userId: Int!, $isLike: Boolean!) {
        postLike(id: $id, userId: $userId, isLike: $isLike) {
          success
          message
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

    return result.data.postLike;
  },

  Retrieve: async (params) => {
    const { paramDefsString, paramBindingsString } =
      GraphQlParamsGenerator.default(params);

    const query = gql`
      query (${paramDefsString}) {
        post(${paramBindingsString}) {
          id
          createdDateTime
          content
          numOfComments
          numOfLikes
          numOfShares
          area
          location
          image
          postTypes
          isLikedByMe
          user {
            id
            firstName
            lastName
            profileImage
            phoneNumber
          }
        }
      }
    `;

    const result = await Handler.Query({
      statement: query,
      variables: params,
    });
    // console.warn(result.data.post[2]);
    if ("type" in result && "errors" in result) {
      //error
      return result;
    }

    return result.data.post;
  },
};

export default Queries;
