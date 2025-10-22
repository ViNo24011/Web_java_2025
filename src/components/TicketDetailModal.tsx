"use client";

import { Modal, Button } from "antd";
import { ITicket } from "@/types";
import {
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Armchair,
  Ticket,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: ITicket | null;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  isOpen,
  onClose,
  ticket,
}) => {
  if (!ticket) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Chi tiết vé"
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={800}
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {ticket.start_location} → {ticket.end_location}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {ticket.created_time &&
                    format(new Date(ticket.created_time), "dd/MM/yyyy HH:mm", {
                      locale: vi,
                    })}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatPrice(ticket.total_price || 0)}
              </div>
              <div className="text-sm text-gray-500">
                ID: {ticket.ticket_id}
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Thông tin hành khách
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Họ tên:</span>
                <span className="ml-2 font-medium">{ticket.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Số điện thoại:</span>
                <span className="ml-2 font-medium">{ticket.phone}</span>
              </div>
              <div>
                <span className="text-gray-600">Địa chỉ:</span>
                <span className="ml-2 font-medium">{ticket.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Thông tin vé
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Loại vé:</span>
                <span className="ml-2 font-medium">{ticket.ticket_type}</span>
              </div>
              <span className="flex items-center gap-1">
                <span className="text-gray-600">Trạng thái:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    ticket.payment_status || ""
                  )}`}
                >
                  {ticket.payment_status}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Chi tiết chuyến đi
          </h4>

          {/* Outbound Trip */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium text-blue-600">Chiều đi</h5>
              <span className="text-sm text-gray-600">
                ID: {ticket.outbound.trip_id}
              </span>
            </div>
            <div className="text-lg font-semibold mb-3">
              {ticket.start_location} → {ticket.end_location}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Thời gian khởi hành:</span>
                <div className="font-medium">
                  {format(
                    new Date(ticket.outbound.start_time),
                    "dd/MM/yyyy HH:mm",
                    { locale: vi }
                  )}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Biển số xe:</span>
                <div className="font-medium">{ticket.outbound.coach_id}</div>
              </div>
              <div>
                <span className="text-gray-600">Ghế đã chọn:</span>
                <div className="font-medium">
                  {ticket.outbound.ordered_seat.join(", ")}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Loại xe:</span>
                <div className="font-medium">{ticket.outbound.coach_type}</div>
              </div>
              <div>
                <span className="text-gray-600">Giá:</span>
                <div className="font-medium text-green-600">
                  {formatPrice(ticket.outbound.price)}
                </div>
              </div>
            </div>
          </div>

          {/* Return Trip */}
          {ticket.return && (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-blue-600">Chiều về</h5>
                <span className="text-sm text-gray-600">
                  ID: {ticket.return.trip_id}
                </span>
              </div>
              <div className="text-lg font-semibold mb-3">
                {ticket.end_location} → {ticket.start_location}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Thời gian khởi hành:</span>
                  <div className="font-medium">
                    {format(
                      new Date(ticket.return.start_time),
                      "dd/MM/yyyy HH:mm",
                      { locale: vi }
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Biển số xe:</span>
                  <div className="font-medium">{ticket.return.coach_id}</div>
                </div>
                <div>
                  <span className="text-gray-600">Ghế đã chọn:</span>
                  <div className="font-medium">
                    {ticket.return.ordered_seat.join(", ")}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Loại xe:</span>
                  <div className="font-medium">{ticket.return.coach_type}</div>
                </div>
                <div>
                  <span className="text-gray-600">Giá:</span>
                  <div className="font-medium text-green-600">
                    {formatPrice(ticket.return.price)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Note */}
        {ticket.note && (
          <div className="space-y-2">
            <h4 className="font-semibold">Ghi chú</h4>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              {ticket.note}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TicketDetailModal;
