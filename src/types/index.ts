export interface ISchedule {
  trip_id?: string;
  start_location: string;
  end_location: string;
  start_time: string;
  price: number;
  status: string;
  coach_type: string;
  coach_id: string;
  total_seat: number;
  ordered_seat: string[];
}

export interface ICoach {
  coach_id: string;
  coach_type: string;
  total_seat: number;
  status: string; //running, maintenance, inactive
}

export interface IAccount {
  account_id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  order_history: string[];
  note: string;
}

export interface ITicket {
  ticket_id?: string;
  account_id?: string;
  name?: string;
  address?: string;
  phone?: string;
  ticket_type?: string;
  total_price?: number;
  payment_status?: string;
  created_time?: string;
  note?: string;
  start_location?: string;
  end_location?: string;
  outbound: {
    trip_id: string;
    start_time: string;
    coach_type: string;
    coach_id: string;
    ordered_seat: string[];
    price: number;
  };
  return?: {
    trip_id: string;
    start_time: string;
    coach_type: string;
    coach_id: string;
    ordered_seat: string[];
    price: number;
  };
}
