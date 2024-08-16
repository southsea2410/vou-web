import { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

type LabelledInputProps = {
  label: string;
} & InputProps;

const LabelledInput = forwardRef<HTMLInputElement, LabelledInputProps>(
  ({ label, id, name, ...inputProps }: LabelledInputProps, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id ?? name}>{label}</Label>
        <Input id={id ?? name} name={name} ref={ref} {...inputProps} />
      </div>
    );
  },
);

LabelledInput.displayName = "LabelledInput";

export default LabelledInput;
