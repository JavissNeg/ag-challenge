# Data Analysis

Este módulo contiene notebooks y scripts desarrollados con **Python** y **Pandas** para realizar consultas y análisis sobre la información almacenada en la base de datos del proyecto.

## Requisitos

* Python 3.11 o superior
* pip

---

# Crear entorno virtual

## Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
```

## Windows (PowerShell)

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

---

# Instalar dependencias

Con el entorno virtual activado:

```bash
pip install -r requirements.txt
```

---

# Configuración

Antes de ejecutar los notebooks es necesario crear un archivo `.env` dentro de esta carpeta.

Utiliza el archivo de ejemplo o agrega las variables indicadas en el proyecto, por ejemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ag_db
DB_USER=ag_user
DB_PASSWORD=ag_password
```

Estas variables son utilizadas para establecer la conexión con la base de datos.

---

# Ejecutar Jupyter

Con el entorno virtual activado:

```bash
jupyter notebook
```

o

```bash
jupyter lab
```

Después abre el notebook correspondiente.

---

# Estructura

```text
data-analysis/
├── .venv/
├── analysis.ipynb
├── requirements.txt
├── .env
└── README.md
```

---

# Dependencias

Todas las dependencias del proyecto se encuentran definidas en:

```text
requirements.txt
```

Para instalar o actualizar las librerías:

```bash
pip install -r requirements.txt
```

---

# Desactivar el entorno virtual

Cuando finalices:

```bash
deactivate
```
