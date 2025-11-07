export const LOCATIONS = [
  {
    label: "Hà Nội",
    value: "Hà Nội",
  },
  {
    label: "TP. Hồ Chí Minh",
    value: "TP. Hồ Chí Minh",
  },
  {
    label: "Đà Nẵng",
    value: "Đà Nẵng",
  },
  {
    label: "Hải Phòng",
    value: "Hải Phòng",
  },
  {
    label: "Thanh Hóa",
    value: "Thanh Hóa",
  },
  {
    label: "Lào Cai",
    value: "Lào Cai",
  },
];

export const TRIP_TYPES = {
  minibus: "Limousine",
  limousine: "Giường nằm",
  limousine_cabin: "Limousine Cabin VIP",
};

export const COACH_STATUS = {
  running: "Đang chạy",
  maintenance: "Đang bảo trì",
  inactive: "Không hoạt động",
};

export const PAYMENT_STATUS = {
  pending: "pending",
  done: "done",
  cancelled: "cancelled",
};

export const TICKET_TYPE = {
  oneWay: "Một chiều",
  return: "Khứ hồi",
};

export const coachTypeMap = {
  minibus: {
    label: "Limousine",
    seats: 16,
    price: 200000,
    seat_list: [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12",
      "A13",
      "A14",
      "A15",
      "A16",
    ],
  },
  limousine: {
    label: "Limousine",
    seats: 45,
    price: 250000,
    seat_list: [
      // Floor A (bottom) - 26 seats
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12",
      "A13",
      "A14",
      "A15",
      "A16",
      "A17",
      "A18",
      "A19",
      "A20",
      "A21",
      "A22",
      "A23",
      "A24",
      "A25",
      "A26",
      // Floor B (top) - 19 seats
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "B11",
      "B12",
      "B13",
      "B14",
      "B15",
      "B16",
      "B17",
      "B18",
      "B19",
      "B20",
      "B21",
      "B22",
      "B23",
      "B24",
      "B25",
    ],
  },
  limousine_cabin: {
    label: "Limousine Cabin",
    seats: 24,
    price: 300000,
    seat_list: [
      // Floor A (bottom) - 12 seats
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12",
      // Floor B (top) - 12 seats
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "B11",
      "B12",
    ],
  },
};
