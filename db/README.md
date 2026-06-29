# MariaDB - Ambiente de Desarrollo

Este proyecto utiliza un contenedor de **MariaDB 11.8** para el almacenamiento de datos. A continuación se describen los requisitos y los pasos necesarios para levantar el entorno utilizando **Docker** o **Podman**.

---

# Requisitos

Instalar alguno de los siguientes motores de contenedores:

* Docker Desktop o Docker Engine
* Podman

También es necesario contar con **Docker Compose** o **Podman Compose**.

---

# Estructura esperada

```text
.
├── compose.yml
├── data/
└── init/
```

* **data/**: almacena los datos persistentes de MariaDB.
* **init/**: contiene los scripts `.sql` que se ejecutan automáticamente la primera vez que se crea la base de datos.

---

# Configuración del contenedor

| Parámetro     | Valor        |
| ------------- | ------------ |
| Imagen        | mariadb:11.8 |
| Contenedor    | ag-mariadb   |
| Base de datos | ag_db        |
| Usuario       | ag_user      |
| Contraseña    | ag_password  |
| Root          | root         |
| Puerto        | 3306         |

---

# Levantar el contenedor

## Docker

```bash
docker compose up -d
```

o

```bash
docker-compose up -d
```

## Podman

```bash
podman-compose up -d
```

---

# Verificar que el contenedor esté ejecutándose

## Docker

```bash
docker ps
```

## Podman

```bash
podman ps
```

Debe aparecer un contenedor llamado:

```
ag-mariadb
```

---

# Ver los logs

## Docker

```bash
docker logs -f ag-mariadb
```

## Podman

```bash
podman logs -f ag-mariadb
```

---

# Detener el contenedor

## Docker

```bash
docker compose stop
```

## Podman

```bash
podman-compose stop
```

---

# Reiniciar el contenedor

## Docker

```bash
docker compose restart
```

## Podman

```bash
podman-compose restart
```

---

# Eliminar el contenedor

Si únicamente se desea eliminar el contenedor sin borrar la información almacenada:

## Docker

```bash
docker compose down
```

## Podman

```bash
podman-compose down
```

La información permanecerá en la carpeta `data`.

---

# Eliminar completamente la base de datos

Si se desea comenzar desde cero:

1. Eliminar el contenedor.

```bash
docker compose down
```

o

```bash
podman-compose down
```

2. Eliminar la carpeta donde se almacenan los datos.

Linux/macOS

```bash
rm -rf data
```

Windows (PowerShell)

```powershell
Remove-Item -Recurse -Force data
```

3. Levantar nuevamente el contenedor.

```bash
docker compose up -d
```

o

```bash
podman-compose up -d
```

Los scripts ubicados en `init/` volverán a ejecutarse automáticamente.

---

# Conectarse a la base de datos

Desde cualquier cliente MySQL o MariaDB utilizar:

| Parámetro     | Valor       |
| ------------- | ----------- |
| Host          | localhost   |
| Puerto        | 3306        |
| Base de datos | ag_db       |
| Usuario       | ag_user     |
| Contraseña    | ag_password |

Usuario administrador:

| Parámetro  | Valor |
| ---------- | ----- |
| Usuario    | root  |
| Contraseña | root  |

---

# Acceder a la consola de MariaDB

## Docker

```bash
docker exec -it ag-mariadb mariadb -u root -p
```

## Podman

```bash
podman exec -it ag-mariadb mariadb -u root -p
```

Contraseña:

```
root
```

---

# Estado del servicio

El contenedor incluye un **Healthcheck** que verifica periódicamente que MariaDB esté disponible antes de que otros servicios dependan de él.

---

# Notas

* La información de la base de datos es persistente gracias al volumen `./data`.
* Los scripts dentro de `./init` solo se ejecutan durante la creación inicial de la base de datos.
* Si se modifican los scripts SQL y se desea que vuelvan a ejecutarse, es necesario eliminar la carpeta `data` y crear nuevamente el contenedor.
* El puerto **3306** debe estar disponible en el equipo anfitrión antes de iniciar el contenedor.
