# Política de Privacidad

## Descargador de Iconos Flaticon — Política de Privacidad

Última actualización: 30 de octubre de 2025

Esta política explica qué datos accede y procesa la extensión "Flaticon Downloader" (en adelante, "la extensión"), por qué lo hace, cómo se gestionan esos datos y qué derechos tienes.

## Resumen breve
- La extensión procesa TODO localmente en tu navegador. No recopilamos ni enviamos datos personales a nuestros servidores.
- Las únicas conexiones externas son las necesarias para descargar iconos desde Flaticon o para abrir enlaces públicos (por ejemplo, GitHub) cuando tú lo solicitas.

## Ámbito
Esta política aplica únicamente a la extensión incluida en este repositorio. El código fuente está disponible en GitHub: https://github.com/JarolRojas/flaticon-downloader

## Qué datos se acceden y por qué
La extensión puede acceder a los siguientes tipos de datos, únicamente para ofrecer su funcionalidad principal (descargar iconos):

- URLs de recursos (imágenes) en la página de Flaticon: para localizar y descargar los iconos seleccionados.
- Contenido de la página (DOM) cuando se inyecta el script: para identificar los iconos disponibles y sus metadatos visibles.
- Preferencias opcionales guardadas localmente (por ejemplo, plantilla de nombre de archivo): para mejorar la experiencia del usuario.

Importante: No recopilamos, vimos ni almacenamos datos personales identificables (como nombres de usuario, contraseñas, correos electrónicos) ni registros de navegación fuera de lo estrictamente necesario para localizar las imágenes en la página actual.

## Base legal / Consentimiento
El procesamiento se basa en tu acción y consentimiento implícito: al usar la extensión y pulsar los botones de descarga, autorizas la operación de acceso a la pestaña activa y la descarga de los recursos indicados.

## Dónde y cómo se procesan los datos
- Todo el procesamiento (descarga, compresión, empaquetado en ZIP) ocurre en memoria dentro de tu navegador.
- No enviamos, subimos ni sincronizamos esos datos a servidores externos.
- Cualquier dato temporal creado durante la sesión se elimina cuando cierras la pestaña o terminas la operación.

## Permisos solicitados y uso concreto
La extensión solicita (y utiliza únicamente) los siguientes permisos descritos en `extension/manifest.json`:

- activeTab: Permite acceder a la pestaña activa para detectar si estás en Flaticon y habilitar la extracción de iconos en esa página.
- scripting: Permite inyectar y ejecutar scripts en la página para leer el DOM y localizar las URLs de los iconos.
- Host permissions: `*://*.flaticon.com/*`, `*://cdn-icons-png.flaticon.com/*` — Necesarias para descargar las imágenes desde los servidores de Flaticon.
- Host permission: `https://github.com/*` — Usada solo para abrir el enlace al repositorio desde la interfaz (no se envía ningún dato automatizado).
- downloads (implícito en la API de extensión): Para iniciar la descarga de los archivos generados hacia tu ordenador.

Para cada permiso, la justificación es funcional: sin ellos la extensión no podría localizar ni descargar los iconos que seleccionas.

## Conexiones externas y cuándo ocurren
- cdn-icons-png.flaticon.com y *.flaticon.com — Solo cuando tú inicias una descarga o cuando la página de Flaticon carga sus recursos. Estas son solicitudes normales del navegador para obtener imágenes; la extensión no añade parámetros adicionales a esas solicitudes.
- github.com — Solo cuando haces clic explícitamente en el enlace "Ver en GitHub".

## Datos almacenados y retención
- Preferencias opcionales: si la extensión guarda ajustes (por ejemplo, plantilla de nombre), se almacenan localmente en el almacenamiento de la extensión del navegador (ej. chrome.storage.local). Puedes borrar estos datos desde la configuración de la extensión o desinstalando la extensión.
- Archivos temporales en memoria: se eliminan al completar la descarga o cerrar la pestaña.

## Seguridad
- Código abierto: el repositorio público permite auditoría independiente (https://github.com/JarolRojas/flaticon-downloader).
- Buenas prácticas: todo el manejo de datos sensibles se limita a memoria y APIs del navegador. No incluimos librerías de telemetría ni analytics.

## Derechos del usuario y cómo ejercerlos
- Revisar el código: Puedes inspeccionar todo el código en el repositorio (en la carpeta `src` y `extension`).
- Revocar permisos / Desinstalar: Desde la página de extensiones de Chrome puedes revocar permisos o desinstalar la extensión en cualquier momento.
- Borrar preferencias: Elimina los datos de la extensión desde la configuración de Chrome (chrome://extensions → Detalles → Borrar datos) o desinstala la extensión.

## Niños
La extensión no está dirigida a menores y no solicita ni procesa conscientemente datos personales de menores. Si detectas un problema relacionado con datos de menores, por favor repórtalo en GitHub.

## Cambios en la política
Podemos actualizar esta política ocasionalmente. Cada versión incluirá la fecha de última actualización. Si se realizan cambios significativos, se indicará en el historial del repositorio.

## Contacto y reporte de vulnerabilidades
- Repositorio y reportes de issues: https://github.com/JarolRojas/flaticon-downloader/issues
- Código fuente (para auditoría): https://github.com/JarolRojas/flaticon-downloader/tree/main/src

Si encuentras una vulnerabilidad de seguridad, por favor abre un issue privado según las guías de GitHub o etiqueta el issue como "security" para que podamos atenderlo prioritariamente.

## Archivos relevantes en este proyecto
- Código y UI: `src/`
- Scripts de extensión: `extension/`
- Manifest: `extension/manifest.json`

---

**Versión:** 1.0.1
**Última actualización:** 30 de octubre de 2025
**Licencia:** MIT (ver LICENSE)

Gracias por usar la extensión. Tu privacidad y transparencia son prioridades.

**¡Tu privacidad es importante para nosotros!** 🔒
