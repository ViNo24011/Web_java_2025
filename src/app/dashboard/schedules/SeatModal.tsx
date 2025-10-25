"use client";
import { LOCATIONS, TRIP_TYPES } from "@/lib/constants";
import { ISchedule } from "@/types";
import { Button, Modal, Input, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

interface AdminSeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ISchedule) => void;
  data: any;
}

interface BookedSeat {
  seat: string;
  customerName: string;
  customerPhone: string;
  bookingId: string;
  bookingTime: string;
}

const generateSeatLayout = (type: string) => {
  const vehicleType = type.toLowerCase();

  switch (vehicleType) {
    case "minibus":
      return {
        floors: [
          {
            name: "Tầng dưới",
            rows: [
              { seats: ["A1", "A2", "A3"] },
              { seats: ["A4", "A5", "A6"] },
              { seats: ["A7", "A8", "A9"] },
              { seats: ["A10", "A11", "A12"] },
              { seats: ["A13", "A14", "A15", "A16"] },
            ],
          },
        ],
      };

    case "limousine":
      return {
        floors: [
          {
            name: "Tầng dưới (A)",
            rows: [
              { seats: ["A1", "A2", "A3"] },
              { seats: ["A4", "A5", "A6"] },
              { seats: ["A7", "A8", "A9"] },
              { seats: ["A10", "A11", "A12"] },
              { seats: ["A13", "A14", "A15"] },
              { seats: ["A16", "A17", "A18"] },
              { seats: ["A19", "A20", "A21"] },
              { seats: ["A22", "A23", "A24", "A25", "A26"] },
            ],
          },
          {
            name: "Tầng trên (B)",
            rows: [
              { seats: ["B1", "B2", "B3"] },
              { seats: ["B4", "B5", "B6"] },
              { seats: ["B7", "B8", "B9"] },
              { seats: ["B10", "B11", "B12"] },
              { seats: ["B13", "B14", "B15"] },
              { seats: ["B16", "B17", "B18"] },
              { seats: ["B19", "B20", "B21"] },
              { seats: ["B22", "B23", "B24", "B25"] },
            ],
          },
        ],
      };

    case "limousine_cabin":
      return {
        floors: [
          {
            name: "Tầng dưới (A)",
            rows: [
              { seats: ["A1", "A2"] },
              { seats: ["A3", "A4"] },
              { seats: ["A5", "A6"] },
              { seats: ["A7", "A8"] },
              { seats: ["A9", "A10"] },
              { seats: ["A11", "A12"] },
            ],
          },
          {
            name: "Tầng trên (B)",
            rows: [
              { seats: ["B1", "B2"] },
              { seats: ["B3", "B4"] },
              { seats: ["B5", "B6"] },
              { seats: ["B7", "B8"] },
              { seats: ["B9", "B10"] },
              { seats: ["B11", "B12"] },
            ],
          },
        ],
      };

    default:
      return {
        floors: [
          {
            name: "Tầng dưới",
            rows: [
              { seats: ["A1", "A2", "A3"] },
              { seats: ["A4", "A5", "A6"] },
              { seats: ["A7", "A8", "A9"] },
              { seats: ["A10", "A11", "A12"] },
            ],
          },
        ],
      };
  }
};

const AdminSeatModal: React.FC<AdminSeatModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  // Mock data for booked seats - in real app, this would come from API
  const [bookedSeats, setBookedSeats] = useState<BookedSeat[]>([
    {
      seat: "A1",
      customerName: "Nguyễn Văn A",
      customerPhone: "0123456789",
      bookingId: "BK001",
      bookingTime: "2024-01-15 10:30",
    },
    {
      seat: "A2",
      customerName: "Trần Thị B",
      customerPhone: "0987654321",
      bookingId: "BK002",
      bookingTime: "2024-01-15 11:15",
    },
    {
      seat: "B1",
      customerName: "Lê Văn C",
      customerPhone: "0369258147",
      bookingId: "BK003",
      bookingTime: "2024-01-15 14:20",
    },
  ]);

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [editingSeat, setEditingSeat] = useState<BookedSeat | null>(null);

  const seatLayout = useMemo(() => {
    return generateSeatLayout(data?.coach_type || "minibus");
  }, [data?.coach_type]);

  const isBooked = (seat: string) => {
    return bookedSeats.some((booked) => booked.seat === seat);
  };

  const getBookedSeatInfo = (seat: string) => {
    return bookedSeats.find((booked) => booked.seat === seat);
  };

  const handleSeatClick = (seat: string) => {
    if (isBooked(seat)) {
      setSelectedSeat(seat);
      const seatInfo = getBookedSeatInfo(seat);
      if (seatInfo) {
        setEditingSeat(seatInfo);
      }
    } else {
      setSelectedSeat(seat);
      setEditingSeat(null);
    }
  };

  const handleSaveSeat = () => {
    if (!selectedSeat) return;

    data.ordered_seat.push(selectedSeat);
    message.success("Thêm đặt chỗ thành công");
    setSelectedSeat(null);
    setEditingSeat(null);
  };

  const handleDeleteSeat = () => {
    if (!selectedSeat) return;

    setBookedSeats((prev) => prev.filter((seat) => seat.seat !== selectedSeat));
    message.success("Xóa đặt chỗ thành công");
    setSelectedSeat(null);
    setEditingSeat(null);
  };

  const handleOk = () => {
    onSubmit?.({
      ...data,
      ordered_seat: bookedSeats.map((seat) => seat.seat),
    });
    onClose();
  };

  const startLabel = useMemo(
    () =>
      LOCATIONS.find((l) => l.value === data?.start_location)?.label ??
      data?.start_location,
    [data]
  );
  const endLabel = useMemo(
    () =>
      LOCATIONS.find((l) => l.value === data?.end_location)?.label ??
      data?.end_location,
    [data]
  );

  const typeLabel = useMemo(() => {
    const key = String(data?.coach_type ?? "").toLowerCase();
    return (TRIP_TYPES as any)[key] ?? data?.type ?? "";
  }, [data]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={handleOk}
      title="Quản lý ghế ngồi"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Lưu thay đổi
        </Button>,
      ]}
      width={900}
      className="admin-seat-modal"
    >
      <div className="space-y-4">
        {/* Trip Information - Row 1 */}
        <div className="bg-gray-50 rounded-lg p-3 border">
          <h3 className="text-base font-semibold mb-3">Thông tin chuyến đi</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Điểm đi</span>
              <span className="font-medium text-sm">{startLabel}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Điểm đến</span>
              <span className="font-medium text-sm">{endLabel}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Thời gian</span>
              <span className="font-medium text-sm">
                {data?.start_time
                  ? dayjs(data.start_time).format("DD/MM HH:mm")
                  : "-"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Loại xe</span>
              <span className="font-medium text-sm">{typeLabel}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Giá vé</span>
              <span className="font-semibold text-green-600 text-sm">
                {data?.price.toLocaleString()} VNĐ
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Ghế đã đặt</span>
              <span className="font-semibold text-red-600 text-sm">
                {bookedSeats.length} /{" "}
                {seatLayout.floors.reduce(
                  (total, floor) =>
                    total +
                    floor.rows.reduce(
                      (rowTotal, row) => rowTotal + row.seats.length,
                      0
                    ),
                  0
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Seat Layout - Row 2 */}
        <div className="bg-white rounded-lg border p-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
            <h3 className="text-base font-semibold mb-2 sm:mb-0">
              Quản lý ghế
            </h3>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded border bg-white"></div>
                <span className="text-gray-600">Trống</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded border bg-red-100 border-red-300"></div>
                <span className="text-gray-600">Đã đặt</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded border bg-blue-100 border-blue-300"></div>
                <span className="text-gray-600">Đang chọn</span>
              </div>
            </div>
          </div>

          {/* Seat Layout - 2 columns if 2 floors */}
          <div
            className={`grid gap-4 ${
              seatLayout.floors.length === 2
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {seatLayout.floors.map((floor, floorIndex) => (
              <div key={floorIndex} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 text-center">
                  {floor.name}
                </h4>

                <div className="bg-gray-50 rounded p-2">
                  <div className="space-y-1">
                    {floor.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-1 justify-center">
                        {row.seats.map((seat) => {
                          const booked = isBooked(seat);
                          const selected = selectedSeat === seat;
                          const seatInfo = getBookedSeatInfo(seat);

                          return (
                            <button
                              key={seat}
                              type="button"
                              onClick={() => handleSeatClick(seat)}
                              className={[
                                "h-8 w-10 rounded border text-xs font-medium transition-colors",
                                booked
                                  ? selected
                                    ? "bg-red-100 border-red-300 text-red-700"
                                    : "bg-gray-300 border-gray-500 text-gray-700"
                                  : selected
                                  ? "bg-blue-100 border-blue-300 text-blue-700"
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
                              ].join(" ")}
                              title={
                                seatInfo
                                  ? `${seatInfo.customerName} - ${seatInfo.customerPhone}`
                                  : ""
                              }
                            >
                              {seat}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information - Row 3 */}
        <div className="space-y-3">
          {/* Customer Information Form */}
          {selectedSeat && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm">
                {editingSeat
                  ? "Thông tin ghế đã đặt"
                  : "Thêm thông tin khách hàng"}{" "}
                - Ghế {selectedSeat}
              </h4>

              {editingSeat ? (
                // Show existing booking info (read-only)
                <div className="mt-2 p-3 bg-white rounded border">
                  <h5 className="font-medium text-gray-700 mb-2 text-sm">
                    Thông tin khách hàng:
                  </h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <strong>Tên:</strong> {editingSeat.customerName}
                    </div>
                    <div>
                      <strong>SĐT:</strong> {editingSeat.customerPhone}
                    </div>
                    <div>
                      <strong>Mã đặt:</strong> {editingSeat.bookingId}
                    </div>
                    <div>
                      <strong>Thời gian đặt:</strong> {editingSeat.bookingTime}
                    </div>
                  </div>
                </div>
              ) : (
                // Show form for new booking
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div></div>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <Button type="primary" size="small" onClick={handleSaveSeat}>
                  Thêm đặt chỗ
                </Button>

                {editingSeat && (
                  <Button danger size="small" onClick={handleDeleteSeat}>
                    Xóa đặt chỗ
                  </Button>
                )}

                <Button
                  size="small"
                  onClick={() => {
                    setSelectedSeat(null);
                    setEditingSeat(null);
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}

          {/* Booked Seats Summary */}
          {bookedSeats.length > 0 && (
            <div className="bg-gray-50 rounded p-3 border">
              <h4 className="font-medium text-gray-800 mb-2 text-sm">
                Danh sách ghế đã đặt:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {bookedSeats.map((seat) => (
                  <div
                    key={seat.seat}
                    className="text-xs bg-white p-2 rounded border hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-blue-600">
                      Ghế {seat.seat}
                    </div>
                    <div className="text-gray-800 font-medium">
                      {seat.customerName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {seat.customerPhone}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {seat.bookingId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AdminSeatModal;
