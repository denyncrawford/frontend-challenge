/* eslint-disable @next/next/no-img-element */
import { Field, FieldAttributes, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { CustomFormikInputGroupText } from '../forms/custom-formik-input-group-text';
import { cx } from 'cva';
import { useIsRedirectingAtom } from '@/hooks/useIsRedirecting';

const COPY_FOR_APPS = {
  FALLBACK: {
    title: 'Ingresar',
    subtitle: 'Ingresa tus credenciales para acceder a tu cuenta',
  },
};

interface FormValues {
  email: string;
  password: string;
}

const CODE_ERRORS_TRANSLATIONS = {
  InvalidPasswordException:
    'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  UsernameExistsException: 'El correo ingresado ya está registrado',
  NotAuthorizedException: 'El correo o la contraseña son incorrectos',
  UserNotConfirmedException: 'El correo ingresado no ha sido confirmado',
};

export function SignInForm() {
  const { query, push } = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useIsRedirectingAtom();

  return (
    <div className={'px-2'}>
      {/* logo */}
      <div className={'flex justify-center'}></div>
      <div
        className={
          'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[528px] py-8 rounded-[34px] border-solid border-[#eff0f7] bg-white'
        }
      >
        <h2 className={cx('text-center font-semibold text-[34px] leading-[46px] text-[#556ee6]')}>Ingresar</h2>
        <p
          className={cx(
            'not-italic font-normal text-lg leading-[30px] text-center text-[#4f4f4f] mt-[25px] mb-[33px] px-4 md:px-12',
          )}
        >
          {COPY_FOR_APPS.FALLBACK.subtitle}
        </p>
        <Formik
          initialValues={{
            email: (query.email as string) || '',
            password: '',
          }}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            localStorage.setItem('auth_email', values.email.trim().toLowerCase());
            try {
              await Auth.signIn({
                username: values.email.trim().toLowerCase(),
                password: values.password,
              });
              toast.success('Se ha iniciado sesión correctamente');
              setIsRedirecting(true);
              alert('Se ha iniciado sesión correctamente');
            } catch (error) {
              console.log('An error occurred while signing in', error);
              const errorMessage = 'Ha ocurrido un error, por favor intenta de nuevo';
              setError(errorMessage);
              setIsLoading(false);
              if ((error as any).code === 'UserNotConfirmedException') {
                console.log('UserNotConfirmedException');
                Auth.resendSignUp(values.email.trim().toLowerCase());

                push({
                  pathname: '/confirmation',
                  query: {
                    email: values.email.trim().toLowerCase(),
                    ...query,
                  },
                });
              }
            }
          }}
        >
          {(props: FormikProps<FormValues>) => (
            <Form className="px-4 md:px-12">
              <div>
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

                <div className="md:mt-9">
                  <Field name="password">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldAttributes<any>) => (
                      <div>
                        <label htmlFor="password" className="font-normal text-[15px] leading-6 bg-red  text-[#333333]">
                          Contraseña *
                        </label>

                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="border border-[#e0e0e0]  text-sm rounded-2xl block w-full p-2.5  pr-10  h-16 mt-2"
                            placeholder="Contraseña"
                            {...field}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <svg width={33} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M.531 3.307a.515.515 0 0 1-.518-.511L0 .719A.515.515 0 0 1 .512.2L32.083 0a.515.515 0 0 1 .518.512l.008 1.201h.004v.68l.005.71h-.005v.842a8.582 8.582 0 0 1-15.45 5.15 8.596 8.596 0 0 1-3.582 2.78 8.582 8.582 0 0 1-11.868-7.93V3.3l-1.182.007Zm18.349.638A5.148 5.148 0 0 0 26 8.703a5.152 5.152 0 0 0 3.18-4.758v-.82l-10.3.066v.754ZM5.147 3.278l10.3-.065v.732a5.15 5.15 0 1 1-10.3 0v-.667Z"
                                    fill="#000"
                                  />
                                  <ellipse cx={10.5} cy={5.5} rx={6.5} ry={4.5} fill="#000" />
                                  <ellipse cx={24.5} cy={5.5} rx={6.5} ry={4.5} fill="#000" />
                                </svg>
                              ) : (
                                <svg width={33} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M.531 3.307a.515.515 0 0 1-.518-.511L0 .719A.515.515 0 0 1 .512.2L32.083 0a.515.515 0 0 1 .518.512l.008 1.201h.004v.68l.005.71h-.005v.842a8.582 8.582 0 0 1-15.45 5.15 8.596 8.596 0 0 1-3.582 2.78 8.582 8.582 0 0 1-11.868-7.93V3.3l-1.182.007Zm18.349.638A5.148 5.148 0 0 0 26 8.703a5.152 5.152 0 0 0 3.18-4.758v-.82l-10.3.066v.754ZM5.147 3.278l10.3-.065v.732a5.15 5.15 0 1 1-10.3 0v-.667Z"
                                    fill="#000"
                                  />
                                  <circle cx={10.5} cy={4.5} r={2.5} fill="#000" />
                                  <circle cx={24.5} cy={4.5} r={2.5} fill="#000" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                        {meta.touched && meta.error && (
                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="justify-content-center">
                {error && (
                  <div className="mt-2">
                    <div className="text-sm text-center text-red-500">{error}</div>
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className={
                      'min-h-[56px] w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-9 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                    disabled={isLoading}
                  >
                    Ingresar
                  </button>
                </div>
                <div className="mt-3 text-center text-[#4850F3]">
                  <Link
                    href={{
                      pathname: '/forgot-password',
                      query: {
                        ...query,
                      },
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className="flex items-center my-3">
          <div className="flex-grow border-b border-[#e0e0e0]"></div>
        </div>

        <div className="px-12 mt-4 text-center">
          <p className="leading-[30px] text-center">¿No tienes una cuenta?</p>
          <Link
            href={{
              pathname: '/sign-up',
              query: {
                ...query,
              },
            }}
            style={{
              borderRadius: '15px',
              border: '2px solid #899FFF',
            }}
            className="h-14 w-full rounded-2xl text-[#4850F3] font-semibold text-lg leading-[30px] text-center  bg-white mt-2 focus:outlie-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90]  align-middle flex items-center justify-center"
          >
            Crea una nueva cuenta aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
