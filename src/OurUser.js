import Storage from "./components/Storage";

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

  static logOut = async (next) => {
    await Storage.storeData("keepLogging", false);
    await Storage.storeData("firstLogin", false);
    await Storage.storeData("UserData", {});

    // API Logout
    // ..........

    next();
  };
}

export default OurUser;
