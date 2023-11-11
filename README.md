

## Para empezar

Primero debemos instalar dependecias 

nmp i

Luego debemos abrir una cuenta en vercel para poder crear nuestra base de datos

una vez creada la cuenta debes crear un archivo .env en el cual deberias 
pegar tus credenciales, deberia quedar algo asi:

POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

entre las comillas deberian estar tus credenciales personales.

Ahora podemos cargar nuestra semilla

npm run seed

ahora para ver el proyecto debemos ejecutar el ultimo comando

npm run dev

puedes visitar el proyecto en http://localhost:3000
