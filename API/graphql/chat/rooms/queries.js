import { gql } from "@apollo/client";
import Handler from "../../handler";
import { GraphQlParamsGenerator } from "../../utils";

const Queries = {
  Create: async (params) => {
    const query = gql`
      mutation ($input: AddChatRoomInput!) {
        addChatRoom(input: $input) {
          success
          message
          errors
          roomId
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

    return result.data.addChatRoom;
  },

  Retrieve: async (params) => {
    const { paramDefsString, paramBindingsString } =
      GraphQlParamsGenerator.default(params);

    const query = gql`
      query (${paramDefsString}) {
        chatRoom(${paramBindingsString}) {
          id
          createdDateTime
          user {
            id
            firstName
            lastName
            profileImage
          }
          lastMessage{
              createdDateTime
              content
              image
              senderUser{
                  id
              }
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

    return result.data.chatRoom;
  },
};

export default Queries;
