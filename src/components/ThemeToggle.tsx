import React from "react";
import { Sun, Moon } from "lucide-react";
import { useStateContext } from "../context/StateContext";

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useStateContext();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme} className="cursor-pointer">
            {theme === "light" ? <Moon className="icon" /> : <Sun className="icon" />}
        </button>
    );
};

export default ThemeToggle;
