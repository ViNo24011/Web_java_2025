"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, DatePicker, Form, Radio, Row, Select } from "antd";
import {
  CalendarFilled,
  EnvironmentFilled,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { LOCATIONS } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import useWidgetStore from "@/store/useWidgetStore";
import useBookingStore from "@/store/useBookingStore";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface TransportWidgetProps {
  onSearch?: (values: any) => void;
  className?: string;
}

const TransportWidget: React.FC<TransportWidgetProps> = ({
  onSearch,
  className,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { data } = useWidgetStore();
  const [ticketType, setTicketType] = useState<string>("oneWay");
  const setBookingData = useBookingStore((state) => state.setData);
  const bookingData = useBookingStore((state) => state.data);

  const searchParams = useSearchParams();

  const onFinish = (values: any) => {
    if (typeof onSearch === "function") {
      onSearch(values);
    } else {
      let dateParam = "";
      if (values.ticket_type === "oneWay" && values.date) {
        dateParam = dayjs(values.date).format("YYYY-MM-DD");
      } else if (
        values.ticket_type === "return" &&
        values.date &&
        values.date.length === 2
      ) {
        dateParam = `${dayjs(values.date[0]).format("YYYY-MM-DD")},${dayjs(
          values.date[1]
        ).format("YYYY-MM-DD")}`;
      }

      setBookingData({
        ticket_type: values.ticket_type,
        start_location: values.start_location,
        end_location: values.end_location,
      });

      const searchParams = new URLSearchParams({
        start_location: values.start_location || "",
        end_location: values.end_location || "",
        date: dateParam,
      });

      router.push(`/search?${searchParams.toString()}`);
    }
  };

  const handleSwapLocations = () => {
    const startLocation = form.getFieldValue("start_location");
    const endLocation = form.getFieldValue("end_location");

    form.setFieldsValue({
      start_location: endLocation,
      end_location: startLocation,
    });
  };

  const initialFormValues = useMemo(() => {
    // Lấy dữ liệu từ URL params
    const startLocation = searchParams.get("start_location");
    const endLocation = searchParams.get("end_location");
    const dateParam = searchParams.get("date");

    // Parse date parameter
    let parsedDate = undefined;
    if (dateParam) {
      if (dateParam.includes(",")) {
        // Return trip - có 2 ngày
        const dates = dateParam.split(",");
        parsedDate = [dayjs(dates[0]), dayjs(dates[1])];
      } else {
        // One way trip - có 1 ngày
        parsedDate = dayjs(dateParam);
      }
    }

    return {
      ticket_type: ticketType || "oneWay",
      start_location: startLocation || undefined,
      end_location: endLocation || undefined,
      date: parsedDate,
    };
  }, [ticketType, searchParams]);

  return (
    <Card
      className={`shadow-xl ${className}`}
      styles={{ body: { padding: "16px" } }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialFormValues}
      >
        <Form.Item name="ticket_type">
          <Radio.Group onChange={(e) => setTicketType(e.target.value)}>
            <Radio value="oneWay">Một chiều</Radio>
            <Radio value="return">Khứ hồi</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col span={ticketType === "oneWay" ? 7 : 6}>
            <div className="flex flex-col gap-1 p-2 bg-gray-200 border rounded-sm p-1 border-transparent focus-within:border-blue-500 min-h-[80px]">
              <div>
                <EnvironmentFilled />{" "}
                <span className="text-md font-bold">Điểm đi</span>
              </div>
              <Form.Item name="start_location" noStyle>
                <Select
                  suffixIcon={null}
                  size="middle"
                  variant="borderless"
                  placeholder="Chọn điểm đi"
                >
                  {LOCATIONS.map((location) => (
                    <Option
                      key={location.value}
                      value={location.value}
                      className="text-lg font-bold"
                    >
                      {location.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Col>

          <Col span={1} className="pt-6 flex justify-center">
            <Button
              type="text"
              icon={<SwapOutlined />}
              onClick={handleSwapLocations}
              className="flex justify-center transition-colors"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #d9d9d9",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Col>

          <Col span={ticketType === "oneWay" ? 7 : 6}>
            <div className="flex flex-col gap-1 p-2 bg-gray-200 border rounded-sm p-1 border-transparent focus-within:border-blue-500 min-h-[80px]">
              <div>
                <EnvironmentFilled />{" "}
                <span className="text-md font-bold">Điểm đến</span>
              </div>
              <Form.Item name="end_location" noStyle>
                <Select
                  suffixIcon={null}
                  size="middle"
                  variant="borderless"
                  placeholder="Chọn điểm đến"
                >
                  {LOCATIONS.map((location) => (
                    <Option
                      key={location.value}
                      value={location.value}
                      className="text-lg font-bold"
                    >
                      {location.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Col>
          {ticketType === "oneWay" && (
            <Col span={6}>
              <div className="flex flex-col gap-1 p-2 bg-gray-200 border rounded-sm p-1 border-transparent focus-within:border-blue-500 min-h-[80px]">
                <div>
                  <CalendarFilled />{" "}
                  <span className="text-md font-bold">Ngày đi</span>
                </div>
                <Form.Item name="date" noStyle>
                  <DatePicker
                    style={{ backgroundColor: "#e5e7eb" }}
                    variant="borderless"
                    suffixIcon={null}
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày đi"
                    size="middle"
                    className="w-full"
                    value={data?.date}
                    minDate={dayjs()}
                  />
                </Form.Item>
              </div>
            </Col>
          )}
          {ticketType === "return" && (
            <Col span={8}>
              <div className="flex flex-col gap-1 p-2 bg-gray-200 border rounded-sm p-1 border-transparent focus-within:border-blue-500 min-h-[80px]">
                <div className="flex">
                  <div className="flex-1 items-center justify-start">
                    <CalendarFilled />{" "}
                    <span className="text-md font-bold">Ngày đi</span>
                  </div>
                  <div className="flex-1 items-center justify-start">
                    <CalendarFilled />{" "}
                    <span className="text-md font-bold">Ngày về</span>
                  </div>
                </div>
                <Form.Item name="date" noStyle>
                  <RangePicker
                    style={{ backgroundColor: "#e5e7eb" }}
                    variant="borderless"
                    suffixIcon={null}
                    format="DD/MM/YYYY"
                    size="middle"
                    className="w-full"
                    minDate={dayjs()}
                  />
                </Form.Item>
              </div>
            </Col>
          )}

          <Col span={3}>
            <div className="w-full h-full">
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                style={{
                  height: "100%",
                  width: "100%",
                  fontSize: "18px",
                }}
              >
                <SearchOutlined />
                Tìm kiếm
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TransportWidget;
