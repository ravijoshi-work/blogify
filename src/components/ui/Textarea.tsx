import React from "react";

type Propstype = {
  rows: number;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  label: string;
  placeholder: string;
};

const TextArea: React.FC<Propstype> = ({
  rows,
  value,
  onChange,
  name,
  label,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label>{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full bg-primaryColorLight p-3 rounded-lg"
      />
    </div>
  );
};

export default TextArea;
