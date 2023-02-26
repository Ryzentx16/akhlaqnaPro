import { gql } from "@apollo/client";
import client from "./connection";

const checkUserAsync = async (phoneNumber, pass) => {
  /* #region  Checking Using apollo */
  let r = null;
  // console.log(pass);

  await client
    .mutate({
      mutation: gql`
        mutation ($phoneNumber: String!, $pw: String!) {
          checkUser(phoneNumber: $phoneNumber, password: $pw) {
            PhoneNumber
            password
          }
        }
      `,
      variables: {
        phoneNumber: phoneNumber,
        pw: pass,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result.data));
      r = JSON.stringify(result.data);
      return r;
    })
    .catch((er) => {
      console.error("req error: " + er);
      return er;
    });
  /* #endregion */

  /* #region  Checking Using passport */
  // passport.use(
  //   new LocalStrategy(
  //     {
  //       phoneNumber: phoneNumber,
  //       password: password,
  //       session: true,
  //     },
  //     function (phonenumber, password, done) {
  //       User.findOne({ phonenumber: phonenumber }, function (err, user) {
  //         if (err) {
  //           return done(err);
  //         }
  //         if (!user) {
  //           return done(null, false);
  //         }
  //         if (!user.verifyPassword(password)) {
  //           return done(null, false);
  //         }
  //         return done(null, user);
  //       });
  //     }
  //   )
  // );
  /* #endregion */

  return r;
};

export default checkUserAsync;
