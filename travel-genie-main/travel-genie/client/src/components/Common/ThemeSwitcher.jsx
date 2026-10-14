import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeSwitcher({ themeVariant = "auto" }) {
  const { theme, changeTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    changeTheme(isDark ? "light" : "dark");
  };

  const buttonStyle =
    themeVariant === "dark"
      ? "bg-white/10 border-white/15 text-white/90 hover:text-white hover:border-[#F58220]"
      : "bg-gray-100/90 hover:bg-gray-200/80 border-gray-200/90 text-gray-700 hover:text-gray-900 dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/15 dark:text-white hover:border-[#F58220] dark:hover:border-[#F58220]";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        p-2
        rounded-xl
        border
        transition
        duration-200
        cursor-pointer
        flex
        items-center
        justify-center
        shrink-0
        shadow-sm
        ${buttonStyle}
      `}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={16} className="text-amber-400 animate-in spin-in-180 duration-300" />
      ) : (
        <Moon size={16} className="text-amber-500 dark:text-blue-300 animate-in spin-in-180 duration-300" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
