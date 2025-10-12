import {
  FormControl,
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { coachTypeMap, PAYMENT_STATUS, TICKET_TYPE } from "@/lib/constants";
import useBookingStore from "@/store/useBookingStore";
import useLoginStore from "@/store/useLogin";
import { Divider, QRCode } from "antd";
import dayjs from "dayjs";
import {
  RefreshCcwIcon,
  User,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema validation cho form
const customerInfoSchema = z.object({
  name: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  note: z.string().optional(),
});

type CustomerInfoForm = z.infer<typeof customerInfoSchema>;

const paymentTab = () => {
  const [customerInfo, setCustomerInfo] = useState<boolean>(false);
  const bookingData = useBookingStore((state) => state.data);
  const setBookingData = useBookingStore((state) => state.setData);
  const { data: userData } = useLoginStore();

  const form = useForm<CustomerInfoForm>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      name: userData.name ?? "",
      phone: userData.phone ?? "",
      address: userData.address ?? "",
      note: "",
    },
  });

  console.log("payment_bookingData", bookingData);

  const onFinish = (data: CustomerInfoForm) => {
    setBookingData({
      name: data.name,
      phone: data.phone,
      address: data.address,
      note: data.note,
    });
    setCustomerInfo(true);
  };

  return (
    <div className="flex-1 min-h-[200px] rounded-lg bg-gray-50">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Thông tin thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!customerInfo && (
            <div className="max-w-2xl mx-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onFinish)}
                  className="space-y-6"
                >
                  {/* Họ và tên */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Họ và tên *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập họ và tên của bạn"
                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Số điện thoại */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Số điện thoại *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập số điện thoại của bạn"
                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Địa chỉ */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Địa chỉ *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ của bạn"
                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Ghi chú */}
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Ghi chú
                        </FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Nhập ghi chú (không bắt buộc)"
                            className="w-full h-24 px-3 py-2 text-base border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Nút submit */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Xác nhận thông tin
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
          {customerInfo && (
            <div className="flex flex-row gap-6 m-4">
              <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-3 mb-6">
                  <div className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Thông tin khách hàng
                  </div>
                  <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                    <div className="flex-1 font-semibold text-gray-700">
                      Họ và tên:
                    </div>
                    <div className="flex-2 text-gray-900">
                      {bookingData?.name}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                    <div className="flex-1 font-semibold text-gray-700">
                      SĐT:
                    </div>
                    <div className="flex-2 text-gray-900">
                      {bookingData?.phone}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                    <div className="flex-1 font-semibold text-gray-700">
                      Địa chỉ:
                    </div>
                    <div className="flex-2 text-gray-900">
                      {bookingData?.address}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                    <div className="flex-1 font-semibold text-gray-700">
                      Ghi chú:
                    </div>
                    <div className="flex-2 text-gray-900">
                      {bookingData?.note}
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-lg mb-2">Chiều đi</div>
                  <div className="font-bold text-lg">
                    {bookingData?.start_location} - {bookingData?.end_location}
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 font-bold">Thời gian:</div>
                    <div className="flex-2">
                      {dayjs(bookingData?.outbound?.start_time).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 font-bold">ID chuyến:</div>
                    <div className="flex-2">
                      {bookingData?.outbound?.trip_id}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 font-bold">Loại xe:</div>
                    <div className="flex-2">
                      {bookingData?.outbound?.coach_type}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 font-bold">Biển số xe:</div>
                    <div className="flex-2">
                      {bookingData?.outbound?.coach_id}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 font-bold">Số ghế:</div>
                    <div className="flex-2">
                      {bookingData?.outbound?.ordered_seat.join(", ")}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 font-bold">giá vé:</div>
                    <div className="flex-2 font-bold">
                      {bookingData?.outbound?.price?.toLocaleString()} VNĐ
                    </div>
                  </div>
                </div>
                <Divider />
                {bookingData?.ticket_type === TICKET_TYPE.return && (
                  <>
                    <div className="flex flex-col gap-1">
                      <div className="font-bold text-lg mb-2">Chiều về</div>
                      <div className="font-bold text-lg">
                        {bookingData?.end_location} -{" "}
                        {bookingData?.start_location}
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 font-bold">Thời gian:</div>
                        <div className="flex-2">
                          {dayjs(bookingData?.return?.start_time).format(
                            "HH:mm DD/MM/YYYY"
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 font-bold">Mã chuyến:</div>
                        <div className="flex-2">
                          {bookingData?.return?.trip_id}
                        </div>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 font-bold">Loại xe:</div>
                        <div className="flex-2">
                          {bookingData?.return?.coach_type}
                        </div>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 font-bold">Biển số xe:</div>
                        <div className="flex-2">
                          {bookingData?.return?.coach_id}
                        </div>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 font-bold">Số ghế:</div>
                        <div className="flex-2">
                          {bookingData?.return?.ordered_seat.join(", ")}
                        </div>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 font-bold">giá vé:</div>
                        <div className="flex-2 font-bold">
                          {bookingData?.return?.price?.toLocaleString()} VNĐ
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </>
                )}
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-lg mb-2">Tổng thanh toán</div>
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 font-bold">Tổng tiền:</div>
                    <div className="flex-2 font-bold text-lg">
                      {bookingData?.total_price?.toLocaleString()} VNĐ
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-2 items-center mt-16">
                <QRCode
                  size={250}
                  value="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                />
                <div className="mt-4">
                  <div className="text-center">
                    <span className="font-bold">Tên TK: </span>
                    Nguyễn Văn A
                  </div>
                  <div className="text-center">
                    <span className="font-bold">STK: </span>
                    01234 5678 9012
                  </div>
                  <div className="text-center font-bold">
                    <span>Số tiền: </span>
                    {bookingData?.total_price?.toLocaleString()} VNĐ
                  </div>
                  <div className="text-center flex items-center justify-center gap-1">
                    <span className="font-bold">Trạng thái: </span>
                    {bookingData?.payment_status === PAYMENT_STATUS.pending
                      ? "Đang chờ"
                      : bookingData?.payment_status === PAYMENT_STATUS.done
                      ? "Đã thanh toán"
                      : bookingData?.payment_status === PAYMENT_STATUS.cancelled
                      ? "Đã hủy"
                      : "Chưa thanh toán"}
                    <RefreshCcwIcon
                      className="ml-2 w-4 h-4 hover:cursor-pointer hover:text-blue-500"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
            // </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default paymentTab;
