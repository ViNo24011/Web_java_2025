"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoginStore from "@/store/useLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  MapPin,
  Mail,
  ArrowLeft,
  Edit,
  Key,
  KeyRound,
} from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import EditProfileModal from "@/app/profile/EditProfileModal";
import BookingHistoryCard from "@/app/profile/BookingHistoryCard";
import TicketDetailModal from "@/components/TicketDetailModal";
import { ITicket } from "@/types";
import { mockTickets } from "@/lib/mock/mockTickets";
import ChangePasswordModal from "@/components/ChangePasswordModal";

const ProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, data: userData } = useLoginStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [isChangePassword, setIsChangePassword] = useState(false);
  // Filter tickets for current user
  const userTickets = mockTickets.filter(
    (ticket) => ticket.account_id === userData?.account_id
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handleEditProfile = () => {};

  const handleViewTicketDetails = (ticket: ITicket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  };

  const handleChangePassword = (data: any) => {
    console.log("change password");
  };

  return (
    <PageLayout>
      <div className="w-full h-full p-2 gap-44">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Thông tin cá nhân
          </h1>
        </div>

        <div className="min-h-[70vh] grid grid-cols-1 lg:grid-cols-3 gap-6 pb-4">
          {/* Thông tin cơ bản */}
          <Card className="col-span-1">
            <CardHeader className="flex justify-between">
              <CardTitle className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <User className="h-5 w-5" />
                  Thông tin cơ bản
                </div>
                <p className="text-sm text-gray-500">
                  ID: {userData.account_id}
                </p>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(true)}
                  title="Sửa thông tin"
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsChangePassword(true)}
                  title="Đổi mật khẩu"
                >
                  <KeyRound className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-lg font-semibold">Họ và tên</label>
                  <p className="">{userData.name}</p>
                </div>
              </div>
              <div>
                <label className="text-lg font-semibold">Số điện thoại</label>
                <p className="">{userData.phone}</p>
              </div>
              <div>
                <label className="text-lg font-semibold">Địa chỉ</label>
                <p className="">{userData.address}</p>
              </div>
              <div>
                <label className="text-lg font-semibold">Ghi chú</label>
                <p className="">{userData.note}</p>
              </div>
            </CardContent>
          </Card>

          {/* Lịch sử đặt vé */}
          <BookingHistoryCard
            className="col-span-1 lg:col-span-2"
            tickets={userTickets}
            onViewDetails={handleViewTicketDetails}
          />
        </div>
      </div>
      <EditProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={userData}
        onSubmit={handleEditProfile}
      />
      <TicketDetailModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        ticket={selectedTicket}
      />
      <ChangePasswordModal
        isOpen={isChangePassword}
        onClose={() => setIsChangePassword(false)}
        data={userData}
        onSubmit={handleChangePassword}
      />
    </PageLayout>
  );
};

export default ProfilePage;
