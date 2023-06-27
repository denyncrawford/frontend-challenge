import { FieldProps } from 'formik';
import React from 'react';
import Select, { OnChangeValue, Options } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface FormikSelectProps extends FieldProps {
  options: Options<Option>;
  isMulti?: boolean;
  required?: boolean;
}

export const CustomFormikReactSelect = ({ field, form, options, isMulti = false, required }: FormikSelectProps) => {
  const onChange = (option: OnChangeValue<Option | Option[], boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value,
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      required={required}
    />
  );
};
