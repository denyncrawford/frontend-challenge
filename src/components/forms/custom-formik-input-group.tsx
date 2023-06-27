import { FieldProps } from 'formik';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { CustomFormikInput } from './custom-formik-input';

interface CustomFormikInputGroupProps extends FieldProps {
  id: string;
  label: string;
}

const CustomFormikInputGroup = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  label,
  ...props
}: CustomFormikInputGroupProps) => (
  <FormGroup>
    <Label for={props.id} className={'label-color'}>
      {label}
    </Label>
    <CustomFormikInput field={fields} form={{ touched, errors, ...rest }} {...props} />
    {touched[fields.name] && errors[fields.name] ? (
      <FormFeedback>{errors?.[fields.name] as React.ReactNode}</FormFeedback>
    ) : (
      ''
    )}
  </FormGroup>
);
export { CustomFormikInputGroup };
