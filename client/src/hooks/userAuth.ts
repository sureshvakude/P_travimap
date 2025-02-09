import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("travi_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for changes in localStorage across tabs
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("travi_user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (userData: any) => {
    localStorage.setItem("travi_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("travi_user");
    setUser(null);
  };

  const getUser = () => {
    const storedUser = localStorage.getItem("travi_user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  return { user, login, logout, getUser };
};

export default useAuth;