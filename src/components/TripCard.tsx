import { Button, Card } from "antd";
import React from "react";
import { Row, Col, Tag } from "antd";
import Image from "next/image";
import { LOCATIONS, TRIP_TYPES } from "@/lib/constants";
import {
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentFilled,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const TripCard = ({
  data,
  onBook,
}: {
  data: any;
  onBook?: (data: any) => void;
}) => {
  const renderTags = (title: string) => {
    switch (title) {
      case "minibus":
        return <Tag color="blue">{TRIP_TYPES.minibus}</Tag>;
      case "limousine":
        return <Tag color="green">{TRIP_TYPES.limousine}</Tag>;
      case "limousine_cabin":
        return <Tag color="gold">{TRIP_TYPES.limousine_cabin}</Tag>;
      default:
        return <Tag color="gray">{title}</Tag>;
    }
  };
  return (
    <div className="w-full pb-4">
      <Card>
        <Row gutter={16} align={"middle"}>
          <Col span={3}>
            <Image src="/logo.png" width={50} height={50} alt="trip" />
          </Col>
          <Col span={4}>
            <div className="flex flex-col">
              <div>Quang Huy</div>
              <div>{renderTags(data.coach_type)}</div>
              <div className="flex items-center gap-1">
                <EnvironmentFilled />
                <span>Điểm đi: </span>
                <span>{data.start_location}</span>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <ClockCircleOutlined />
                <span>Thời gian: </span>
              </div>
              <div className="flex items-center gap-1">
                <span>{dayjs(data.start_time).format("HH:mm")}</span>
                <span> - </span>
                <span>
                  {dayjs(data.start_time)
                    .add(data.time_required, "hour")
                    .format("HH:mm")}
                </span>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className="flex items-center gap-1">
              <UserOutlined />
              <span>Còn lại: </span>
              <span>
                {data?.seat_list?.length ??
                  0 - (data?.ordered_seat?.length ?? 0)}
              </span>
              <span> / {data?.seat_list?.length ?? 0}</span>
            </div>
          </Col>
          <Col span={4}>
            <div className="flex items-center gap-1">
              <DollarOutlined />
              <span>Giá: </span>
              <span>{data.price.toLocaleString()} VNĐ</span>
            </div>
          </Col>
          <Col span={3}>
            <div className="flex items-center gap-1">
              <Button onClick={() => onBook?.(data)} type="primary">
                Đặt vé
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TripCard;
