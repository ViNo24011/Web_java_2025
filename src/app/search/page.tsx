"use client";
import Filter from "@/components/Filter";
import PageLayout from "@/components/PageLayout";
import TransportWidget from "@/components/TransportWidget";
import TripCard from "@/components/TripCard";
import { TICKET_TYPE } from "@/lib/constants";
import { mockSchedules } from "@/lib/mock/mockSchedule";
import useBookingStore from "@/store/useBookingStore";
import useLoginStore from "@/store/useLogin";
import { Card, Select, Steps } from "antd";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { oneWayStepItems, returnStepItems } from "./const";
import PaymentTab from "./paymentTab";
import SeatModal from "./SeatModal";

const { Option } = Select;

const Search = () => {
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [filterData, setFilterData] = useState<any | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("time");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { isLoggedIn, data: userData } = useLoginStore();

  const ticketType = useBookingStore((state) => state.data?.ticket_type);
  const setTicketType = useBookingStore((state) => state.setTicketType);

  useEffect(() => {
    setCurrent(0);
    setDisplayCount(5);
  }, [ticketType]);

  const onFilterChange = useCallback((values: any) => {
    setFilterData(values);
    setLoading(true);
    setDisplayCount(5);
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

    const maxSteps = ticketType === "return" ? 3 : 2;
    if (current < maxSteps - 1) {
      setCurrent(current + 1);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  const filteredSchedules = useMemo(() => {
    let filtered = mockSchedules;

    if (filterData) {
      const { coach_types } = filterData;

      filtered = mockSchedules.filter((schedule) => {
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
    }

    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "time":
          const timeA = new Date(a.start_time).getTime();
          const timeB = new Date(b.start_time).getTime();
          comparison = timeA - timeB;
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "seats":
          const seatsA = a.total_seat - (a.ordered_seat?.length || 0);
          const seatsB = b.total_seat - (b.ordered_seat?.length || 0);
          comparison = seatsA - seatsB;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filterData, sortBy, sortOrder]);

  const displayedSchedules = useMemo(() => {
    return filteredSchedules.slice(0, displayCount);
  }, [filteredSchedules, displayCount]);

  const hasMoreSchedules = displayCount < filteredSchedules.length;

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
                  <div className="flex items-center gap-4">
                    <span className="md font-bold">Sắp xếp theo</span>
                    <Select
                      value={sortBy}
                      onChange={(value: string) => setSortBy(value)}
                      style={{ width: 150 }}
                    >
                      <Option value="time">Thời gian</Option>
                      <Option value="price">Giá vé</Option>
                      <Option value="seats">Ghế trống</Option>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
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
                      ticketType === "return"
                        ? returnStepItems
                        : oneWayStepItems
                    }
                    className="site-navigation-steps"
                    onChange={onTabChange}
                  />
                </div>
                {current !== (ticketType === "return" ? 2 : 1) && (
                  <div className="flex-1 min-h-[200px] rounded-lg bg-gray-50">
                    {loading ? (
                      <div className="flex justify-center items-center h-32">
                        <div className="text-lg">Đang tải...</div>
                      </div>
                    ) : displayedSchedules.length > 0 ? (
                      <div className="space-y-4 p-4">
                        {displayedSchedules.map((schedule) => (
                          <TripCard
                            key={schedule.trip_id}
                            data={schedule}
                            onBook={handleOpenSeatModal}
                          />
                        ))}

                        {hasMoreSchedules && (
                          <div className="flex justify-center pt-2 pb-6">
                            <Button
                              variant="outline"
                              onClick={handleLoadMore}
                              className="px-4 py-2"
                            >
                              Xem thêm
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-32">
                        <div className="text-lg text-gray-500">
                          Không tìm thấy chuyến xe phù hợp
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {current === (ticketType === "return" ? 2 : 1) && (
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
