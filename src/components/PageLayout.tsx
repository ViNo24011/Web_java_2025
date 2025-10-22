"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PageLayout = ({
  props,
  children,
}: {
  props?: any;
  children: React.ReactNode;
}) => {
  const pathname = usePathname().split("/").filter(Boolean);

  return (
    <div className="min-h-screen bg-white w-full max-w-7xl flex flex-col">
      <div className="flex items-center gap-2 mb-2 bg-gray-200 h-8 px-2 flex-shrink-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">
                <span className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                  Home
                </span>
              </Link>
            </BreadcrumbItem>
            {pathname.length > 0 && (
              <>
                {pathname.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-500">
                        <Link
                          href={`/${pathname.slice(0, index + 1).join("/")}`}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Link>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </div>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
