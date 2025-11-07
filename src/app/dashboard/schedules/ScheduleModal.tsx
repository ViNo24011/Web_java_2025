"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  COACH_STATUS,
  coachTypeMap,
  LOCATIONS,
  TRIP_TYPES,
} from "@/lib/constants";
import useBookingStore from "@/store/useBookingStore";
import { IAccount, ICoach, ISchedule } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Select, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import mockCoaches from "@/lib/mock/mockCoaches";

const { Option } = Select;

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ISchedule | null;
  onSubmit: (data: ISchedule) => void;
}

const scheduleSchema = z.object({
  start_location: z.string().min(1, "Vui lòng nhập điểm đi"),
  end_location: z.string().min(1, "Vui lòng nhập điểm đến"),
  start_time: z.any().optional(),
  price: z.number().min(0, "Giá vé phải lớn hơn 0"),
  status: z.string().min(1, "Vui lòng chọn trạng thái"),
  coach_type: z.string().min(1, "Vui lòng chọn loại xe"),
  coach_id: z.string().min(1, "Vui lòng chọn xe"),
  total_seat: z.number().min(1, "Số ghế phải lớn hơn 0"),
  ordered_seat: z.array(z.string()).default([]),
});

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const [coachList, setCoachList] = useState<ICoach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<ICoach | null>(null);
  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      start_location: data?.start_location || "",
      end_location: data?.end_location || "",
      start_time: data?.start_time ? dayjs(data.start_time) : null,
      price: data?.price || 0,
      status: data?.status || "active",
      coach_type: data?.coach_type || "",
      coach_id: data?.coach_id || "",
      total_seat: data?.total_seat || 0,
      ordered_seat: data?.ordered_seat || [],
    },
  });

  useEffect(() => {
    setCoachList(mockCoaches);
  }, []);

  useEffect(() => {
    if (data) {
      form.reset({
        start_location: data.start_location || "",
        end_location: data.end_location || "",
        start_time: data.start_time ? dayjs(data.start_time) : null,
        price: data.price || 0,
        status: data.status || "wait",
        coach_type: data.coach_type || "",
        coach_id: data.coach_id || "",
        total_seat: data.total_seat || 0,
        ordered_seat: data.ordered_seat || [],
      });
    } else {
      form.reset({
        start_location: "",
        end_location: "",
        start_time: null,
        price: 0,
        status: "wait",
        coach_type: "",
        coach_id: "",
        total_seat: 0,
        ordered_seat: [],
      });
    }
  }, [data, form]);

  const handleSubmit = (formData: z.infer<typeof scheduleSchema>) => {
    const updatedData: ISchedule = {
      ...formData,
      start_time: formData.start_time
        ? dayjs(formData.start_time).format("YYYY-MM-DD HH:mm:ss")
        : "",
    };
    onSubmit(updatedData);
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    setSelectedCoach(null);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      title={data ? "Sửa lịch trình" : "Thêm lịch trình"}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Hủy
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4 py-4">
            <FormField
              control={form.control}
              name="start_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm đi</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      placeholder="Nhập điểm đi"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      {LOCATIONS.map((location) => (
                        <Option key={location.value} value={location.value}>
                          {location.label}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm đến</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      placeholder="Nhập điểm đến"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      {LOCATIONS.map((location) => (
                        <Option key={location.value} value={location.value}>
                          {location.label}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giờ khởi hành</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        showTime
                        format="DD/MM/YYYY HH:mm"
                        minuteStep={5}
                        placeholder="Chọn giờ khởi hành"
                        size="middle"
                        minDate={dayjs()}
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá vé (VNĐ)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="Nhập giá vé"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="coach_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chọn xe</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      placeholder="Nhập giá vé"
                      onChange={(value) => {
                        setSelectedCoach(
                          coachList.find((coach) => coach.coach_id === value) ||
                            null
                        );
                        field.onChange(value);
                      }}
                    >
                      {coachList
                        .filter((coach) => coach.status !== "maintenance")
                        .map((coach) => (
                          <Option key={coach.coach_id} value={coach.coach_id}>
                            {coach.coach_id} -{" "}
                            {
                              COACH_STATUS[
                                coach.status as keyof typeof COACH_STATUS
                              ]
                            }
                          </Option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedCoach && (
              <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded-md">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loại xe</span>
                  <span className="font-medium">
                    {
                      coachTypeMap[
                        selectedCoach.coach_type as keyof typeof coachTypeMap
                      ].label
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái</span>
                  <span className="font-medium">
                    {
                      COACH_STATUS[
                        selectedCoach.status as keyof typeof COACH_STATUS
                      ]
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số ghế</span>
                  <span className="font-medium">
                    {
                      coachTypeMap[
                        selectedCoach.coach_type as keyof typeof coachTypeMap
                      ].seats
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ScheduleModal;
