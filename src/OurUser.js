class OurUser {
  static user = {
    id: 22,
    firstName: "kawkab",
    lastName: "elsharq",
    password: "123",
    profileImage: "",
    isOtpChecked: 0,
    phoneNumber: "+9741",
    roleLvl: 4,
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
