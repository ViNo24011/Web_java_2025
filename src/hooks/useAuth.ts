import { useState, useEffect } from "react";
import { IAccount } from "@/types";

interface AuthState {
  isLoggedIn: boolean;
  userData: IAccount;
  isLoading: boolean;
}

const initialData: IAccount = {
  account_id: "",
  name: "",
  username: "",
  password: "",
  role: "",
  phone: "",
  address: "",
  order_history: [],
  note: "",
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userData: initialData,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored = localStorage.getItem("login-storage");
        if (stored) {
          const parsed = JSON.parse(stored);
          const state = parsed.state;

          if (state && state.isLoggedIn && state.data) {
            setAuthState({
              isLoggedIn: state.isLoggedIn,
              userData: state.data,
              isLoading: false,
            });
            return;
          }
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }

      // If no valid auth data found
      setAuthState({
        isLoggedIn: false,
        userData: initialData,
        isLoading: false,
      });
    };

    checkAuth();
  }, []);

  return authState;
};

export const useRequireAdmin = () => {
  const { isLoggedIn, userData, isLoading } = useAuth();

  return {
    isLoggedIn,
    userData,
    isLoading,
    isAdmin: isLoggedIn && userData.role === "admin",
  };
};
