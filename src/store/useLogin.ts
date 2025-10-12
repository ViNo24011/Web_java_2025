import { IAccount } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  isLoggedIn: boolean;
  data: IAccount;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setData: (data: IAccount) => void;
  clearData: () => void;
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

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      data: initialData,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setData: (data: IAccount) => set({ data }),
      clearData: () => set({ data: initialData, isLoggedIn: false }),
    }),
    {
      name: "login-storage",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        data: state.data,
      }),
    }
  )
);

export default useLoginStore;
