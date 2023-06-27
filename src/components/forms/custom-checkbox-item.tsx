import React from 'react';

interface CustomCheckboxItemProps {
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
}

function CustomCheckboxItem({ checked, label, onChange, value, name }: CustomCheckboxItemProps) {
  return (
    <div className="mt-2 square-switch" key={value}>
      <input
        type="checkbox"
        id={value}
        value={value}
        checked={checked}
        name={name}
        onChange={onChange}
        className="checkbox-lg"
      />

      <label htmlFor={value} data-on-label="Si" data-off-label="No" />
      <span
        style={{
          position: 'relative',
          top: '-15px',
          marginLeft: '10px',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export { CustomCheckboxItem };
