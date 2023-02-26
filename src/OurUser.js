class OurUser {
  static user = {
    id: "u1",
    username: "Abdulrahman",
    name: "Abdulrahman .M",
    phoneNumber: "+97470031251",
    password: "70031251",
    profileImage: "http://ryzentx.online/myProfileExample.png",
  };

  static getOurUser() {
    return this.user;
  }

  static setCurrUser(data) {
    this.user = data;

    return this.user;
  }
}

export default OurUser;
