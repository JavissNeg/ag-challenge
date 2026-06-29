# AG Challenge

Challenge web para la gestión del ciclo de vida académico de estudiantes dentro de programas de formación empresarial. Permite registrar alumnos, inscribirlos a programas, administrar cambios de estatus y consultar información de manera centralizada mediante una arquitectura dividida por responsabilidades.

## Tecnologías utilizadas

### Frontend

* Angular 22
* Angular Material
* SCSS
* RxJS
* Reactive Forms

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Base de datos

* MariaDB 11.8
* Docker / Podman

### Análisis de datos

* Python
* Pandas
* Jupyter Notebook

---

# Estructura del proyecto

```text
.
├── api/
├── db/
├── frontend/
├── data-analysis/
├── compose.yml
└── README.md
```

Cada carpeta contiene su propia documentación con instrucciones específicas.

| Carpeta          | Descripción                                                         |
| ---------------- | ------------------------------------------------------------------- |
| `db/`            | Scripts SQL, configuración y documentación de la base de datos.     |
| `api/`           | Backend desarrollado con FastAPI y documentación para su ejecución. |
| `frontend/`      | Aplicación Angular y guía de instalación.                           |
| `data-analysis/` | Scripts y notebooks para análisis de información utilizando Pandas. |

---

# Documentación

Consulta la documentación específica de cada módulo:

* 📁 **Base de datos:** `db/README.md`
* 📁 **Backend (FastAPI):** `api/README.md`
* 📁 **Frontend (Angular):** `frontend/README.md`
* 📁 **Análisis de datos:** `data-analysis/README.md`

---

# Arquitectura

```text
Angular
    │
    ▼
FastAPI
    │
    ▼
MariaDB
    │
    ▼
Pandas / Data Analysis
```

* **Angular** consume los servicios REST del backend.
* **FastAPI** implementa la lógica de negocio y el acceso a datos.
* **MariaDB** almacena la información de alumnos, empresas, programas e historial de estatus.
* **Pandas** procesa la información almacenada para generar análisis y reportes.

---

# Funcionalidades principales

* Registro de estudiantes.
* Inscripción a programas.
* Consulta de alumnos.
* Cambio de estatus con historial.
* Resumen de alumnos por estatus.
* Filtros por programa y estatus.
* Análisis de datos mediante Pandas.

---

# Requisitos

* Git
* Docker o Podman
* Node.js
* Python 3.11+
* npm

---

# Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd ag-challenge
```

---

# Configuración adicional

Antes de ejecutar algunos módulos es necesario crear los archivos de configuración correspondientes.

## Backend (`api/`)

Dentro de la carpeta `api/` debe crearse un archivo `.env` con la configuración indicada en `api/README.md`.

Este archivo contiene la configuración de conexión a la base de datos y demás variables necesarias para ejecutar el servidor.

## Análisis de datos (`data-analysis/`)

Dentro de la carpeta `data-analysis/` también debe crearse un archivo `.env` siguiendo el ejemplo indicado en `data-analysis/README.md`.

Este archivo permite configurar la conexión hacia la base de datos para realizar los análisis mediante Pandas.

---

# Orden recomendado para ejecutar el proyecto

1. Configurar la base de datos siguiendo `db/README.md`.
2. Crear el archivo `.env` del backend siguiendo `api/README.md`.
3. Iniciar el backend.
4. Ejecutar el frontend siguiendo `frontend/README.md`.
5. (Opcional) Crear el archivo `.env` de `data-analysis/` y ejecutar los notebooks descritos en `data-analysis/README.md`.

