"use client";
import { LOCATIONS, TRIP_TYPES } from "@/lib/constants";
import useBookingStore from "@/store/useBookingStore";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

interface SeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (selectedSeats: string[]) => void;
  data: any;
  currentTab: number;
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

const SeatModal: React.FC<SeatModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  currentTab,
}) => {
  const orderedSeats: string[] = useMemo(
    () => data?.ordered_seat ?? data?.orderedSeats ?? [],
    [data]
  );

  const seatLayout = useMemo(() => {
    return generateSeatLayout(data?.coach_type || "minibus");
  }, [data?.coach_type]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Get booking store
  const bookingData = useBookingStore((state) => state.data);
  const setBookingData = useBookingStore((state) => state.setData);
  const clearBookingData = useBookingStore((state) => state.clearData);

  // Reset selected seats when modal opens with new data
  useEffect(() => {
    if (isOpen) {
      setSelectedSeats([]);
    }
  }, [isOpen, data?.id]);

  // Clear booking data when switching to different trip
  useEffect(() => {
    if (
      bookingData?.outbound?.trip_id &&
      bookingData.outbound.trip_id !== data?.trip_id
    ) {
      setSelectedSeats([]);
    }
  }, [data?.id, bookingData?.outbound?.trip_id]);

  const isSold = (seat: string) => orderedSeats.includes(seat);
  const isSelected = (seat: string) => selectedSeats.includes(seat);

  const toggleSeat = (seat: string) => {
    if (isSold(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  console.log("data", data);
  console.log("bookingData :>> ", bookingData);
  const handleOk = () => {
    // Save to booking store based on currentTab
    const tripData = {
      price: data?.price || 0,
      trip_id: data?.trip_id || "",
      start_time: data?.start_time || "",
      coach_type: data?.coach_type || "",
      coach_id: data?.coach_id || "",
      ordered_seat: selectedSeats,
    };

    const bookingInfo: any = {
      ticket_type: bookingData?.ticket_type,
      start_location: data?.start_location,
      end_location: data?.end_location,
      total_price:
        (bookingData?.total_price || 0) +
        (data?.price || 0) * selectedSeats.length,
      // Save to outbound if tab 0, return if tab 1
      ...(currentTab === 0 ? { outbound: tripData } : { return: tripData }),
    };

    console.log("bookingInfo :>> ", bookingInfo);

    setBookingData(bookingInfo);
    onSubmit?.(selectedSeats);
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
      title="Chọn chỗ ngồi"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          disabled={selectedSeats.length === 0}
        >
          Xác nhận ({selectedSeats.length} ghế)
        </Button>,
      ]}
      width={1000}
      className="seat-modal"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Trip Information Card */}
        <div className="lg:w-80 w-full">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">Thông tin chuyến đi</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Điểm đi</span>
                <span className="font-medium">{startLabel}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Điểm đến</span>
                <span className="font-medium">{endLabel}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian</span>
                <span className="font-medium">
                  {data?.start_time
                    ? dayjs(data.start_time).format("DD/MM/YYYY HH:mm")
                    : "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Loại xe</span>
                <span className="font-medium">{typeLabel}</span>
              </div>

              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Giá vé</span>
                <span className="font-semibold text-green-600">
                  {data?.price.toLocaleString()} VNĐ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seat Selection Area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h3 className="text-lg font-semibold mb-3 sm:mb-0">Chọn ghế</h3>

              {/* Legend */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border bg-white"></div>
                  <span className="text-gray-600">Trống</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border bg-blue-100 border-blue-300"></div>
                  <span className="text-gray-600">Đang chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border bg-gray-300"></div>
                  <span className="text-gray-600">Đã bán</span>
                </div>
              </div>
            </div>

            {/* Seat Layout */}
            <div className="space-y-4">
              {seatLayout.floors.map((floor, floorIndex) => (
                <div key={floorIndex} className="space-y-2">
                  <h4 className="text-base font-medium text-gray-700">
                    {floor.name}
                  </h4>

                  <div className="bg-gray-50 rounded p-3">
                    <div className="space-y-1">
                      {floor.rows.map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex gap-1 justify-center"
                        >
                          {row.seats.map((seat) => {
                            const sold = isSold(seat);
                            const selected = isSelected(seat);
                            return (
                              <button
                                key={seat}
                                type="button"
                                onClick={() => toggleSeat(seat)}
                                disabled={sold}
                                className={[
                                  "h-10 w-12 rounded border text-sm font-medium transition-colors",
                                  sold
                                    ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                                    : selected
                                    ? "bg-blue-100 border-blue-300 text-blue-700"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50",
                                ].join(" ")}
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

            {/* Selected Seats Summary */}
            {selectedSeats.length > 0 && (
              <div className="mt-4 bg-blue-50 rounded p-3 border border-blue-200">
                <div className="mb-2">
                  <span className="font-medium text-blue-800">
                    Ghế đã chọn:{" "}
                  </span>
                  <span className="text-blue-700">
                    {selectedSeats.join(", ")}
                  </span>
                </div>
                <div className="text-sm text-blue-600">
                  Tổng cộng: {selectedSeats.length} ghế ×{" "}
                  {data?.price.toLocaleString()} VNĐ ={" "}
                  {(data?.price * selectedSeats.length).toLocaleString()} VNĐ
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SeatModal;
