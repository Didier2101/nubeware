cat > README.md << 'EOF'
# Nubeware - Gestión del Servicio

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



# Logs en tiempo real
sudo journalctl -u nubeware.service -f

# Últimos logs
sudo journalctl -u nubeware.service -n 30

# Verificar respuesta
curl -I http://localhost:3000

# Procesos y puertos
ps aux | grep node
sudo netstat -tulpn | grep :3000



# Desarrollo
npm run dev

# Build producción
npm run build

# Inicio manual
npm start




# Puerto ocupado
sudo lsof -i :3000
sudo kill -9 <PID>

# Reconstrucción completa
sudo systemctl stop nubeware.service
npm run build
sudo systemctl start nubeware.service

# Permisos
sudo chown -R didier:didier /home/didier/nubeware