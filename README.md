# Frontend de UTNianos

## Correr el proyecto

Primero instalar paquetes con yarn:

### `yarn`

El proyecto usa react-app-rewired para habilitar export-on-demand y así ahorrar espacio en las librerías importadas.

### `yarn start-rewired`

En caso de problemas, se puede arrancar normalmente utilizando el siguiente comando:

### `yarn start`

Ambos corren la aplicación de modo de desarrollo en la URL [http://localhost:3000](http://localhost:3000).

## Testing

### `yarn test`

Corre los tests en modo interactivo.

### `yarn test:coverage`

Corre los tests en modo no-interactivo y genera el coverage.

## Generar un build de producción.

### `yarn build`

y

### `yarn build-rewired`

Generan un build de producción de la aplicación en la carpeta `build`.
