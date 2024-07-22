import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

type LabelledInputProps = {
  label: string;
} & InputProps;

export default function LabelledInput({ label, id, ...inputProps }: LabelledInputProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
