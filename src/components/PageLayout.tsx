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
import { usePathname } from "next/navigation";

const PageLayout = ({
  props,
  children,
}: {
  props?: any;
  children: React.ReactNode;
}) => {
  const pathname = usePathname().replace("/", "");

  return (
    <div className="bg-white w-full max-w-7xl flex flex-col">
      <div className="flex items-center gap-2 mb-4 bg-gray-200 h-8 px-2 flex-shrink-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <span className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                  Home
                </span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname !== "" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-500">
                    {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default PageLayout;
