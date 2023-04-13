import { createContext } from "react";
import ThemeController from "./ThemeController";

const ThemeContext = createContext({
  theme: ThemeController.getColors(),
  isDarkMode: ThemeController.getCurrentMode() === "dark" ? true : false,
  toggleTheme: () => ThemeController.switchMode(),
});

export default ThemeContext;
