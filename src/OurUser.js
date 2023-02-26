class OurUser {
  static user = null;

  static getOurUser() {
    return this.user;
  }

  static setCurrUser(data) {
    this.user = data;

    return this.user;
  }
}

export default OurUser;