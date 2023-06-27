import { Field, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CustomFormikInputGroupText } from '../forms/custom-formik-input-group-text';
import { useEmailPasswordAtom } from '@/hooks/useEmailPasswordAtom';
interface FormValues {
  code: string;
  email: string;
}

const CODE_ERRORS_TRANSLATIONS = {
  CodeMismatchException: 'El código ingresado es incorrecto, por favor verifica que hayas ingresado el código correcto',
  ExpiredCodeException: 'El código ingresado ha expirado',
};

export function Confirmation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { push, query } = useRouter();
  const [emailPassword, setEmailPassword] = useEmailPasswordAtom();
  return (
    <div className="px-2">
      <div
        className={
          'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[528px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12'
        }
      >
        <h2 className={'text-center font-semibold text-[34px] leading-[46px] text-[#556ee6]'}>Confirmación</h2>
        <p className={'not-italic font-normal text-lg leading-[30px] text-center text-[#4f4f4f] mt-[25px] mb-[33px]'}>
          Por favor ingresa el código de confirmación que te hemos enviado a tu correo electrónico
        </p>
        <Formik
          initialValues={{
            code: '',
            email: emailPassword.email,
          }}
          onSubmit={async (values, actions) => {
            const email = values.email.trim().toLowerCase();
            setIsLoading(true);
            try {
              Auth.confirmSignUp(email, values.code)
                .then(() => {
                  toast.info('Tu cuenta ha sido confirmada');
                  if (emailPassword.email && emailPassword.password) {
                    Auth.signIn(emailPassword.email, emailPassword.password).then(() => {
                      push({
                        pathname: '/redirecting',
                        query: {
                          ...query,
                          email: email,
                        },
                      });
                    });
                  } else {
                    push({
                      pathname: '/',
                      query: {
                        ...query,
                        email: email,
                      },
                    });
                  }
                })
                .catch((error) => {
                  let errorMessage = 'Ha ocurrido un error, por favor intenta de nuevo';
                  if (CODE_ERRORS_TRANSLATIONS[(error as any).code as keyof typeof CODE_ERRORS_TRANSLATIONS]) {
                    errorMessage =
                      CODE_ERRORS_TRANSLATIONS[(error as any).code as keyof typeof CODE_ERRORS_TRANSLATIONS];
                  }
                  setError(errorMessage);
                  setIsLoading(false);
                });
            } catch (error) {
              let errorMessage = 'Ha ocurrido un error, por favor intenta de nuevo';

              if (CODE_ERRORS_TRANSLATIONS[(error as any).code as keyof typeof CODE_ERRORS_TRANSLATIONS]) {
                errorMessage = CODE_ERRORS_TRANSLATIONS[(error as any).code as keyof typeof CODE_ERRORS_TRANSLATIONS];
              }
              setError(errorMessage);
              setIsLoading(false);
            }
          }}
        >
          {(props: FormikProps<FormValues>) => (
            <Form className="px-5">
              {!emailPassword.email && (
                <div>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Correo electrónico"
                    required
                    label="Correo electrónico *"
                    component={CustomFormikInputGroupText}
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2 mb-4'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                  />
                </div>
              )}
              <div>
                <Field
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Código de confirmación"
                  required
                  label="Código de confirmación *"
                  component={CustomFormikInputGroupText}
                  className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                  labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                />
              </div>

              <div className="justify-content-center">
                {error && (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500" role="alert">
                    {error}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={!props.dirty || isLoading}
                    className={
                      'h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-12 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                  >
                    Confirmar
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ¿No recibiste el código?{' '}
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await Auth.resendSignUp(props.values.email.trim().toLowerCase());
                        toast.info('Se ha reenviado el código');
                      } catch (error) {
                        toast.error(
                          // @ts-expect-error
                          CODE_ERRORS_TRANSLATIONS?.[error.code as keyof typeof CODE_ERRORS_TRANSLATIONS] ||
                            'Ha ocurrido un error',
                        );
                      }
                    }}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Reenviar
                  </button>
                </span>
              </div>
            </Form>
          )}
        </Formik>
        {/* OR */}
      </div>
    </div>
  );
}
