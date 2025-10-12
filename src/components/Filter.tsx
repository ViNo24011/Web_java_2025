"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Divider, Slider, Checkbox } from "antd";
import { TRIP_TYPES } from "@/lib/constants";

interface FilterProps {
  onChange?: (values: any) => void;
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ onChange, className }) => {
  const [priceRange, setPriceRange] = useState<number[]>([50000, 500000]);
  const [timeRange, setTimeRange] = useState<number[]>([0, 47]);
  const [seatRange, setSeatRange] = useState<number[]>([0, 45]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Memoize format function to prevent recreation
  const formatTimeFromInterval = useCallback((interval: number): string => {
    const hours = Math.floor(interval / 2);
    const minutes = (interval % 2) * 30;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Memoize filter values to prevent unnecessary re-renders
  const filterValues = useMemo(
    () => ({
      coach_types: selectedTypes,
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      timeRange: {
        start: formatTimeFromInterval(timeRange[0]),
        end: formatTimeFromInterval(timeRange[1]),
      },
      seatRange: {
        min: seatRange[0],
        max: seatRange[1],
      },
    }),
    [selectedTypes, priceRange, timeRange, seatRange, formatTimeFromInterval]
  );

  // Optimized change handlers with useCallback
  const handlePriceChange = useCallback((value: number | number[]) => {
    setPriceRange(Array.isArray(value) ? value : [value]);
  }, []);

  const handleTimeChange = useCallback((value: number | number[]) => {
    setTimeRange(Array.isArray(value) ? value : [value]);
  }, []);

  const handleSeatChange = useCallback((value: number | number[]) => {
    setSeatRange(Array.isArray(value) ? value : [value]);
  }, []);

  const handleTypeChange = useCallback((checkedValues: string[]) => {
    setSelectedTypes(checkedValues);
  }, []);

  // Only call onChange when filter values actually change
  useEffect(() => {
    if (onChange) {
      onChange(filterValues);
    }
  }, [filterValues, onChange]);

  const handleReset = useCallback(() => {
    setPriceRange([50000, 500000]);
    setTimeRange([0, 47]);
    setSeatRange([0, 45]);
    setSelectedTypes([]); // Reset to default selection
  }, []);

  return (
    <Card
      title={
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Bộ lọc
        </span>
      }
      extra={
        <button className="text-blue-500 cursor-pointer" onClick={handleReset}>
          Xoá bộ lọc
        </button>
      }
      className={`shadow-xl ${className}`}
    >
      <div className="space-y-4">
        {/* Loại xe section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Loại xe</label>
          <Checkbox.Group
            value={selectedTypes}
            onChange={handleTypeChange}
            className="w-full"
          >
            <div className="space-y-3">
              <Checkbox
                value="limousine"
                className="w-full hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <span>Limousine (16 chỗ)</span>
              </Checkbox>
              <Checkbox
                value="limousine_cabin"
                className="w-full hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <span>Giường nằm (45 chỗ)</span>
              </Checkbox>
              <Checkbox
                value="minibus"
                className="w-full hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <span>Limousine Cabin VIP (24 phòng)</span>
              </Checkbox>
            </div>
          </Checkbox.Group>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        {/* Giá tiền section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Giá tiền</label>
          <div>
            <Slider
              range
              step={10000}
              value={priceRange}
              min={50000}
              max={500000}
              onChange={handlePriceChange}
              tooltip={{ open: false }}
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0].toLocaleString("vi-VN")}</span>
              <span>{priceRange[1].toLocaleString("vi-VN")}</span>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        {/* Thời gian section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Thời gian</label>
          <div>
            <Slider
              range
              step={1}
              value={timeRange}
              min={0}
              max={47}
              onChange={handleTimeChange}
              tooltip={{ open: false }}
            />
            <div className="flex justify-between mt-2">
              <span>{formatTimeFromInterval(timeRange[0])}</span>
              <span>{formatTimeFromInterval(timeRange[1])}</span>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "8px 0" }} />

        {/* Số lượng ghế section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Số lượng ghế</label>
          <div>
            <Slider
              range
              step={1}
              value={seatRange}
              min={0}
              max={45}
              onChange={handleSeatChange}
              tooltip={{ open: false }}
            />
            <div className="flex justify-between mt-2">
              <span>{seatRange[0]} ghế</span>
              <span>{seatRange[1]} ghế</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Filter;
