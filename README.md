# Backend - Registro de Eventos (Finaktiva)

Este proyecto es una solución backend construida en **NestJS**, utilizando una arquitectura **Hexagonal (puertos y adaptadores)**, desplegada en **AWS Lambda** y persistida con **MongoDB**. Implementa buenas prácticas como los principios **SOLID**, y un flujo de despliegue automatizado mediante **GitHub Actions**.

---

## 🚀 Tecnologías usadas

- ⚙️ NestJS
- ☁️ AWS Lambda (API Gateway HTTP)
- 🗄️ MongoDB Atlas
- 🧱 Arquitectura Hexagonal (Ports & Adapters)
- 🔁 GitHub Actions (CI/CD)

---

## 📦 Estructura del proyecto

```bash
src/
├── domain/                  # Entidades de dominio y contratos (puertos)
│   ├── entities/
│   └── interfaces/
│
├── application/             # Casos de uso (reglas de negocio)
│   └── use-cases/
│
├── infrastructure/          # Adaptadores concretos (repositorio Mongo, esquemas)
│   └── database/              # Controladores, DTOs (adaptadores de entrada)
│   ├── controllers/
│   └── dtos/
│
├── common/                  # Filtros globales, middlewares, utilidades
│
├── app.module.ts
├── main.ts                  # Local runner
└── lambda.ts                # Adaptado para AWS Lambda

```

## Como Ejecutar localmente

1.  Clona el respositorio
    ```bash
    git clone https://github.com/juanregino/pruebaFinaktiva.git
    cd pruebaFinaktiva
    ```
2.  Instala las dependencias
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
    ```bash
    URI_MONGO=mongodb+srv://<usuario>:<contraseña>@<cluster-url>/<db-name>?retryWrites=true&w=majority
    ```
4.  Ejecuta el proyecto
    ```bash
    npm run start:dev
    ```

### La api estara disponible en `http://localhost:3000/event-log`

## Pruebas con Postman

---

### 🔹 `POST /event-log`

```json
{
  "description": "Descripción del evento",
  "type": "API",
  "date": "2025-04-11"
}
```

---

### 🔹 `GET /event-log`

Consulta eventos filtrando por tipo y rango de fechas.

**Ejemplo de solicitud:**

```bash
 GET "http://localhost:3000/event-log?type=API&since=2025-04-11&until=2025-04-12"
```

**Ejemplo de respuesta:**

```json
[
  {
    "id": "5f8c9c4c-c5b7-4e0a-a6d8-f4f6f3a4b5d2",
    "description": "Descripción del evento",
    "type": "API",
    "date": "2025-04-11"
  }
]
```
**Tambien puedes visitar la app desplegada en:**
https://prueba-finaktiva-front.vercel.app
- Usuario: admin@admin.com
- Contraseña: 123456
---

## 👤 Autor

- **Nombre:** Juan Pablo Regino Penagos 
- **Email:** juanreginopenagos@gmail.com  
