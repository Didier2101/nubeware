# Nubeware - Gestión del Servicio

## Estructura del Proyecto
- `css/`: Hoja de estilos principal (`styles.css`).
- `js/`: Lógica de la aplicación e internacionalización.
  - `i18n.js`: Sistema de traducciones y cambio de idioma.
  - `script.js`: Animaciones y comportamiento común.
  - `config.js`: Configuración de APIs.
  - `rag-app.js`: Lógica de la aplicación RAG.
- `assets/`: Imágenes, favicons e iconos.
- `index.html`, `services.html`, etc.: Páginas principales.

## Internacionalización (i18n)
La aplicación soporta Español (ES) e Inglés (EN). Para añadir nuevas traducciones:
1. Edite `js/i18n.js` y añada las claves en los objetos para `es` y `en`.
2. En el HTML, añada el atributo `data-i18n="TU_CLAVE"` al elemento deseado.

## Información del Servicio
- **Nombre**: nubeware.service
- **Usuario**: didier  
- **Directorio**: /home/didier/nubeware
- **Puerto**: 3000
- **URL**: http://localhost:3000

## Comandos Esenciales

### Gestión del Servicio
```bash
# Estado
sudo systemctl status nubeware.service

# Iniciar
sudo systemctl start nubeware.service

# Detener  
sudo systemctl stop nubeware.service

# Reiniciar
sudo systemctl restart nubeware.service

# Recargar configuración
sudo systemctl daemon-reload && sudo systemctl restart nubeware.service
```

### Logs y Verificación
```bash
# Logs en tiempo real
sudo journalctl -u nubeware.service -f

# Últimos logs
sudo journalctl -u nubeware.service -n 30

# Verificar respuesta
curl -I http://localhost:3000

# Procesos y puertos
ps aux | grep node
sudo netstat -tulpn | grep :3000
```

### Desarrollo
```bash
npm run dev
npm run build
npm start
```