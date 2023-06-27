import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import { Button} from 'reactstrap';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { cx } from 'cva';
import { CustomFormikInputGroupText } from '../forms/custom-formik-input-group-text';

interface FormValues {
  email: string;
}

export function ForgotPasswordForm() {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={'px-2'}>
      <div
        className={
          'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[528px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12'
        }
      >
        <h2 className={cx('text-center font-semibold text-2xl md:text-[34px] leading-[46px] text-[#556ee6]')}>
          Recuperar contraseña
        </h2>
        <p
          className={
            'not-italic font-normal text-base md:text-lg leading-[30px] text-[#4f4f4f] mt-4 md:mt-[25px] mb-[33px] text-center'
          }
        >
          Ingresa el correo electrónico de tu cuenta, te enviaremos un código de verificación para recuperar tu
          contraseña.
        </p>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={async (values, actions) => {
            localStorage.setItem('forgotPasswordEmail', values.email.trim().toLowerCase());
            setIsLoading(true);
            try {
              await Auth.forgotPassword(values.email.trim().toLowerCase());

              toast.info('Se ha enviado un correo de verificación a tu cuenta de correo electrónico');

              push({
                pathname: '/recovery-password',
                query: {
                  ...query,
                },
              });
            } catch (error) {
              setIsLoading(false);
              toast.error('Ha ocurrido un error al intentar recuperar tu contraseña');
            }
          }}
        >
          {(props: FormikProps<FormValues>) => (
            <Form>
              <div>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  required
                  label="Correo electrónico *"
                  component={CustomFormikInputGroupText}
                  className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                  labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className={
                    'h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-12 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed'
                  }
                  color="primary"
                  block
                  disabled={!props.dirty || isLoading}
                >
                  Recuperar contraseña
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-3 text-center text-[#4850F3]">
          <Link
            href={{
              pathname: '/',
              query: {
                ...query,
              },
            }}
          >
            Regresar a la vista de Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
