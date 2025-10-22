"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Calendar,
  Bus,
  History,
  Menu,
  X,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useLoginStore from "@/store/useLogin";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const navigationItems = [
  {
    name: "Quản lý tài khoản",
    href: "/dashboard/accounts",
    icon: Users,
  },
  {
    name: "Quản lý lịch trình",
    href: "/dashboard/schedules",
    icon: Calendar,
  },
  {
    name: "Quản lý xe",
    href: "/dashboard/vehicles",
    icon: Bus,
  },
  {
    name: "Lịch sử đặt vé",
    href: "/dashboard/booking-history",
    icon: History,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: userData, clearData } = useLoginStore();

  const handleLogout = () => {
    clearData();
    router.push("/");
  };

  return (
    <PageLayout>
      <div className="flex h-screen gap-8">
        <div className="hidden h-screen lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200">
          <div className="flex flex-col h-full bg-white">
            <div
              className="flex h-16 items-center px-4 cursor-pointer border-b"
              onClick={() => router.push("/dashboard/accounts")}
            >
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t p-4 bg-gray-50">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userData.role}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-screen">
          <main className="flex-1 overflow-auto p-6">
            <div className="h-full">{children}</div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
}
