import React, { createContext, useContext, useState, useEffect } from "react"; // React và hook

const ThemeContext = createContext(); // Tạo context cho chủ đề sáng/tối

export function ThemeProvider({ children }) { // Provider cho theme
  const [isDark, setIsDark] = useState(false); // Trạng thái dark mode

  useEffect(() => { // Đồng bộ class theme với Bootstrap 5.3
    document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v); // Đảo trạng thái theme

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}> {/* Cung cấp state và action */}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { // Hook tiện ích để dùng theme
  return useContext(ThemeContext);
}
