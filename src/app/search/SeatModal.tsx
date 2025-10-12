"use client";
import { Modal, Button } from "antd";
import React, { useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import { LOCATIONS, TRIP_TYPES } from "@/lib/constants";
import useBookingStore from "@/store/useBookingStore";
import useWidgetStore from "@/store/useWidgetStore";

interface SeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (selectedSeats: string[]) => void;
  data: any;
  currentTab: number;
}

const getSeatCountByType = (type?: string): number => {
  if (!type) return 0;
  switch (type.toLowerCase()) {
    case "minibus":
      return 16;
    case "limousine":
      return 45;
    case "limousine_cabin":
      return 24;
    default:
      return 20;
  }
};

// Generate seat layout based on vehicle type
const generateSeatLayout = (type: string) => {
  const vehicleType = type.toLowerCase();

  switch (vehicleType) {
    case "minibus":
      // 5 rows: 4 rows with 3 seats, last row with 4 seats
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
      // 2 floors: A bottom, B top, 3 seats per row, last row A=5 seats, B=4 seats
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
      // 2 floors: A bottom, B top, 2 seats per row
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
          Xác nhận ({selectedSeats.length})
        </Button>,
      ]}
      width={900}
    >
      <div className="flex flex-row gap-6">
        <div className="flex-1 rounded-md bg-gray-50 p-4">
          <div className="text-base font-semibold mb-3">
            Thông tin chuyến đi
          </div>
          <div className="space-y-2 text-sm">
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
            <div className="flex justify-between">
              <span className="text-gray-600">Giá vé</span>
              <span className="font-medium">
                {data?.price.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold">Chọn ghế</div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 inline-block rounded border bg-white" />{" "}
                Trống
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 inline-block rounded border bg-yellow-200" />{" "}
                Đang chọn
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 inline-block rounded border bg-gray-300" />{" "}
                Đã bán
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {seatLayout.floors.map((floor, floorIndex) => (
              <div key={floorIndex} className="space-y-2">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {floor.name}
                </div>
                <div className="space-y-1">
                  {floor.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center">
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
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : selected
                                ? "bg-yellow-200 border-yellow-300"
                                : "bg-white hover:bg-yellow-50",
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
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SeatModal;
