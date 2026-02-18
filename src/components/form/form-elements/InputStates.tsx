import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";

export default function InputStates() {
  const [email, setEmail] = useState("");
  const [emailTwo, setEmailTwo] = useState("");
  const [error, setError] = useState(false);

  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  // FIX: Change 'e: React.ChangeEvent<HTMLInputElement>' to 'value: string'
  // and remove 'e.target.value' because the component already provides the value.
  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateEmail(value);
  };

  const handleEmailTwoChange = (value: string) => {
    setEmailTwo(value);
    validateEmail(value);
  };

  return (
    <ComponentCard
      title="Input States"
      desc="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-5 sm:space-y-6">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            error={error}
            onChange={handleEmailChange} // Now types match perfectly
            placeholder="Enter your email"
            hint={error ? "This is an invalid email address." : ""}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={emailTwo}
            success={!error}
            onChange={handleEmailTwoChange} // Now types match perfectly
            placeholder="Enter your email"
            hint={!error ? "This is a success message." : ""}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="text"
            value="disabled@example.com"
            disabled={true}
            placeholder="Disabled email"
          />
        </div>
      </div>
    </ComponentCard>
  );
}