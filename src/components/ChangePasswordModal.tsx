"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IAccount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IAccount;
  onSubmit: (data: IAccount) => void;
}

type ChangePasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
      }),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, form]);

  const handleSubmit = (formData: ChangePasswordFormData) => {
    const updatedData: IAccount = {
      ...data,
      password: formData.newPassword,
    };
    onSubmit(updatedData);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Đổi mật khẩu"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Đổi mật khẩu
        </Button>,
      ]}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4 py-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input.Password
                      {...field}
                      placeholder="Nhập mật khẩu mới"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input.Password
                      {...field}
                      placeholder="Nhập lại mật khẩu mới"
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
  );
};

export default ChangePasswordModal;
