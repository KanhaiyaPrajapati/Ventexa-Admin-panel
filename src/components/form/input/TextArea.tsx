import React from "react";

interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value"
  > {
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  hint?: string;
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "Enter your message",
  rows = 3,
  value = "",
  onChange,
  className = "",
  disabled = false,
  error = false,
  hint = "",
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none ${className} `;

  if (disabled) {
    textareaClasses +=
      " bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    textareaClasses +=
      " bg-transparent border-red-400 focus:ring-2 focus:ring-red-500/20 dark:border-red-600";
  } else {
    textareaClasses +=
      " bg-transparent text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white";
  }

  return (
    <div className="relative">
      <textarea
        {...rest}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />

      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
