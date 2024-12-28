"use client";

import { LoginBody, LoginBodyType } from "@/app/(auth)/login/auth.schema";
import {
  useGetProfileMutation,
  useLoginMutation,
} from "@/app/(auth)/login/useAuth";
import { InputCheckboxCommon } from "@/components/common/input-checkbox-common";
import { InputPassword } from "@/components/common/input-password";
import { InputTextCommon } from "@/components/common/input-text-common";
import { useAppStore } from "@/components/providers/app-provider";
import { Form } from "@/components/ui/form";
import { handleErrorApi } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const { setIsAuth, setUser } = useAppStore();
  const loginMutation = useLoginMutation();
  const getProfileMutation = useGetProfileMutation();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "quangnv.0214@gmail.com",
      password: "123456",
    },
  });
  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;

    try {
      const result = await loginMutation.mutateAsync(data);
      if (result.payload?.payload?.access_token) {
        setIsAuth(true);
        toast.success(result.payload.message);
        router.push("/");
      }
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };
  useEffect(() => {
    if (getProfileMutation.isSuccess) {
      setUser(getProfileMutation.data.payload);
    }
  }, [getProfileMutation.data]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={
          "flex flex-col justify-center items-center border p-10 border-gray-400 rounded-2xl bg-white"
        }
      >
        <div
          className={
            "text-black-1 text-center text-34-34 font-bold pb-3 flex flex-col gap-2"
          }
        ></div>
        <div
          className={
            "text-black-6 text-center font-medium text-16-16 pb-2 font-visby"
          }
        >
          Welcome back! Please enter your details
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <InputTextCommon
              label="Email"
              name="email"
              placeholder="Enter your email"
              control={form.control}
            />
            <InputPassword
              label="Password"
              name="password"
              placeholder="Enter your password"
              control={form.control}
            />
            <div className="flex justify-end mb-2">
              <Link href={"/forgot-password"}>Forgot Password?</Link>
            </div>
            <InputCheckboxCommon
              label="Remember me"
              name="rememberMe"
              control={form.control}
            />
            <Button
              loading={loginMutation.isPending}
              type="primary"
              htmlType="submit"
            >
              Sign in
            </Button>
          </form>
        </Form>

        <div className={"flex justify-center py-4 font-visby"}>
          Not registered?
          <Link href={"/register"} className="mx-1 hover:text-blue-300 link">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
