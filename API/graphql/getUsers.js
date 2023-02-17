import { gql } from "@apollo/client";
import client from "./connection";

export async function loadUsersAsync() {
  let r = null;

  await client
    .query({
      query: gql`
        {
          users {
            ID
            firstName
            lastName
          }
        }
      `,
    })
    .then((result) => {
      console.log(JSON.stringify(result.data));
      r = result;
      return result;
    })
    .catch((er) => {
      console.error(er);
      return er;
    });

  await client.clearStore().catch((er) => console.error(er));
  return r;
}
