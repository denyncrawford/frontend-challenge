This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Implementar Auth con AWS Cognito

### 1. Crear proyecto en AWS Cognito. Asegurarse de seleccionar la opción "Don't generate a client secret", ya que esta opción no permite usar un flujo de autenticación personalizado. En sign-in options seleccionar email. Al agregar el app client app client settings, seleccionar la opción "Enable username password based authentication (ALLOW_USER_PASSWORD_AUTH)".

### 2. Crear archivo .env.local con las siguientes variables de entorno:

```bash
NEXT_PUBLIC_COGNITO_REGION=...
NEXT_PUBLIC_COGNITO_USER_POOL_ID=...
NEXT_PUBLIC_WEB_APP_COGNITO_CLIENT_ID=...
```

### 3. Completar flujo de recuperación de contraseña.

- En el page forgot-password.tsx, se hace un llamado al método forgotPassword del SDK de Cognito. Este método envía un código de verificación al email del usuario. Completa el flujo de recuperación de contraseña con el método forgotPasswordSubmit del SDK de Cognito. En este page, se debe de mostrar un formulario con 4 campos: email, código de verificación, nueva contraseña y confirmación de contraseña. Al completar el flujo, se debe de iniciar sesión automáticamente.

### 4. Implementar lógica para crear paginas publicas y privadas.

- Crear un HOC (Higher Order Component) que reciba como parámetro un page componente y haga un redirect a la pagina de login si el usuario no esta autenticado. Este HOC se debe de usar en las paginas privadas.

## Consumo de API

### 1. Configurar react-query para consumos de API.

### 2. Query paginada para obtener datos de la API.

- Crear un page component que consuma el Api Route `/api/stores`. Este page debe de mostrar una lista de tiendas. La lista debe de ser paginada. Se debe de incluir los siguientes filtros: search, page y limit. Para hacer la consulta del api, se debe de usar el hook useQuery de react-query. Idealmente debe de ser un custom hook que reciba como parámetro los filtros de búsqueda. El hook debe de retornar los datos de la consulta y los métodos para actualizar los filtros de búsqueda. Implementar loading y error state.

### 3. Mutation para crear una tienda.

- Crear un page component que consuma el Api Route `/api/stores`. Este page debe de mostrar un formulario para crear una tienda. Para hacer la consulta del api, se debe de usar el hook useMutation de react-query. Idealmente debe de ser un custom hook que reciba como payload los datos de la tienda. Este formulario debe de contener los siguientes campos: name, description, email, y una sección para cargar items. Cada item debe de tener los siguientes campos: name, description, price, quantity.Todos los campos son required . Si la petición da success, mostrar un mensaje de éxito y limpiar el formulario. Implementar loading y error state.
