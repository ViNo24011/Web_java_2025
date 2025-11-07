"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLoginStore from "@/store/useLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select } from "antd";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  User,
  Calendar,
  Wrench,
  Trash,
  SquarePen,
  Divide,
} from "lucide-react";
import { Dropdown, Table, Modal } from "antd";
import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { ICoach } from "@/types";
import { ColumnsType } from "antd/es/table";
import { useRequireAdmin } from "@/hooks/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { coachTypeMap } from "@/lib/constants";
import mockCoaches from "@/lib/mock/mockCoaches";

// Using ICoach instead of local Vehicle interface

type VehicleFormData = {
  coach_id: string;
  coach_type: string;
  total_seat: number;
  status: string;
};

const vehicleSchema = z.object({
  coach_id: z.string().min(1, "Vui lòng nhập biển số xe"),
  coach_type: z.string().min(1, "Vui lòng chọn loại xe"),
  total_seat: z.number().min(1, "Số ghế phải lớn hơn 0"),
  status: z.string().min(1, "Vui lòng chọn trạng thái"),
});

const VehiclesPage = () => {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading, isAdmin } = useRequireAdmin();
  const [vehicles, setVehicles] = useState<ICoach[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<ICoach | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      coach_id: "",
      coach_type: "",
      total_seat: 0,
      status: "running",
    },
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

  // Mock data (ICoach)
  useEffect(() => {
    setVehicles(mockCoaches);
    setPagination((prev) => ({ ...prev, total: mockCoaches.length }));
  }, []);

  const filteredVehicles = vehicles.filter((coach) => {
    const term = searchTerm.toLowerCase();
    return (
      coach.coach_id.toLowerCase().includes(term) ||
      coach.coach_type.toLowerCase().includes(term) ||
      coach.status.toLowerCase().includes(term) ||
      String(coach.total_seat).includes(searchTerm)
    );
  });

  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredVehicles.length,
      current: 1,
    }));
  }, [filteredVehicles.length]);

  const handleSubmit = (formData: VehicleFormData) => {
    if (editingVehicle) {
      setVehicles(
        vehicles.map((coach) =>
          coach.coach_id === editingVehicle.coach_id
            ? {
                ...coach,
                coach_id: formData.coach_id,
                coach_type: formData.coach_type,
                total_seat: formData.total_seat,
                status: formData.status,
              }
            : coach
        )
      );
    } else {
      const newCoach: ICoach = {
        coach_id:
          formData.coach_id ||
          `C-${String(vehicles.length + 1).padStart(3, "0")}`,
        coach_type: formData.coach_type,
        total_seat: formData.total_seat,
        status: formData.status as ICoach["status"],
      };
      setVehicles([...vehicles, newCoach]);
    }
    handleModalClose();
  };

  const handleEdit = (coach: ICoach) => {
    setEditingVehicle(coach);
    form.reset({
      coach_id: coach.coach_id,
      coach_type: coach.coach_type,
      total_seat: coach.total_seat,
      status: coach.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (coachId: string) => {
    setVehicles(vehicles.filter((coach) => coach.coach_id !== coachId));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
    form.reset();
  };

  const handleAddNew = () => {
    setEditingVehicle(null);
    form.reset();
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-100 text-green-800">Đang chạy</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Bảo trì</Badge>;
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "minibus":
        return <Badge className="bg-blue-100 text-blue-800">Minibus</Badge>;
      case "limousine":
        return (
          <Badge className="bg-purple-100 text-purple-800">Limousine</Badge>
        );
      case "limousine_cabin":
        return (
          <Badge className="bg-indigo-100 text-indigo-800">
            Limousine Cabin
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{type}</Badge>;
    }
  };

  const columns: ColumnsType<ICoach> = [
    {
      title: "Biển số",
      dataIndex: "coach_id",
      key: "coach_id",
      sorter: (a, b) => a.coach_id.localeCompare(b.coach_id),
    },
    {
      title: "Loại xe",
      dataIndex: "coach_type",
      key: "coach_type",
      sorter: (a, b) => a.coach_type.localeCompare(b.coach_type),
      render: (type) => getTypeBadge(type),
    },
    {
      title: "Số ghế",
      dataIndex: "total_seat",
      key: "total_seat",
      sorter: (a, b) => a.total_seat - b.total_seat,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(record)}
          >
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-600"
            onClick={() => handleDelete(record.coach_id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Show loading while checking auth
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

  // Redirect if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Bus className="h-8 w-8" />
          Quản lý xe
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin xe trong hệ thống
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm xe..."
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
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm xe
          </Button>
        </div>
      </div>

      {/* Vehicles Table */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Tất cả xe ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2">
          <Table
            style={{ height: "450px", overflowY: "auto" }}
            rowKey="coach_id"
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys: React.Key[]) => {
                setSelectedRowKeys(selectedKeys);
              },
            }}
            columns={columns}
            dataSource={paginatedVehicles}
            pagination={false}
            onRow={(record) => ({
              style: { cursor: "pointer" },
            })}
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

      {/* Ant Design Modal with shadcn/ui Form */}
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        title={editingVehicle ? "Chỉnh sửa xe" : "Thêm xe mới"}
        footer={
          <div className="flex justify-end gap-2">
            <Button key="cancel" variant="outline" onClick={handleModalClose}>
              Hủy
            </Button>
            <Button
              key="ok"
              variant="default"
              onClick={form.handleSubmit(handleSubmit)}
            >
              {editingVehicle ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        }
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="coach_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biển số/ID xe</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly placeholder="VD: C-LIMO-001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="coach_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại xe</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          placeholder="Chọn loại xe"
                          style={{ width: "100%" }}
                          options={[
                            { value: "minibus", label: "Minibus" },
                            { value: "limousine", label: "Limousine" },
                            {
                              value: "limousine_cabin",
                              label: "Limousine Cabin",
                            },
                          ]}
                          onChange={(value) => {
                            form.setValue(
                              "total_seat",
                              coachTypeMap[value as keyof typeof coachTypeMap]
                                .seats
                            );
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_seat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số ghế</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        placeholder="Chọn trạng thái"
                        style={{ width: "100%" }}
                        options={[
                          { value: "running", label: "Đang chạy" },
                          { value: "maintenance", label: "Bảo trì" },
                          { value: "inactive", label: "Không hoạt động" },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default VehiclesPage;
