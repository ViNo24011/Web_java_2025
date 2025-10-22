"use client";

import BasePagination from "@/components/ui/antd-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockAccounts } from "@/lib/mock/mockAccounts";
import { IAccount } from "@/types";
import { useRequireAdmin } from "@/hooks/useAuth";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  Eye,
  KeyRound,
  Plus,
  Search,
  SquarePen,
  Trash,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditProfileModal from "@/components/EditProfileModal";
import ChangePasswordModal from "@/components/ChangePasswordModal";

const AccountsPage = () => {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading, isAdmin } = useRequireAdmin();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<IAccount | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
    setAccounts(mockAccounts);
    setPagination((prev) => ({ ...prev, total: mockAccounts.length }));
  }, []);

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.phone.includes(searchTerm)
  );

  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredAccounts.length,
      current: 1,
    }));
  }, [filteredAccounts.length]);

  const handleEdit = (account: IAccount) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleDelete = (accountId: string) => {
    setAccounts(accounts.filter((account) => account.account_id !== accountId));
    setPagination((prev) => ({ ...prev, total: accounts.length - 1 }));
  };

  const handleModalSubmit = (updatedData: IAccount) => {
    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.account_id === editingAccount.account_id
            ? { ...account, ...updatedData }
            : account
        )
      );
    }
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handlePasswordChange = (account: IAccount) => {
    setEditingAccount(account);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setEditingAccount(null);
  };

  const handlePasswordSubmit = (updatedData: IAccount) => {
    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.account_id === editingAccount.account_id
            ? { ...account, password: updatedData.password }
            : account
        )
      );
    }
    setIsPasswordModalOpen(false);
    setEditingAccount(null);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case "customer":
        return <Badge className="bg-blue-100 text-blue-800">Customer</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{role}</Badge>;
    }
  };

  const columns: ColumnsType<IAccount> = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
      render: (role) => getRoleBadge(role),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(record)}>
            <SquarePen className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePasswordChange(record)}
          >
            <KeyRound className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-600"
            onClick={() => handleDelete(record.account_id)}
          >
            <Trash2 className="h-4 w-4" />
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
          <Users className="h-8 w-8" />
          Quản lý tài khoản
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý tất cả tài khoản người dùng trong hệ thống
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm tài khoản..."
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
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm tài khoản
          </Button>
        </div>
      </div>

      {/* Accounts Table */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Tất cả tài khoản ({filteredAccounts.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2">
          <Table
            style={{ height: "450px", overflowY: "auto" }}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys: React.Key[]) => {
                setSelectedRowKeys(selectedKeys);
              },
            }}
            rowKey="account_id"
            columns={columns}
            dataSource={paginatedAccounts}
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={
          editingAccount || {
            account_id: "",
            name: "",
            username: "",
            password: "",
            role: "",
            phone: "",
            address: "",
            order_history: [],
            note: "",
          }
        }
        onSubmit={handleModalSubmit}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        data={
          editingAccount || {
            account_id: "",
            name: "",
            username: "",
            password: "",
            role: "",
            phone: "",
            address: "",
            order_history: [],
            note: "",
          }
        }
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
};

export default AccountsPage;
