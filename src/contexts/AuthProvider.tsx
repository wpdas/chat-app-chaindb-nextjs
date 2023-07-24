import getUser from "@app/services/getUser";
import getUserById from "@app/services/getUserById";
import newUser from "@app/services/newUser";
import { useRouter } from "next/router";
import { createContext, useCallback } from "react";

type AuthContextProps = {
  userId?: string;
  username?: string;
  /**
   * Assinar
   * @param username
   * @param password
   * @returns
   */
  signup: (username: string, password: string) => Promise<string>;
  /**
   * Entrar
   * @param username
   * @param password
   * @returns
   */
  signin: (username: string, password: string) => Promise<string>;
  logout: () => void;
  /**
   * Used to check the previous logged in user
   * @param userId
   * @returns
   */
  checkUser: (userId: string) => Promise<boolean>;
};

const defaultValue: AuthContextProps = {
  signup: () => {
    throw new Error("signup must be defined");
  },
  signin: () => {
    throw new Error("signin must be defined");
  },
  logout: () => {
    throw new Error("logout must be defined");
  },
  checkUser: () => {
    throw new Error("checkUser must be defined");
  },
};

export const AuthContext = createContext(defaultValue);

const isClient = () => typeof window !== "undefined" && window.localStorage;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = isClient()
    ? localStorage.getItem("userId") || undefined
    : undefined;
  const username = isClient()
    ? localStorage.getItem("username") || undefined
    : undefined;

  const router = useRouter();

  // Assinar
  const signup = useCallback(async (username: string, password: string) => {
    const res = await newUser({ username, password });
    if (!res.success) {
      return res.error_msg;
    }

    // If succeed, save user info
    localStorage.setItem("userId", res.data!.id);
    localStorage.setItem("username", username);
    return "";
  }, []);

  // Entrar
  const signin = useCallback(async (username: string, password: string) => {
    const res = await getUser({ username, password });
    if (!res.success) {
      return res.error_msg;
    }

    // If succeed, save user info
    localStorage.setItem("userId", res.data!.id);
    localStorage.setItem("username", username);
    return "";
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    router.replace("/");
  }, [router]);

  /**
   * Check if user exists
   */
  const checkUser = useCallback(async () => {
    if (!userId) {
      return false;
    }
    const res = await getUserById({ userId });
    return res.success;
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        signin,
        signup,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
