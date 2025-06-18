# 🚪 AccessPro - Sistema de Control de Accesos con Códigos QR

AccessPro es una solución integral para gestionar el ingreso y salida del personal en oficinas mediante el uso de códigos QR enviados por correo electrónico. El sistema elimina la necesidad de tarjetas físicas, registros manuales o aplicaciones móviles, ofreciendo una experiencia segura, moderna y automatizada.

---

## 🚀 Funcionalidades Principales

- 📧 Envío de código QR único a través de correo electrónico.
- 📷 Escaneo del QR con cámara.
- 🧠 Registro automático de entradas y salidas.
- 📊 Panel de control con estadísticas de asistencia y aforo.
- 🔒 Mayor seguridad sin necesidad de tarjetas RFID ni apps móviles.

---

## 🎯 Usuarios Objetivo

- 👨‍💼 **Administradores de oficinas**: Gestión de accesos y control de asistencia.
- 👩‍💻 **Empleados**: Acceso ágil y sin dispositivos físicos.
- 🛡️ **Personal de seguridad**: Supervisión en tiempo real del estado de ingreso.

---

## 🛠️ Tecnologías Utilizadas

- 💻 **Frontend**: React, Tailwind, JavaScript
- 🧩 **Backend**: Node.js *(o tecnología equivalente)*
- 🔥 **Base de datos**: Firebase
- 📬 **Envío de correos**: Nodemailer / EmailJS *(dependiendo de la implementación)*
- 🔳 **Generación de QR**: Librerías como `qrcode`

---

## 📅 Planificación de Desarrollo

### 🗓️ Semana 1:
- 🎨 Diseñar la interfaz de la pantalla de inicio de sesión (Login). ✅
- 📝 Diseñar la interfaz de la pantalla de registro de usuario. ✅
- 🔍 Diseñar la interfaz de la pantalla de acceso mediante escaneo de QR. ✅
- 🧾 Diseñar pantalla de perfil de usuario✅

### 🗓️ Semana 2:
- 🔗 Conectar Firebase para autenticación y base de datos✅
- 📋 Diseñar la interfaz del panel del control general para Administradores.✅
- 📤 Implementar envío automático de QR vía email.

### 🗓️ Semana 3:
- 🔄 Implementar funcionalidad de la pantalla de acceso, incluyendo el escaneo.
- 📆 Diseñar pantalla de historial personal
- 👤 Diseñar pantalla de control individual de usuarios (Administrador)


---

## ❗ Problemáticas que Resuelve

- 🔐 **Seguridad**: Reemplaza tarjetas físicas fáciles de perder o clonar.
- 💰 **Costos**: Elimina soporte físico, reduciendo gastos operativos.
- 📝 **Registro manual**: Automatiza el control de entradas y salidas.
- 📱 **Sin apps**: No requiere instalación de software adicional.
- 📈 **Estadísticas**: Visualización de datos en tiempo real.

---

## ⚙️ Consideraciones Técnicas

- 📷 Implementación del escaneo de QR desde cámara web.
- 🔥 Integración completa con Firebase.
- 📱 Desafíos con compatibilidad en distintos dispositivos móviles.
- ❓ Decisiones aún pendientes sobre detección de QR duplicados y permisos de acceso por usuario.

---

## 🔗 Despliegue

🔍 Puedes ver el proyecto desplegado en línea en:  
👉 [https://desarrollo-aplicaciones-proyecto2.vercel.app/](https://desarrollo-aplicaciones-proyecto2.vercel.app/)

---

## 🧾 Licencia

Este proyecto es de código cerrado y fue desarrollado con fines académicos 🎓.

---

## 👩‍💻 Autor

Desarrollado por **Nataly Huaiquinao Sáez** 🧠💻
