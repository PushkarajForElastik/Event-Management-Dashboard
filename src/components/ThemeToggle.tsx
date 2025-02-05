import React from "react";
import { Sun, Moon } from "lucide-react";
import { useStateContext } from "../context/StateContext";

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useStateContext();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme} className="flex items-center w-9 h-9 justify-center text-xs font-medium
                                  text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example
                                   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300
                                    dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400
                                     dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">
            {theme === "light" ? <Moon className="icon" /> : <Sun className="icon" />}
        </button>
    );
};

export default ThemeToggle;
