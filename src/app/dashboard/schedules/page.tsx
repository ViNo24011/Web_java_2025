"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLoginStore from "@/store/useLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Clock,
  MapPin,
  Bus,
  SquarePen,
  Trash,
} from "lucide-react";
import { Dropdown, Table } from "antd";
import BasePagination from "@/components/ui/antd-pagination";
import { useRequireAdmin } from "@/hooks/useAuth";
import { IAccount, ISchedule } from "@/types";
import { ColumnsType } from "antd/es/table";
import { mockSchedules } from "@/lib/mock/mockSchedule";
import dayjs from "dayjs";
import ScheduleModal from "./ScheduleModal";
import SeatModal from "./SeatModal";

interface Schedule {
  id: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  vehicleId: string;
  vehicleName: string;
  price: number;
  status: "active" | "inactive" | "completed";
  date: string;
  availableSeats: number;
  totalSeats: number;
}

const SchedulesPage = () => {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading, isAdmin } = useRequireAdmin();
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ISchedule | null>(
    null
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSeatModal, setOpenSeatModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

  useEffect(() => {
    setSchedules(mockSchedules);
    setPagination((prev) => ({ ...prev, total: mockSchedules.length }));
  }, []);

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.start_location
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schedule.end_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.coach_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.coach_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.price.toString().includes(searchTerm)
  );

  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedSchedules = filteredSchedules.slice(startIndex, endIndex);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredSchedules.length,
      current: 1,
    }));
  }, [filteredSchedules.length]);

  const handleEdit = () => {
    setEditingSchedule(editingSchedule);
    setIsModalOpen(true);
  };

  const handleDelete = (scheduleId: string) => {
    setSchedules(
      schedules.filter((schedule) => schedule.trip_id !== scheduleId)
    );
    setPagination((prev) => ({ ...prev, total: schedules.length - 1 }));
  };

  const handleModalSubmit = (updatedData: ISchedule) => {
    if (editingSchedule) {
      setSchedules(
        schedules.map((schedule) =>
          schedule.trip_id === editingSchedule.trip_id
            ? {
                ...schedule,
                ...updatedData,
                price: Number(updatedData.price),
                total_seat: Number(updatedData.total_seat),
              }
            : schedule
        )
      );
    }
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>;
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>
        );
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Hoàn thành</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const columns: ColumnsType<ISchedule> = [
    {
      title: "ID",
      dataIndex: "trip_id",
      key: "trip_id",
      width: 120,
    },
    {
      title: "Biển số xe",
      dataIndex: "coach_id",
      key: "coach_id",
      width: 130,
    },
    {
      title: "Điểm đi",
      dataIndex: "start_location",
      key: "start_location",
      width: 150,
    },
    {
      title: "Điểm đến",
      dataIndex: "end_location",
      key: "end_location",
      width: 150,
    },
    {
      title: "Giờ khởi hành",
      dataIndex: "start_time",
      key: "start_time",
      render: (time) => dayjs(time).format("DD/MM/YYYY HH:mm"),
      width: 160,
    },
    {
      title: "Loại xe",
      dataIndex: "coach_type",
      key: "coach_type",
      width: 120,
    },
    {
      title: "Số ghế",
      dataIndex: "total_seat",
      key: "total_seat",
      width: 100,
      render: (total_seat, record) =>
        `${record.ordered_seat?.length ?? 0} / ${total_seat}`,
    },
    {
      title: "Giá vé",
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (price) => `${price.toLocaleString("vi-VN")} VNĐ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusBadge(status),
      width: 120,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditingSchedule(record);
              setOpenSeatModal(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditingSchedule(record);
              setIsModalOpen(true);
            }}
          >
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(record.trip_id ?? "")}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          Quản lý lịch trình
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý lịch trình chuyến đi và xe khách
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm lịch trình..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedRowKeys.length > 0 && (
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash className="mr-2 h-4 w-4" />
              Xóa
            </Button>
          )}
          <Button onClick={handleEdit}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm lịch trình
          </Button>
        </div>
      </div>

      {/* Schedules Table */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Tất cả lịch trình ({filteredSchedules.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2">
          <Table
            style={{
              height: "450px",
              // width: "100%",
              overflowY: "auto",
              overflowX: "auto",
            }}
            // scroll={{
            //   x: 400,
            //   y: 400,
            // }}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys: React.Key[]) => {
                setSelectedRowKeys(selectedKeys);
              },
            }}
            rowKey="trip_id"
            columns={columns}
            dataSource={paginatedSchedules}
            pagination={false}
          />
          <BasePagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            pageSizeOptions={[10, 20, 30, 50]}
            onChange={(page, pageSize) => {
              setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize: pageSize || 10,
              }));
            }}
          />
        </CardContent>
      </Card>
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={editingSchedule}
        onSubmit={handleModalSubmit}
      />
      <SeatModal
        isOpen={openSeatModal}
        onClose={() => setOpenSeatModal(false)}
        data={editingSchedule}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default SchedulesPage;
