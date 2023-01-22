const darkBackgorundColor = "#999999";
const darkTextColor = "#660032";
const lightBackgorundColor = "#FFFFFF";
const lightTextColor = "#660032";

class themes {
  static _currTheme = "light";
  static _currTextTheme = this._currTheme === 'light' ? "#660032" : "#660032";
  static _currBackColorTheme = this._currTheme === 'light' ? "#FFFFFF" : "#999999";
  static _currTimeTheme = this._currTheme === 'light' ? "#65676b" : "#FFFFFF";

  static darkBackgorundColor() {
    return darkBackgorundColor;
  }
  static darkTextColor() {
    return darkTextColor;
  }
  static lightBackgorundColor() {
    return lightBackgorundColor;
  }
  static lightTextColor() {
    return lightTextColor;
  }

  static _currTheme() {
    return this._currTheme;
  }

  static currTheme(mode) {
    if (mode !== null) {
      switch (mode) {
        case "light":
          this._currTheme = "light";
          this._currTextTheme = "#660032";
          this._currBackColorTheme = "#FFFFFF";
          this._currTimeTheme = "#65676b";
          break;
        case "dark":
          this._currTheme = "dark";
          this._currTextTheme = "#660032";
          this._currBackColorTheme = "#999999";
          this._currTimeTheme = "#FFFFFF";
          break;
      }
    }

    return {
      theme: this._currTheme,
      textTheme: this._currTextTheme,
      backColorTheme: this._currBackColorTheme,
      timeTheme: this._currTimeTheme,
    };
  }
}

export default themes;
