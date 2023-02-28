import { gql } from "@apollo/client";
import Handler from "../../handler";
import { GraphQlParamsGenerator } from "../../utils";

const Queries = {
  Retrieve: async (params) => {
    const { paramDefsString, paramBindingsString } =
      GraphQlParamsGenerator.default(params);

    const query = gql`
      query (${paramDefsString}) {
        chatMessage(${paramBindingsString}) {
          id
          createdDateTime
          content
          image
          senderUser {
            id
            firstName
            lastName
            profileImage
          }
          recieverUser{
            id
            firstName
            lastName
            profileImage
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

    return result.data.chatMessage;
  },
};

export default Queries;
