"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLoginStore from "@/store/useLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "antd";
import {
  History,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  MapPin,
  Clock,
  User,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";
import BasePagination from "@/components/ui/antd-pagination";
import { mockTickets } from "@/lib/mock/mockTickets";
import { ITicket } from "@/types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { TICKET_TYPE } from "@/lib/constants";
import { useRequireAdmin } from "@/hooks/useAuth";
import TicketDetailModal from "@/components/TicketDetailModal";

const BookingHistoryPage = () => {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading, isAdmin } = useRequireAdmin();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sortBy, setSortBy] = useState<"date" | "price" | "status" | "name">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [ticketType, setTicketType] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

  useEffect(() => {
    setTickets(mockTickets);
    setPagination((prev) => ({ ...prev, total: mockTickets.length }));
  }, []);

  const filteredTickets = useMemo(() => {
    let filtered = tickets.filter((ticket) => {
      const searchLower = searchTerm.toLowerCase();
      const ticketTypeFilter =
        ticketType === "all"
          ? true
          : ticket.ticket_type ===
            TICKET_TYPE[ticketType as keyof typeof TICKET_TYPE];
      return (
        ticketTypeFilter &&
        (ticket.start_location?.toLowerCase().includes(searchLower) ||
          ticket.end_location?.toLowerCase().includes(searchLower) ||
          ticket.ticket_id?.toLowerCase().includes(searchLower))
      );
    });

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          const dateA = new Date(a.created_time || 0);
          const dateB = new Date(b.created_time || 0);
          comparison = dateA.getTime() - dateB.getTime();
          break;
        case "price":
          comparison = (a.total_price || 0) - (b.total_price || 0);
          break;
        case "status":
          comparison = (a.payment_status || "").localeCompare(
            b.payment_status || ""
          );
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [tickets, searchTerm, sortBy, sortOrder]);
  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredTickets.length,
      current: 1,
    }));
  }, [filteredTickets.length]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <History className="h-8 w-8" />
          Lịch sử đặt vé
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý và theo dõi tất cả đặt vé trong hệ thống
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4 pt-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo ID, tuyến, người đặt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 mb-4">
            <div className="flex items-center gap-2">Sắp xếp theo: </div>
            <Select
              value={sortBy}
              onChange={(value: any) => setSortBy(value)}
              style={{ width: 120 }}
              placeholder="Sắp xếp"
              options={[
                { value: "date", label: "Ngày đặt" },
                { value: "price", label: "Giá" },
                { value: "status", label: "Trạng thái" },
                { value: "name", label: "Người đặt" },
              ]}
            />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mb-4">
            <div className="flex items-center gap-2">Loại vé: </div>
            <Select
              value={ticketType}
              onChange={(value: any) => setTicketType(value)}
              style={{ width: 120 }}
              placeholder="Loại vé"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "oneWay", label: "Một chiều" },
                { value: "return", label: "Khứ hồi" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bookings Cards */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Vé đã đặt ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2">
          <div
            style={{ height: "450px", overflowY: "auto" }}
            className="space-y-4"
          >
            {paginatedTickets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm
                  ? "Không tìm thấy vé phù hợp"
                  : "Chưa có dữ liệu vé"}
              </div>
            ) : (
              paginatedTickets.map((ticket) => (
                <div
                  key={ticket.ticket_id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsOpenModal(true);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {ticket.start_location} → {ticket.end_location}
                        </span>
                        <div className="text-sm text-gray-500 ml-2">
                          ID: {ticket.ticket_id}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            {ticket.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>
                            {ticket.created_time &&
                              format(
                                new Date(ticket.created_time),
                                "dd/MM/yyyy HH:mm",
                                { locale: vi }
                              )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">Loại vé:</span>
                        <span className="text-sm font-medium">
                          {
                            TICKET_TYPE[
                              ticket.ticket_type as keyof typeof TICKET_TYPE
                            ]
                          }
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 mb-1">
                        {formatPrice(ticket.total_price || 0)}
                      </div>
                      <Badge
                        className={getStatusColor(ticket.payment_status || "")}
                      >
                        {ticket.payment_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <BasePagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            pageSizeOptions={[5, 10, 20, 30, 50]}
            onChange={(page, pageSize) => {
              setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize: pageSize || 10,
              }));
            }}
          />
        </CardContent>
      </Card>
      <TicketDetailModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default BookingHistoryPage;
