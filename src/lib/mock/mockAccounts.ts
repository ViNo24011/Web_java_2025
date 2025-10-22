import { IAccount } from "@/types";

export const mockAccounts: IAccount[] = [
  {
    account_id: "acc_admin_001",
    name: "Nguyễn Văn Admin",
    username: "admin",
    password: "admin123",
    role: "admin",
    phone: "0123456789",
    address: "Hà Nội",
    order_history: ["ticket_001", "ticket_002"],
    note: "Quản trị viên hệ thống chính",
  },
  {
    account_id: "acc_cust_001",
    name: "Trần Thị Bình",
    username: "tranthibinh",
    password: "password123",
    role: "customer",
    phone: "0987654321",
    address: "TP. Hồ Chí Minh",
    order_history: ["ticket_003", "ticket_004", "ticket_005"],
    note: "Khách hàng VIP - thường xuyên đi du lịch",
  },
  {
    account_id: "acc_cust_002",
    name: "Lê Văn Cường",
    username: "levancuong",
    password: "password123",
    role: "customer",
    phone: "0369852147",
    address: "Đà Nẵng",
    order_history: ["ticket_006"],
    note: "Khách hàng mới - sinh viên",
  },
  {
    account_id: "acc_cust_003",
    name: "Phạm Thị Dung",
    username: "phamthidung",
    password: "password123",
    role: "customer",
    phone: "0369852148",
    address: "Cần Thơ",
    order_history: ["ticket_007", "ticket_008"],
    note: "Khách hàng thân thiết - doanh nhân",
  },
  {
    account_id: "acc_cust_004",
    name: "Hoàng Văn Em",
    username: "hoangvanem",
    password: "password123",
    role: "customer",
    phone: "0369852149",
    address: "Hải Phòng",
    order_history: [],
    note: "Khách hàng mới đăng ký",
  },
  {
    account_id: "acc_cust_005",
    name: "Võ Thị Phương",
    username: "vothiphuong",
    password: "password123",
    role: "customer",
    phone: "0369852150",
    address: "Nha Trang",
    order_history: ["ticket_009", "ticket_010", "ticket_011"],
    note: "Khách hàng thường xuyên đi du lịch biển",
  },
  {
    account_id: "acc_admin_002",
    name: "Đặng Văn Giang",
    username: "dangvangiang",
    password: "admin456",
    role: "admin",
    phone: "0369852151",
    address: "Huế",
    order_history: ["ticket_012"],
    note: "Quản trị viên khu vực miền Trung",
  },
  {
    account_id: "acc_cust_006",
    name: "Bùi Thị Hoa",
    username: "buithihoa",
    password: "password123",
    role: "customer",
    phone: "0369852152",
    address: "Vũng Tàu",
    order_history: ["ticket_013", "ticket_014"],
    note: "Khách hàng doanh nhân - thường xuyên đi công tác",
  },
  {
    account_id: "acc_cust_007",
    name: "Phan Văn Ích",
    username: "phanvanich",
    password: "password123",
    role: "customer",
    phone: "0369852153",
    address: "Quy Nhon",
    order_history: ["ticket_015"],
    note: "Khách hàng sinh viên - ưu đãi đặc biệt",
  },
  {
    account_id: "acc_cust_008",
    name: "Lý Thị Kim",
    username: "lythikim",
    password: "password123",
    role: "customer",
    phone: "0369852154",
    address: "Pleiku",
    order_history: ["ticket_016", "ticket_017", "ticket_018"],
    note: "Khách hàng thân thiết từ Tây Nguyên - thường xuyên về quê",
  },
];

// Helper function to get accounts by role
export const getAccountsByRole = (role: string): IAccount[] => {
  return mockAccounts.filter((account) => account.role === role);
};

// Helper function to get accounts by location
export const getAccountsByLocation = (location: string): IAccount[] => {
  return mockAccounts.filter((account) =>
    account.address.toLowerCase().includes(location.toLowerCase())
  );
};

// Helper function to get accounts with order history
export const getAccountsWithOrders = (): IAccount[] => {
  return mockAccounts.filter((account) => account.order_history.length > 0);
};

// Helper function to get accounts without orders
export const getAccountsWithoutOrders = (): IAccount[] => {
  return mockAccounts.filter((account) => account.order_history.length === 0);
};
