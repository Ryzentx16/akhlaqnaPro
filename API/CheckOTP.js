import axios from 'axios';

const ip = "192.168.100.10";
const port = "2008";
const serverAddress = "https://" + ip + ':' + port;

export default function CheckOTP(data, callback) {
  
  console.log(data);
  
  axios
    .post(serverAddress + "/checkOTP", data, {

      //config
      headers: {
        "Content-Type": "application/json",
        // Authorization: Bearer ${Global.AuthenticationToken},
        Accept: "application/json",
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
