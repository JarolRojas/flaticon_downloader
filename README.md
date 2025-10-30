# 📥 Flaticon Pack Downloader

Una extensión de Chrome moderna para descargar paquetes de iconos de Flaticon de forma rápida y sencilla.

## 🌟 Características

- ✨ **Descarga por formato**: Descarga iconos en PNG o SVG según tu necesidad
- 🎯 **Interfaz intuitiva**: Interfaz limpia y fácil de usar construida con Angular
- 📦 **Compresión automática**: Los archivos se comprimen automáticamente en ZIP
- 🔄 **Soporte múltiple**: Compatible con flaticon.es y flaticon.com
- ⚡ **Rápido y eficiente**: Procesamiento optimizado de descargas
- 🎨 **Diseño moderno**: Interfaz responsiva con Tailwind CSS

## 🛠️ Tecnologías

- **Frontend**: Angular 20+
- **Estilos**: Tailwind CSS
- **Bundling**: JSZip para compresión
- **Comunicación**: Chrome Messaging API
- **Tipado**: TypeScript

## 📋 Requisitos Previos

- Node.js 20+ y npm
- Google Chrome o navegador basado en Chromium
- Git (opcional)

## 🚀 Instalación y Configuración

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/tuusuario/flaticon-downloader.git
cd flaticon-downloader
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Compilar la extensión

```bash
npm run build
```

Los archivos compilados se guardarán en el directorio `dist/`.

## 💻 Desarrollo

### Iniciar servidor de desarrollo

```bash
npm start
```

El servidor se ejecutará en `http://localhost:4200/` y se recargará automáticamente al hacer cambios.

### Compilación en modo watch

Para desarrollo continuo con recompilación automática:

```bash
npm run watch
```

### Ejecutar tests

```bash
npm test
```

## 📦 Compilar para Producción

```bash
npm run build
```

Esto genera una versión optimizada en el directorio `dist/`.

## 🔧 Instalar la Extensión en Chrome

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa el **Modo de desarrollador** (esquina superior derecha)
3. Haz clic en **Cargar extensión sin empaquetar**
4. Selecciona la carpeta `dist/flaticon-downloader`
5. ¡La extensión aparecerá en tu barra de herramientas!

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── interfaces/          # Interfaces TypeScript (PNG, SVG)
│   ├── libs/                # Librerías externas (JSZip)
│   ├── services/            # Servicios
│   │   ├── chrome-messaging.service.ts
│   │   ├── downloaderPNG.service.ts
│   │   └── downloaderSVG.service.ts
│   └── popup/               # Interfaz del popup
│       ├── pages/           # Páginas (inicio, png, svg)
│       ├── popup.html
│       ├── popup.ts
│       └── popup.routes.ts
├── extension/
│   ├── background.js        # Service Worker
│   ├── content-script.js    # Script de contenido
│   └── manifest.json        # Configuración de la extensión
├── main.ts                  # Punto de entrada
└── styles.css               # Estilos globales
```

## 🎯 Cómo Usar

1. **Navega a un paquete en Flaticon**
   - Ve a flaticon.com o flaticon.es
   - Abre cualquier página de paquete de iconos

2. **Abre la extensión**
   - Haz clic en el icono de Flaticon Downloader en la barra de herramientas

3. **Elige tu formato**
   - Selecciona si quieres descargar en **PNG** o **SVG**

4. **Descarga**
   - Los iconos se descargarán automáticamente en un archivo ZIP

## 🔐 Permisos

La extensión solicita los siguientes permisos:

- **tabs**: Para detectar en qué pestaña estás
- **downloads**: Para descargar archivos
- **activeTab**: Para acceder a la pestaña activa
- **scripting**: Para ejecutar scripts en el contenido
- **Host permissions**: Acceso a flaticon.com y flaticon.es

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mi-feature`)
3. Commit tus cambios (`git commit -am 'Agrego nueva feature'`)
4. Push a la rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

- Abre un issue en el repositorio
- Revisa la documentación de Chrome Extensions: [developer.chrome.com](https://developer.chrome.com)
- Consulta la documentación de Angular: [angular.dev](https://angular.dev)

## 🔄 Cambios Recientes

- v1.0.0 - Lanzamiento inicial
  - Soporte para descargar iconos PNG y SVG
  - Interfaz basada en Angular
  - Compresión automática en ZIP
  - Soporte para flaticon.es y flaticon.com

## ⚙️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run watch` | Compilación en modo watch |
| `npm test` | Ejecuta los tests |

---

**Desarrollado con ❤️ usando Angular y Chrome Extensions API**
