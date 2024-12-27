"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
export interface IInputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  control: any;
  size?: "large" | "middle" | "small";
}

export function InputPassword(props: IInputPasswordProps) {
  const { label, name, placeholder, prefix, control, size = "middle" } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input.Password
              {...field}
              placeholder={placeholder}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                fontFamily: "Visby",
              }}
              size={size}
              prefix={prefix}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
