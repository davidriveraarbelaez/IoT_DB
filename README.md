# Descripción General
Este proyecto implementa un sistema completo para la recepción, almacenamiento y visualización de datos simulados desde dispositivos IoT. La arquitectura se basa en contenedores Docker para asegurar portabilidad, escalabilidad y facilidad de despliegue.

## Componentes principales:

- API REST (Node.js + Express): Recibe lecturas de sensores simuladas y las almacena en MySQL.
- Base de Datos (MySQL): Almacena las lecturas provenientes de los dispositivos.
- Simulador de Dispositivos (Python): Simula múltiples dispositivos ESP32 enviando lecturas periódicas.
- Adminer: Herramienta visual para la gestión y consulta de la base de datos.

# Estructura del Proyecto
IoT_DB/
├── docker-compose.yml        # Orquestación de servicios
├── api/                      # API REST Node.js
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── simulator/                # Simulador de dispositivos IoT en Python
│   ├── Dockerfile
│   └── simulator.py
├── init/                     # Script SQL de inicialización
│   └── init.sql
└── README.md                 # Documentación del proyecto (este archivo)

# Tecnologías utilizadas

| Componente | Tecnología / Lenguaje |
|------------|----------------------------------|
| API REST   | Node.js + Express + MySQL2 |
| Base de Datos | MySQL 8.0 (contenedor Docker) |
| Simulador de Dispositivos | Python 3.11 + Requests(contenedor Docker) |
| Gestión visual DB | Adminer (contenedor Docker) |
| Orquestación de servicios | Docker Compose |
| Sistema de control de versiones | Git |


# Instalación y Despliegue

## Requisitos Previos:
Docker y Docker Compose instalados.

## Pasos para ejecutar el proyecto:

1. Clonar el repositorio:

```bash
git clone
cd IoT_DB
```

2. Levantar todos los servicios:

```bash 
docker-compose up --build -d
```

Esto levantará los siguientes servicios:
- Contenedor MySQL (base de datos iot-mysql).
- Contenedor API REST (servidor iot-api).
- Contenedor Adminer (herramienta de gestión de base de datos).

# Acceso a los servicios

|Servicio|URL|Credenciales por defecto|
|--------|---|-------------------------|
|API REST|http://localhost:3000|No requiere|
|Adminer|http://localhost:8080|Motor: MySQL, servidor: mysql, usuario: iot_user, Contraseña: iot_password, Base de datos: iot_data|

# Base de datos

La base de datos se inicializa automáticamente al levantar los contenedores.

Estructura de la tabla:
```sql
CREATE TABLE IF NOT EXISTS lecturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dispositivo INT NOT NULL,
    temperatura FLOAT NOT NULL,
    humedad FLOAT NOT NULL,
    voltaje FLOAT NOT NULL,
    corriente FLOAT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

# Simulador de Dispositivos
El simulador Python envía periódicamente lecturas aleatorias de:
- Temperatura
- Humedad
- Voltaje
- Corriente

**Configuración por defecto:**

- 3 dispositivos simulados.
- Intervalo de 5 segundos entre lecturas.

El simulador se comunica directamente con la API REST utilizando el nombre del servicio (api) gracias a Docker networking.

# Comandos útiles

| Acción	| Comando |
|-----------|---------|
| Detener todos los contenedores |	docker-compose down |
| Detener y eliminar volúmenes persistentes	| docker-compose down -v |
| Reconstruir todo después de cambios	| docker-compose up --build -d |
| Ver logs del API	| docker-compose logs -f api |
| Ver logs del simulador	| docker-compose logs -f simulator |
| Ver estado de los contenedores	| docker ps |

# Trabajo futuro
- Integración de un dashboard web (Next.js o React) para visualizar los datos en tiempo real.
- Seguridad (Autenticación JWT en la API).
- Configuración de Prometheus + Grafana para monitoreo.
- Despliegue en cloud (AWS, Azure, etc.).
- Test unitarios para API.

#Referencias
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Python](https://www.python.org/)
- [Adminer](https://www.adminer.org/)
- [Requests](https://docs.python-requests.org/en/master/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)