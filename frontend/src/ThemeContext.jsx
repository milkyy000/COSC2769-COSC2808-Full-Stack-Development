// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const setDark = () => {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
    };

    const setLight = () => {
        setTheme("light");
        localStorage.setItem("theme", "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setDark, setLight }}>
            {children}
        </ThemeContext.Provider>
    );
};
