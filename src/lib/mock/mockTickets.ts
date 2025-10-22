import { ITicket } from "@/types";

export const mockTickets: ITicket[] = [
  {
    ticket_id: "TKT-001",
    account_id: "acc_cust_001",
    name: "Nguyễn Văn A",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phone: "0123456789",
    ticket_type: "return",
    total_price: 2400000,
    payment_status: "paid",
    created_time: "2024-01-15T08:30:00Z",
    note: "Khách hàng VIP",
    start_location: "TP. Hồ Chí Minh",
    end_location: "Hà Nội",
    outbound: {
      trip_id: "T-101",
      start_time: "2024-01-20T08:00:00Z",
      coach_type: "limousine",
      coach_id: "C-LIMO-001",
      ordered_seat: ["A1", "A2"],
      price: 1200000,
    },
    return: {
      trip_id: "T-102",
      start_time: "2024-01-25T14:00:00Z",
      coach_type: "limousine",
      coach_id: "C-LIMO-002",
      ordered_seat: ["A1", "A2"],
      price: 1200000,
    },
  },
  {
    ticket_id: "TKT-002",
    account_id: "acc_cust_002",
    name: "Trần Thị B",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    phone: "0987654321",
    ticket_type: "oneWay",
    total_price: 800000,
    payment_status: "paid",
    created_time: "2024-01-18T10:15:00Z",
    note: "Khách hàng thường xuyên",
    start_location: "TP. Hồ Chí Minh",
    end_location: "Đà Nẵng",
    outbound: {
      trip_id: "T-201",
      start_time: "2024-01-22T14:30:00Z",
      coach_type: "minibus",
      coach_id: "C-MINI-001",
      ordered_seat: ["B5"],
      price: 800000,
    },
  },
  {
    ticket_id: "TKT-003",
    account_id: "acc_cust_003",
    name: "Lê Văn C",
    address: "789 Đường DEF, Quận 3, TP.HCM",
    phone: "0369852147",
    ticket_type: "return",
    total_price: 1600000,
    payment_status: "pending",
    created_time: "2024-01-20T16:45:00Z",
    note: "Khách hàng mới",
    start_location: "Hà Nội",
    end_location: "Đà Nẵng",
    outbound: {
      trip_id: "T-301",
      start_time: "2024-01-25T09:00:00Z",
      coach_type: "limousine_cabin",
      coach_id: "C-CABIN-001",
      ordered_seat: ["C3", "C4"],
      price: 800000,
    },
    return: {
      trip_id: "T-302",
      start_time: "2024-01-28T15:00:00Z",
      coach_type: "limousine_cabin",
      coach_id: "C-CABIN-002",
      ordered_seat: ["C3", "C4"],
      price: 800000,
    },
  },
  {
    ticket_id: "TKT-004",
    account_id: "acc_cust_004",
    name: "Phạm Thị D",
    address: "321 Đường GHI, Quận 4, TP.HCM",
    phone: "0912345678",
    ticket_type: "oneWay",
    total_price: 600000,
    payment_status: "cancelled",
    created_time: "2024-01-22T12:20:00Z",
    note: "Hủy do thay đổi kế hoạch",
    start_location: "TP. Hồ Chí Minh",
    end_location: "Nha Trang",
    outbound: {
      trip_id: "T-401",
      start_time: "2024-01-26T11:00:00Z",
      coach_type: "minibus",
      coach_id: "C-MINI-002",
      ordered_seat: ["D8"],
      price: 600000,
    },
  },
  {
    ticket_id: "TKT-005",
    account_id: "acc_cust_005",
    name: "Hoàng Văn E",
    address: "654 Đường JKL, Quận 5, TP.HCM",
    phone: "0369852149",
    ticket_type: "return",
    total_price: 2000000,
    payment_status: "paid",
    created_time: "2024-01-25T09:30:00Z",
    note: "Khách hàng thân thiết",
    start_location: "Hà Nội",
    end_location: "TP. Hồ Chí Minh",
    outbound: {
      trip_id: "T-501",
      start_time: "2024-01-30T07:30:00Z",
      coach_type: "limousine",
      coach_id: "C-LIMO-003",
      ordered_seat: ["A5", "A6"],
      price: 1000000,
    },
    return: {
      trip_id: "T-502",
      start_time: "2024-02-05T16:00:00Z",
      coach_type: "limousine",
      coach_id: "C-LIMO-004",
      ordered_seat: ["A5", "A6"],
      price: 1000000,
    },
  },
  {
    ticket_id: "TKT-006",
    account_id: "acc_cust_006",
    name: "Võ Thị F",
    address: "987 Đường MNO, Quận 6, TP.HCM",
    phone: "0369852150",
    ticket_type: "oneWay",
    total_price: 700000,
    payment_status: "pending",
    created_time: "2024-01-28T14:10:00Z",
    note: "Chờ thanh toán",
    start_location: "TP. Hồ Chí Minh",
    end_location: "Cần Thơ",
    outbound: {
      trip_id: "T-601",
      start_time: "2024-02-02T13:00:00Z",
      coach_type: "minibus",
      coach_id: "C-MINI-003",
      ordered_seat: ["E12"],
      price: 700000,
    },
  },
  {
    ticket_id: "TKT-007",
    account_id: "acc_cust_007",
    name: "Đặng Văn G",
    address: "147 Đường PQR, Quận 7, TP.HCM",
    phone: "0369852151",
    ticket_type: "return",
    total_price: 1800000,
    payment_status: "paid",
    created_time: "2024-01-30T11:45:00Z",
    note: "Khách hàng doanh nhân",
    start_location: "Đà Nẵng",
    end_location: "TP. Hồ Chí Minh",
    outbound: {
      trip_id: "T-701",
      start_time: "2024-02-05T10:30:00Z",
      coach_type: "limousine_cabin",
      coach_id: "C-CABIN-003",
      ordered_seat: ["F1", "F2"],
      price: 900000,
    },
    return: {
      trip_id: "T-702",
      start_time: "2024-02-10T17:30:00Z",
      coach_type: "limousine_cabin",
      coach_id: "C-CABIN-004",
      ordered_seat: ["F1", "F2"],
      price: 900000,
    },
  },
  {
    ticket_id: "TKT-008",
    account_id: "acc_cust_008",
    name: "Bùi Thị H",
    address: "258 Đường STU, Quận 8, TP.HCM",
    phone: "0369852152",
    ticket_type: "oneWay",
    total_price: 500000,
    payment_status: "paid",
    created_time: "2024-02-01T08:20:00Z",
    note: "Khách hàng sinh viên",
    start_location: "TP. Hồ Chí Minh",
    end_location: "Vũng Tàu",
    outbound: {
      trip_id: "T-801",
      start_time: "2024-02-06T15:00:00Z",
      coach_type: "minibus",
      coach_id: "C-MINI-004",
      ordered_seat: ["G7"],
      price: 500000,
    },
  },
  {
    ticket_id: "TKT-009",
    account_id: "acc_cust_009",
    name: "Phan Văn I",
    address: "369 Đường VWX, Quận 9, TP.HCM",
    phone: "0369852153",
    ticket_type: "return",
    total_price: 1400000,
    payment_status: "pending",
    created_time: "2024-02-03T13:15:00Z",
    note: "Chờ xác nhận thanh toán",
    start_location: "Hà Nội",
    end_location: "Nha Trang",
    outbound: {
      trip_id: "T-901",
      start_time: "2024-02-08T12:00:00Z",
      coach_type: "limousine",
      coach_id: "C-LIMO-005",
      ordered_seat: ["H3", "H4"],
      price: 700000,
    },
    return: {
      trip_id: "T-902",
      start_time: "2024-02-12T18:00:00Z",
      coach_type: "limousine",
      coach_id: "C-LIMO-006",
      ordered_seat: ["H3", "H4"],
      price: 700000,
    },
  },
  {
    ticket_id: "TKT-010",
    account_id: "acc_cust_010",
    name: "Lý Thị K",
    address: "741 Đường YZA, Quận 10, TP.HCM",
    phone: "0369852154",
    ticket_type: "oneWay",
    total_price: 900000,
    payment_status: "paid",
    created_time: "2024-02-05T16:30:00Z",
    note: "Khách hàng thân thiết",
    start_location: "TP. Hồ Chí Minh",
    end_location: "Pleiku",
    outbound: {
      trip_id: "T-1001",
      start_time: "2024-02-10T06:30:00Z",
      coach_type: "limousine_cabin",
      coach_id: "C-CABIN-005",
      ordered_seat: ["I9"],
      price: 900000,
    },
  },
];

// Helper function to get tickets by payment status
export const getTicketsByPaymentStatus = (status: string): ITicket[] => {
  return mockTickets.filter((ticket) => ticket.payment_status === status);
};

// Helper function to get tickets by ticket type
export const getTicketsByType = (type: string): ITicket[] => {
  return mockTickets.filter((ticket) => ticket.ticket_type === type);
};

// Helper function to get tickets by route
export const getTicketsByRoute = (start: string, end: string): ITicket[] => {
  return mockTickets.filter(
    (ticket) =>
      ticket.start_location?.toLowerCase().includes(start.toLowerCase()) &&
      ticket.end_location?.toLowerCase().includes(end.toLowerCase())
  );
};

// Helper function to get tickets by date range
export const getTicketsByDateRange = (
  startDate: string,
  endDate: string
): ITicket[] => {
  return mockTickets.filter((ticket) => {
    if (!ticket.created_time) return false;
    const ticketDate = new Date(ticket.created_time);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return ticketDate >= start && ticketDate <= end;
  });
};

// Helper function to get total revenue
export const getTotalRevenue = (): number => {
  return mockTickets
    .filter((ticket) => ticket.payment_status === "paid")
    .reduce((total, ticket) => total + (ticket.total_price || 0), 0);
};

// Helper function to get ticket statistics
export const getTicketStats = () => {
  const total = mockTickets.length;
  const paid = mockTickets.filter((t) => t.payment_status === "paid").length;
  const pending = mockTickets.filter(
    (t) => t.payment_status === "pending"
  ).length;
  const cancelled = mockTickets.filter(
    (t) => t.payment_status === "cancelled"
  ).length;
  const oneWay = mockTickets.filter((t) => t.ticket_type === "oneWay").length;
  const roundTrip = mockTickets.filter(
    (t) => t.ticket_type === "return"
  ).length;

  return {
    total,
    paid,
    pending,
    cancelled,
    oneWay,
    roundTrip,
    revenue: getTotalRevenue(),
  };
};
