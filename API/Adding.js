import axios from "axios";
import { Alert } from "react-native";

const ip = "192.168.100.10";
const port = "2008";
const serverAddress = "https://" + ip + ":" + port;

export default function Adding(action, data, callback) {
  console.log(action + ": " + data);
  Alert.alert(
    "Action Start",
    "Action Type: " + action + "\n" + "Data: " + data
  );
  axios
    .post(serverAddress + "/" + action, data, {
      //config
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.success == true) {
        callback();
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      alert(err);
    });
}
