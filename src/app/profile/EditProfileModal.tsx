"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LOCATIONS, TRIP_TYPES } from "@/lib/constants";
import useBookingStore from "@/store/useBookingStore";
import { IAccount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IAccount;
  onSubmit: (data: IAccount) => void;
}

type EditProfileFormData = {
  name: string;
  phone: string;
  address?: string;
  note?: string;
};

const editProfileSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .regex(/^(0|\+84)\d{9,10}$/, { message: "Số điện thoại không hợp lệ" }),
  address: z.string().optional(),
  note: z.string().optional(),
});

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: data?.name || "",
      phone: data?.phone || "",
      address: data?.address || "",
      note: data?.note || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
        note: data.note || "",
      });
    }
  }, [data, form]);

  const handleSubmit = (formData: EditProfileFormData) => {
    const updatedData: IAccount = {
      ...data,
      ...formData,
    };
    onSubmit(updatedData);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={data ? "Sửa tài khoản" : "Thêm tài khoản"}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập họ và tên" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập số điện thoại" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập địa chỉ" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <TextArea {...field} rows={3} placeholder="Nhập ghi chú" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
