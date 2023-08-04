import { Field, FieldAttributes, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CustomFormikInputGroupText } from '../forms/custom-formik-input-group-text';
import { useEmailPasswordAtom } from '@/hooks/useEmailPasswordAtom';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
  confirm_password: string;
  code: string;
}

const CODE_ERRORS_TRANSLATIONS = {
  InvalidPasswordException:
    'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  CodeMismatchException: 'El código ingresado es incorrecto, por favor verifica que hayas ingresado el código correcto',
  ExpiredCodeException: 'El código ingresado ha expirado',
  UserNotFoundException: 'El correo ingresado no existe',
  LimitExceededException: 'Ha excedido el número de intentos permitidos',
};

export const RecoveryPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { push, query } = useRouter();
  const [emailPassword, setEmailPassword] = useEmailPasswordAtom();
  return (
    <div className="px-2 overflow-auto">
      <div className={
        'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[528px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12'
      }>
        <h2 className={'text-center font-semibold text-[34px] leading-[46px] text-[#556ee6]'}>Recuperar contraseña</h2>
        <p className={'not-italic font-normal text-lg leading-[30px] text-center text-[#4f4f4f] mt-[25px] mb-[33px]'}>
          Por favor ingresa el código de confirmación que te hemos enviado a tu correo electrónico
        </p>
        <Formik
          initialValues={{
            code: '',
            password: '',
            confirm_password: '',
            email: emailPassword.email,
          }}
          onSubmit={async (values, actions) => {

            const email = values.email.trim().toLowerCase();

            setIsLoading(true);
            localStorage.setItem('auth_email', email);

            try {
              await Auth.forgotPasswordSubmit(email, values.code, values.password)
                .then(() => {

                  toast.info('Tu contraseña ha sido reestablecida');
                  setEmailPassword({ email, password: values.password });

                  if (email && values.password) {
                    Auth.signIn(email, values.password).then(() => {
                      alert('Se ha iniciado sesión correctamente');
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
            } catch (error) {
              const errorMessage =
                CODE_ERRORS_TRANSLATIONS[(error as any).code as keyof typeof CODE_ERRORS_TRANSLATIONS] ||
                'Ha ocurrido un error, por favor intenta de nuevo';
              setError(errorMessage);
              setIsLoading(false);
            }
          }}
          validationSchema={Yup.object<FormValues>().shape({
            code: Yup.string().required('El código es requerido'),
            email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
            confirm_password: Yup.string().oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden'),
          })}
        >
          {(props: FormikProps<FormValues>) => (
            <Form>
              <div className="flex flex-col gap-4 px-4 md:px-12">
                <div>
                  <Field
                    name="code"
                    type="text"
                    placeholder="Código"
                    label="Código *"
                    component={CustomFormikInputGroupText}
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    type="text"
                    label="Correo electrónico *"
                    disabled={!!emailPassword.email}
                    placeholder="Correo electrónico"
                    component={CustomFormikInputGroupText}
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                  />
                </div>
                <div>
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
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            className="border border-[#e0e0e0]  text-sm rounded-2xl block w-full p-2.5  pr-10  h-16 mt-2"
                            placeholder="Contraseña"
                            required
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
                        <p className={'mt-1 text-sm text-gray-400'}>
                          La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una
                          letra minúscula, un número y un carácter especial
                        </p>
                        {meta.touched && meta.error && (
                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field
                    name="confirm_password"
                    type={showPassword ? 'text' : 'password'}
                    label="Confirmar contraseña *"
                    placeholder="Confirmar contraseña"
                    component={CustomFormikInputGroupText}
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                  />
                </div>
              </div>

              <div className="px-4 md:px-12 justify-content-center">
                {error && (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500" role="alert">
                    {error}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    color="primary"
                    disabled={!props.dirty || isLoading}
                    className={
                      'h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-4 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed px-12'
                    }
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}