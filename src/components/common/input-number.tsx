import { InputNumber } from "antd";
import { FormItem } from "react-hook-form-antd";

export interface IInputNumberCommonProps {
  label?: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  control?: any;
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
  addonAfter?: string;
  isRequired?: boolean;
  onChange?: (value: number | null) => void;
  precision?: number;
}

export function InputNumberCommon(props: IInputNumberCommonProps) {
  const {
    label,
    name,
    placeholder,
    prefix,
    control,
    size = "middle",
    disabled = false,
    min,
    max,
    className,
    addonAfter,
    isRequired,
    onChange,
    precision,
  } = props;
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex">
        {label && <p className="font-medium">{label}</p>}
        {isRequired ? (
          <span className="text-14-16 md:text-16-20 text-error">*</span>
        ) : null}
      </div>
      <FormItem control={control} name={name}>
        <InputNumber
          style={{
            fontFamily: "Visby",
            width: "100%",
          }}
          name={name}
          placeholder={placeholder}
          prefix={prefix}
          size={size}
          disabled={disabled}
          min={min}
          max={max}
          addonAfter={addonAfter}
          onChange={onChange}
          precision={precision}
          // className="w-full"
        />
      </FormItem>
    </div>
  );
}
