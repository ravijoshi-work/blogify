import React from "react";

type Propstype = {
  type: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  placeholder?: string;
};

const Input: React.FC<Propstype> = ({
  type,
  value,
  onChange,
  name,
  label,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full bg-primaryColorLight p-3 rounded-lg"
      />
    </div>
  );
};

export default Input;
