"use client";
import Image from "next/image";
import { SearchBar } from "./Search";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import useLoginStore from "@/store/useLogin";
import { UserIcon, LogOut, User, History, Settings } from "lucide-react";
import { Dropdown, Menu } from "antd";

const Navbar = () => {
  const [active, setActive] = useState<string>("/");
  const path = usePathname();
  const router = useRouter();
  const { isLoggedIn, data: userData, clearData } = useLoginStore();

  const handleLogout = () => {
    clearData();
    router.push("/");
  };

  const pathLabel = [
    {
      path: "/",
      label: "Trang chủ",
    },
    {
      path: "/search",
      label: "Tìm kiếm",
    },
    {
      path: "/about",
      label: "Giới thiệu",
    },
    {
      path: "/news",
      label: "Tin tức",
    },
    {
      path: "/recruitment",
      label: "Tuyển dụng",
    },
    {
      path: "/contact",
      label: "Liên hệ",
    },
  ];

  return (
    <nav className="flex p-4 bg-white h-24">
      <div className="flex items-center w-full min-h-full gap-4">
        <Link className="flex flex-1 justify-center items-center" href="/">
          <Image
            className="object-cover"
            src="/logo.png"
            alt="logo"
            width={160}
            height={160}
          />
        </Link>

        <div className="flex flex-4 justify-center item-center gap-6 text-lg">
          {pathLabel.map((item) => (
            <Link
              key={item.path}
              className={`flex items-center justify-center text-black px-2 ${
                path === item.path ? "font-bold" : ""
              }`}
              href={item.path}
              // onClick={() => setActive(item.path)}
            >
              <span className={`${path === item.path ? "font-bold" : ""}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-1 justify-center items-center">
          {isLoggedIn ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "profile",
                    label: (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Thông tin tài khoản</span>
                      </div>
                    ),
                    onClick: () => router.push("/profile"),
                  },
                  ...(userData.role === "admin"
                    ? [
                        {
                          key: "dashboard",
                          label: (
                            <div className="flex items-center gap-2">
                              <Settings className="h-4 w-4" />
                              <span>Quản lý</span>
                            </div>
                          ),
                          onClick: () => router.push("/dashboard/accounts"),
                        },
                      ]
                    : []),

                  {
                    key: "logout",
                    label: (
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                      </div>
                    ),
                    onClick: handleLogout,
                  },
                ],
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button className="bg-white border border-black text-black hover:bg-gray-200">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> {userData.name}
                </div>
              </Button>
            </Dropdown>
          ) : (
            <Button className="hover:bg-white hover:border hover:border-black hover:text-black">
              <Link href="/login">Đăng nhập</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
