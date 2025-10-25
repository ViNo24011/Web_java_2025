import { create } from "zustand";
import { ITicket } from "@/types";
import { PAYMENT_STATUS, TICKET_TYPE } from "@/lib/constants";
import dayjs from "dayjs";

interface BookingState {
  data: ITicket;
  isLoading: boolean;
  setData: (data: Partial<ITicket>) => void;
  setIsLoading: (isLoading: boolean) => void;
  clearData: () => void;
  setTicketType: (ticketType: string) => void;
}

const initialData: ITicket = {
  ticket_id: "",
  account_id: "",
  name: "",
  address: "",
  phone: "",
  ticket_type: "oneWay",
  total_price: 0,
  payment_status: PAYMENT_STATUS.pending,
  created_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  note: "",
  start_location: "",
  end_location: "",
  outbound: {
    trip_id: "",
    price: 0,
    start_time: "",
    coach_type: "",
    coach_id: "",
    ordered_seat: [],
  },
  return: {
    trip_id: "",
    price: 0,
    start_time: "",
    coach_type: "",
    coach_id: "",
    ordered_seat: [],
  },
};

const useBookingStore = create<BookingState>((set) => ({
  data: initialData,
  isLoading: false,
  setData: (newData: any) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  clearData: () => set({ data: initialData, isLoading: false }),

  setTicketType: (ticketType: string) =>
    set((state) => ({
      data: { ...state.data, ticket_type: ticketType },
    })),
}));

export default useBookingStore;
