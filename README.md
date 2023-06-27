## Getting Started

### 1. Requisitos

- Node.js >= 18.3.0

### 2. Instalar dependencias

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Consideraciones

- Utilizar Formik para los formularios.
- Utilizar Yup para las validaciones.
- Utilizar react-query para consumos de API.
- Utilizar tailwindcss, css modules para los estilos.
- Utilizar typescript.

## Se valorará

- Uso de custom hooks.
- Types de datos en los hooks.
- Nombramiento de variables, funciones, componentes, etc.
- Uso de componentes funcionales.
- Validaciones de formularios, feedback de errores.
- Usar las validaciones de html5.
- Proceso de investigación y resolución de problemas.

## Implementar Auth con AWS Cognito

### 1. Crear archivo .env.local con las siguientes variables de entorno:

```bash
NEXT_PUBLIC_COGNITO_REGION=...
NEXT_PUBLIC_COGNITO_USER_POOL_ID=...
NEXT_PUBLIC_WEB_APP_COGNITO_CLIENT_ID=...
```

### 2. Completar flujo de recuperación de contraseña.

- En el page forgot-password.tsx, se hace un llamado al método forgotPassword del SDK de Cognito. Este método envía un código de verificación al email del usuario. Completa el flujo de recuperación de contraseña con el método forgotPasswordSubmit del SDK de Cognito. En este page, se debe de mostrar un formulario con 4 campos: email, código de verificación, nueva contraseña y confirmación de contraseña (todos estos campos deben de tener las validaciones que sean necesarias). Al completar el flujo, se debe de iniciar sesión automáticamente.

### 3. Implementar lógica para crear paginas publicas y privadas.

- Crear un HOC (Higher Order Component) que reciba como parámetro un page componente y haga un redirect a la pagina de login si el usuario no esta autenticado. Este HOC se debe de usar en las paginas privadas.

## Consumo de API

### 1. Configurar react-query para consumos de API.

### 2. Query paginada para obtener datos de la API.

- Crear un page component que consuma el Api Route `/api/stores` (GET). Este page debe de mostrar una lista de tiendas. La lista debe de ser paginada. Se debe de incluir los siguientes filtros: search, page y limit. Para hacer la consulta del api, se debe de usar el hook useQuery de react-query. Idealmente debe de ser un custom hook que reciba como parámetro los filtros de búsqueda. El hook debe de retornar los datos de la consulta y los métodos para actualizar los filtros de búsqueda. Implementar loading y error state. Añadir types a los datos de la consulta. En el api route se encuentra los types de la respuesta del api.

### 3. Mutation para crear una tienda.

- Crear un page component que consuma el Api Route `/api/stores` (POST). Este page debe de mostrar un formulario para crear una tienda. Para hacer la consulta del api, se debe de usar el hook useMutation de react-query. Idealmente debe de ser un custom hook que reciba como payload los datos de la tienda. Este formulario debe de contener los siguientes campos: name, description, email (todos los campos son required), y una sección para cargar items. Cada item debe de tener los siguientes campos: name, description, price, quantity ( todos los campos son required ) . Si la petición da success, mostrar un mensaje de éxito y limpiar el formulario. Implementar loading y error state. En el api route se encuentra los types de la respuesta del api.

![Referencia del formulario](/form_reference.png)

## Bonus challenge (opcional)

### Mejorar tipado de useGetCreatorSocialNetworkProfile.

- En el file src/components/insights, el hook useGetCreatorSocialNetworkProfile, se conecta con una ruta backend, este backend retorna un objeto con una estructura distinta dependiendo del tipo de red social. Mejorar el type de este hook para que el objeto de retorno tenga la estructura correcta dependiendo del tipo de red social.

  Ej: Si el tipo de red social es facebook, el objeto de retorno debe de tener la siguiente estructura: FacebookResponseData
  Ej: Si el tipo de red social es instagram, el objeto de retorno debe de tener la siguiente estructura: InstagramResponseData
  <!-- Show https://i.imgur.com/Afv30pK.png -->

  ![Referencia del return type correcto](https://i.imgur.com/Afv30pK.png)
