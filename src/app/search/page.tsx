"use client";
import PageLayout from "@/components/PageLayout";
import TransportWidget from "@/components/TransportWidget";
import Filter from "@/components/Filter";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Badge, Card, Divider, QRCode, Select, Spin, Steps } from "antd";
import TripCard from "@/components/TripCard";
import SeatModal from "./SeatModal";
import useBookingStore from "@/store/useBookingStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { coachTypeMap, PAYMENT_STATUS, TICKET_TYPE } from "@/lib/constants";
import { oneWayStepItems, returnStepItems } from "./const";
import useWidgetStore from "@/store/useWidgetStore";
import { mockSchedules } from "@/lib/mock/mockSchedule";
import dayjs from "dayjs";
import { RefreshCcwIcon } from "lucide-react";
import useLoginStore from "@/store/useLogin";
import PaymentTab from "./paymentTab";

const { Option } = Select;

const Search = () => {
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [filterData, setFilterData] = useState<any | null>(null);
  const { isLoggedIn, data: userData } = useLoginStore();

  const ticketType = useBookingStore((state) => state.data?.ticket_type);
  const setTicketType = useBookingStore((state) => state.setTicketType);

  // Reset current step when ticketType changes
  useEffect(() => {
    setCurrent(0);
  }, [ticketType]);

  const onFilterChange = useCallback((values: any) => {
    setFilterData(values);
    setLoading(true);
    // Simulate API call with debounce
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const onTabChange = (value: number) => {
    setCurrent(value);
  };

  const handleOpenSeatModal = (trip: any) => {
    setSelectedTrip(trip);
    setIsSeatModalOpen(true);
  };

  const handleSubmitSeats = (seats: string[]) => {
    setIsSeatModalOpen(false);

    // Auto-advance to next tab
    const maxSteps = ticketType === TICKET_TYPE.return ? 3 : 2;
    if (current < maxSteps - 1) {
      setCurrent(current + 1);
    }
  };

  // Memoize filtered schedules to prevent unnecessary re-renders
  const filteredSchedules = useMemo(() => {
    if (!filterData) return mockSchedules;

    return mockSchedules.filter((schedule) => {
      const { coach_types } = filterData;

      const coachTypeMatch =
        !coach_types?.length || coach_types.includes(schedule.coach_type);

      const priceMatch =
        !filterData.priceRange ||
        (schedule.price >= filterData.priceRange.min &&
          schedule.price <= filterData.priceRange.max);

      const availableSeats =
        schedule.total_seat - (schedule.ordered_seat?.length || 0);
      const seatMatch =
        !filterData.seatRange ||
        (availableSeats >= filterData.seatRange.min &&
          availableSeats <= filterData.seatRange.max);

      return coachTypeMatch && priceMatch && seatMatch;
    });
  }, [filterData]);

  return (
    <PageLayout>
      <div className="w-full h-full p-2 gap-44">
        <div className="flex flex-col gap-8">
          <div className="flex-1">
            <TransportWidget />
          </div>
          <div className="flex flex-row gap-8 py-4">
            <div className="flex-1 h-full">
              <div className="flex flex-col gap-4">
                <Card>
                  <span className="md font-bold mr-4">Sắp xếp theo</span>
                  <Select>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                  </Select>
                </Card>
                <Filter onChange={onFilterChange} />
              </div>
            </div>
            <div className="flex-3 h-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <Steps
                    current={current}
                    type="navigation"
                    size="small"
                    items={
                      ticketType === TICKET_TYPE.return
                        ? returnStepItems
                        : oneWayStepItems
                    }
                    className="site-navigation-steps"
                    onChange={onTabChange}
                  />
                </div>
                {current !== (ticketType === TICKET_TYPE.return ? 2 : 1) && (
                  <div className="flex-1 min-h-[200px] rounded-lg bg-gray-50">
                    {loading ? (
                      <div className="flex justify-center items-center h-32">
                        <div className="text-lg">Đang tải...</div>
                      </div>
                    ) : filteredSchedules.length > 0 ? (
                      filteredSchedules.map((schedule) => (
                        <TripCard
                          key={schedule.trip_id}
                          data={schedule}
                          onBook={handleOpenSeatModal}
                        />
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-32">
                        <div className="text-lg text-gray-500">
                          Không tìm thấy chuyến xe phù hợp
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {current === (ticketType === TICKET_TYPE.return ? 2 : 1) && (
                  <PaymentTab />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SeatModal
        isOpen={isSeatModalOpen}
        onClose={() => setIsSeatModalOpen(false)}
        onSubmit={handleSubmitSeats}
        data={selectedTrip}
        currentTab={current}
      />
    </PageLayout>
  );
};

export default Search;
