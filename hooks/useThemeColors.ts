import { themes } from "@/constants/themes";
import { useTheme } from "@/context/ThemeContext";

export function useThemeColors() {
  const { theme } = useTheme();

  return themes[theme];
}