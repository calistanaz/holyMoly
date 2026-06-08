import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(
  null
);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("dark");

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const saved =
      await AsyncStorage.getItem("theme");

    if (saved === "light" || saved === "dark") {
      setThemeState(saved);
    }
  }

  async function setTheme(theme: Theme) {
    setThemeState(theme);
    await AsyncStorage.setItem("theme", theme);
  }

  async function toggleTheme() {
    const next =
      theme === "dark" ? "light" : "dark";

    await setTheme(next);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within ThemeProvider"
    );
  }

  return context;
}