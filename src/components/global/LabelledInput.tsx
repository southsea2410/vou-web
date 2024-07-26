import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

type LabelledInputProps = {
  label: string;
} & InputProps;

export default function LabelledInput({ label, id, name, ...inputProps }: LabelledInputProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id ?? name}>{label}</Label>
      <Input id={id ?? name} {...inputProps} name={name} />
    </div>
  );
}
