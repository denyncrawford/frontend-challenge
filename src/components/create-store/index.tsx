
import { IStore } from '@/stores';
import { Field, getIn, FieldArray, Form, Formik, FormikProps, FieldProps } from 'formik';
import { CustomFormikInputGroupText } from '../forms/custom-formik-input-group-text';
import { useCreateStore } from '@/hooks/useStores';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const ErrorMessage: React.FC<{ name: string }> = ({ name }) => (
  <Field
    name={name}
    component={CustomFormikInputGroupText}
    render={({ form }: FieldProps) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (<p className='mt-2 text-sm text-red-600 dark:text-red-500'>{error}</p>) : null;
    }}
  />
);


const CODE_ERRORS_TRANSLATIONS = {
  'String must contain at most 50 character(s)': 'El texto es demasiado largo',
  'Invalid email': 'El correo no es valido',
  'Expected number, received string': 'El valor esperado es un número',
}


export const CreateStoreForm = () => {
  const { isLoading, isError, error, mutate } = useCreateStore();


  const formData = {
    name: '',
    description: '',
    email: '',
    items: [],
  }
  const defaultItem = {
    name: '',
    price: '',
    quantity: '',
    description: '',
  }

  return (
    <div className="px-2 my-20">
      <div
        className={
          'border overflow-hidden relative shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[1000px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12'
        }
      >
        {isLoading && <div className={'text-center bg-white/50 top-0 left-0 absolute h-full w-full flex items-center justify-center text-[#333333]'}>
          <svg
            aria-hidden="true"
            className="w-10 h-10 mr-2 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>}
        <h2 className={'font-semibold text-[34px] leading-[46px] text-[#556ee6]'}>Nueva tienda</h2>
        <Formik
          initialValues={formData}
          onSubmit={async (values, actions) => {
            toast.loading(true)
            mutate({
              ...values,
            }, {
              onSuccess: () => {
                toast.loading(false)
                toast.success('Tienda creada con exito')
                actions.resetForm()
              }
            })
          }}
          validationSchema={Yup.object<IStore>().shape({
            name: Yup.string().required('El nombre es requerido'),
            description: Yup.string().required('La descripción es requerida'),
            email: Yup.string().required('El correo es requerido'),
            items: Yup.array().of(Yup.object<IStore>().shape({
              name: Yup.string().max(50, 'El nombre es demasiado largo').required('El nombre es requerido'),
              price: Yup.number().required('El precio es requerido'),
              quantity: Yup.number().required('La cantidad es requerida'),
              description: Yup.string().max(50, 'El nombre es demasiado largo').required('La descripción es requerida'),
            }))
          })}
        >
          {(props: FormikProps<Partial<IStore>>) => (
            <Form>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                <div>
                  <Field
                    type="text"
                    disabled={isLoading}
                    name="name"
                    id="name"
                    required
                    label="Nombre *"
                    component={CustomFormikInputGroupText}
                    placeholder="Nombre de la tienda"
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    disabled={isLoading}
                    name="email"
                    id="email"
                    required
                    label="Email *"
                    component={CustomFormikInputGroupText}
                    placeholder="Correo electrónico"
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    disabled={isLoading}
                    name="description"
                    id="description"
                    required
                    label="Descripción *"
                    component={CustomFormikInputGroupText}
                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                    placeholder="Descripción de la tienda"
                  />
                </div>
              </div>
              <div>
                <FieldArray
                  name="items"
                  validateOnChange
                >
                  {(helpers) =>
                  (
                    <>
                      <div className='mt-5 flex gap-5'>
                        <h2 className={'font-semibold text-[24px] leading-[46px] text-[#556ee6]'}>Items</h2>
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() => helpers.push({ ...defaultItem })} className="justify-center my-auto p-2 items-center rounded-xl break-keep text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="white" fill-rule="evenodd"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" /></svg>
                        </button>
                      </div>
                      <div className='mt-2 border border-gray-300 rounded-2xl p-4'>
                        {!props.values.items?.length ?
                          (
                            <h2 className='font-normal text-[15px] leading-6 text-[#333333]'>Aun no hay items en esta tienda</h2>
                          ) : (

                            props.values.items?.map((item, index) => (
                              <div className='mt-2 grid grid-cols-4 gap-5' key={index}>
                                <div>
                                  <Field
                                    disabled={isLoading}
                                    type="text"
                                    name={`items.${index}.name`}
                                    id={`items.${index}.name`}
                                    required
                                    label={index === 0 ? 'Nombre *' : ''}
                                    placeholder="Nombre"
                                    component={CustomFormikInputGroupText}
                                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                                  />
                                  <ErrorMessage name={`items.${index}.name`} />
                                </div>
                                <div>
                                  <Field
                                    disabled={isLoading}
                                    type="text"
                                    name={`items.${index}.description`}
                                    id={`items.${index}.description`}
                                    required
                                    label={index === 0 ? 'Descripción *' : ''}
                                    placeholder="Descripción"
                                    component={CustomFormikInputGroupText}
                                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                                  />
                                  <ErrorMessage name={`items.${index}.description`} />
                                </div>
                                <div>
                                  <Field
                                    disabled={isLoading}
                                    type="number"
                                    name={`items.${index}.price`}
                                    id={`items.${index}.price`}
                                    required
                                    label={index === 0 ? 'Precio *' : ''}
                                    placeholder="Precio"
                                    component={CustomFormikInputGroupText}
                                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                                  />
                                  <ErrorMessage name={`items.${index}.price`} />
                                </div>
                                <div>
                                  <Field
                                    disabled={isLoading}
                                    type="number"
                                    name={`items.${index}.quantity`}
                                    id={`items.${index}.quantity`}
                                    required
                                    label={index === 0 ? 'Cantidad *' : ''}
                                    placeholder="Cantidad"
                                    component={CustomFormikInputGroupText}
                                    className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                                    labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                                  />
                                  <ErrorMessage name={`items.${index}.quantity`} />
                                </div>
                              </div>
                            ))
                          )
                        }
                      </div>
                    </>
                  )
                  }
                </FieldArray>
                {isError && (
                  <div className='mt-10 flex-col items-center justify-center'>
                    <h2 className='text-gray-600'>Parece que algunos campos son incorrectos</h2>
                    {error.response?.data?.error
                      .filter((err, index) => error.response?.data?.error.findIndex((j) => j.message === err.message) === index)
                      .map((error, index) => (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}>
                          {
                            CODE_ERRORS_TRANSLATIONS[error.message as keyof typeof CODE_ERRORS_TRANSLATIONS] || error.message
                          }
                        </p>
                      ))}
                  </div>
                )
                }
                <div className='mt-10 flex items-center justify-center'>
                  <button
                    type="submit"
                    className="px-20 h-16 rounded-2xl bg-[#556ee6] text-white font-semibold text-lg leading-[30px] text-center  hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}