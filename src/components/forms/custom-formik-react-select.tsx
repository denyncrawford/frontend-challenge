import { FieldProps } from 'formik';
import React from 'react';
import Select, { OnChangeValue, Options } from 'react-select';

interface IOption {
  label: string;
  value: string;
}

interface IFormikSelectProps extends FieldProps {
  options: Options<IOption>;
  isMulti?: boolean;
  required?: boolean;
}

export const CustomFormikReactSelect = ({ field, form, options, isMulti = false, required }: IFormikSelectProps) => {
  const onChange = (option: OnChangeValue<IOption | IOption[], boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as IOption[]).map((item: IOption) => item.value) : (option as IOption).value,
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
