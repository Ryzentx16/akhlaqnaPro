import axios from 'axios';

export default function AddComment(data, callback) {
  
  console.log(data);

  axios
    .post("http://192.168.100.10:2008/addComment", data, {
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
