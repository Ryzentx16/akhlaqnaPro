import { io } from "socket.io-client";
import OurUser from "../../src/OurUser";
import domain from "../domain";

const Socket = io.connect(domain, {
  query: {
    userId: OurUser.user.id, // replace with the actual user ID
  },
});

export default Socket;
