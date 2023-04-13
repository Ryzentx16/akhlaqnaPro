import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";
import ThemeController from "./ThemeController";

export default ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(ThemeController.lightColors);

  useEffect(() => {
    setTheme(
      isDarkMode ? ThemeController.darkColors : ThemeController.lightColors
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
