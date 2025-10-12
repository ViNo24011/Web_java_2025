"use client";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);
    // Reset loading after processing
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="mt-24">
        <Card className="h-100 w-100">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
            <CardDescription>Điền thông tin đăng nhập</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mx-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tài khoản</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <span className="text-sm text-gray-500 flex justify-center gap-2">
                Chưa có tài khoản?
                <Link href="/register" className="text-blue-500">
                  Đăng ký
                </Link>
              </span>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default page;
