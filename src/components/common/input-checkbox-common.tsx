"use client";

import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

export interface IInputCheckboxCommonProps {
  label?: string;
  name: string;
  control: any;
}

export function InputCheckboxCommon(props: IInputCheckboxCommonProps) {
  const { label, name, control } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="items-top flex space-x-2">
              <Checkbox {...field} id={name} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
