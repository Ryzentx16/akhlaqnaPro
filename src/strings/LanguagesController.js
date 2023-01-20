import React, { useState } from "react";
import ar from "./ar";
import en from "./en";

class languages {
  static _currLang = ar;
  static _langType = 'Ar';

  static langType() {
    return this._langType;
  }

  static currLang(lang) {
    if (lang !== null) {
      switch (lang) {
        case "En":
          //   console.warn(lang);
          this._langType = 'En';
          this._currLang = en;
          break;
        case "Ar":
          //   console.warn(lang);
          this._langType = 'Ar';
          this._currLang = ar;
          break;
      }
    }

    return this._currLang;
  }
}

export default languages;
