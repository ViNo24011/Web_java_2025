"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ITicket } from "@/types";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { mockTickets } from "@/lib/mock/mockTickets";
import { TICKET_TYPE } from "@/lib/constants";

interface BookingHistoryCardProps {
  className?: string;
  tickets: ITicket[];
  onViewDetails: (ticket: ITicket) => void;
}

const BookingHistoryCard: React.FC<BookingHistoryCardProps> = ({
  className = "",
  tickets,
  onViewDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  tickets = mockTickets;

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter((ticket) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        ticket.start_location?.toLowerCase().includes(searchLower) ||
        ticket.end_location?.toLowerCase().includes(searchLower) ||
        ticket.ticket_type?.toLowerCase().includes(searchLower) ||
        ticket.ticket_id?.toLowerCase().includes(searchLower)
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

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Lịch sử đặt vé
        </CardTitle>

        {/* Search and Sort Controls */}
        <div className="space-y-4 pt-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo ID, tuyến, loại vé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-2">Sắp xếp theo: </div>
            <Select
              value={sortBy}
              onValueChange={(value: any) => setSortBy(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Ngày đặt</SelectItem>
                <SelectItem value="price">Giá</SelectItem>
                <SelectItem value="status">Trạng thái</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 h-120 overflow-y-auto">
        {filteredAndSortedTickets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? "Không tìm thấy vé phù hợp"
              : "Chưa có lịch sử đặt vé"}
          </div>
        ) : (
          filteredAndSortedTickets.map((ticket) => (
            <div
              key={ticket.ticket_id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewDetails(ticket)}
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

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>Ngày đặt:</span>
                    <span>
                      {ticket.created_time &&
                        format(
                          new Date(ticket.created_time),
                          "dd/MM/yyyy HH:mm",
                          { locale: vi }
                        )}
                    </span>
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
      </CardContent>
    </Card>
  );
};

export default BookingHistoryCard;
