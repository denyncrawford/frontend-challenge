import { FieldProps } from 'formik';
import React from 'react';
import { FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { cx } from 'cva';

interface CustomFormikInputGroupTextProps extends FieldProps {
  id: string;
  label?: string;
  labelClassName?: string;
  leftAddon?: string;
  rightAddon?: string;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
  bsSize?: 'sm' | 'lg';
  description?: string;
}

const CustomFormikInputGroupText = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  leftAddon,
  rightAddon,
  rightButton,
  leftButton,
  label,
  bsSize,
  description,
  labelClassName,
  ...props
}: CustomFormikInputGroupTextProps) => (
  <FormGroup>
    {label ? (
      <Label size={bsSize} for={props.id} className={cx('label-color', labelClassName)}>
        {label}
      </Label>
    ) : null}
    <InputGroup size="">
      {rightButton ? rightButton : null}
      {leftAddon ? <InputGroupText> {leftAddon}</InputGroupText> : null}
      <Input bsSize={bsSize} {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])} />
      {rightAddon ? <InputGroupText> {rightAddon}</InputGroupText> : null}
      {leftButton ? leftButton : null}
    </InputGroup>
    {description ? <p className={'mt-1 text-sm text-gray-400'}>{description}</p> : null}
    {touched[fields.name] && errors[fields.name] ? (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors?.[fields.name] as React.ReactNode}</p>
    ) : (
      ''
    )}
  </FormGroup>
);
export { CustomFormikInputGroupText };
