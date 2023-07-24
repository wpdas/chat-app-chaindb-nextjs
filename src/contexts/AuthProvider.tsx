import { database } from "@app/database";
import { createContext, useCallback, useState } from "react";

type AuthContextProps = {
  userId?: string;
  username?: string;
  error: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  cleanError: () => void;
  /**
   * Used to check the previous logged in user
   * @param userId
   * @returns
   */
  checkUser: (userId: string) => Promise<boolean>;
};

const defaultValue: AuthContextProps = {
  error: "",
  login: () => {
    throw new Error("login must be defined");
  },
  logout: () => {
    throw new Error("logout must be defined");
  },
  cleanError: () => {
    throw new Error("cleanError must be defined");
  },
  checkUser: () => {
    throw new Error("checkUser must be defined");
  },
};

export const AuthContext = createContext(defaultValue);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = localStorage.getItem("userId") || undefined;
  const username = localStorage.getItem("username") || undefined;
  const [error, setError] = useState("");

  const login = useCallback(async (username: string, password: string) => {
    const res = await database.create_user_account(username, password);
    if (!res.success) {
      setError(res.error_msg);
      return;
    }

    // If succeed, save user info
    localStorage.setItem("userId", res.data!.id);
    localStorage.setItem("username", username);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    // TODO: Go to Home
  }, []);

  const cleanError = useCallback(() => {
    setError("");
  }, []);

  /**
   * Check if user exists
   */
  const checkUser = useCallback(async () => {
    if (!userId) {
      return false;
    }
    const res = await database.get_user_account_by_id(userId);
    return res.success;
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{ userId, username, error, login, logout, cleanError, checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
