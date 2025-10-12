import { TICKET_TYPE } from "@/lib/constants";
import { create } from "zustand";

interface WidgetState {
  data: any;
  setData: (data: any) => void;
  clearData: () => void;
  setTicketType: (ticketType: string) => void;
}

const initialData: any = {
  start_location: "",
  end_location: "",
  start_date: "",
  return_date: "",
  ticket_type: TICKET_TYPE.oneWay,
};

const useWidgetStore = create<WidgetState>((set) => ({
  data: initialData,
  setData: (data: any) =>
    set({
      data: { ...initialData, ...data },
    }),
  clearData: () => set({ data: initialData }),
  setTicketType: (ticketType: string) =>
    set((state) => ({
      data: { ...state.data, ticket_type: ticketType },
    })),
}));

export default useWidgetStore;
