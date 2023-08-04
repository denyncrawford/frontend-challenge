import { FieldProps } from "formik";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface ICustomFormikInputProps extends FieldProps {
  id: string;
}

const CustomFormikInput = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  ...props
}: ICustomFormikInputProps) => (
  <Input
    {...props}
    {...fields}
    invalid={Boolean(touched[fields.name] && errors[fields.name])}
  />
);
export { CustomFormikInput };
