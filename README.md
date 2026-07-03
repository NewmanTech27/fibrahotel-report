# Fibra Hotel — Análisis Solar+BESS (protegido)

Reporte estático protegido con contraseña. Auditoría independiente de Newman Energy sobre seis
simuladores de ahorro Solar+BESS (tarifa CFE GDMTH) para Fibra Hotel.

## Modelo de seguridad
Este repositorio es **público**, pero **no contiene datos legibles del cliente**. El contenido del
reporte (`assets/js/payload.js`) es un único texto cifrado con **AES-256-GCM**; la llave se deriva de
una contraseña mediante **PBKDF2-SHA256 (250,000 iteraciones)**. El descifrado ocurre íntegramente en
el navegador (WebCrypto) al ingresar la contraseña. Una contraseña incorrecta falla la verificación
GCM — no hay validación de contraseña del lado del cliente que se pueda evadir, y el texto plano nunca
se publica ni se sirve.

El acceso requiere la contraseña (compartida por Newman fuera de línea).

## Stack
HTML/CSS/JS vainilla, sin build, sin dependencias. Marca Newman v3.
```
index.html                 puerta de contraseña + estructura del reporte
assets/js/payload.js       datos del reporte cifrados AES-256-GCM (solo texto cifrado)
assets/js/gate.js          descifrado WebCrypto PBKDF2 + AES-GCM
assets/js/app.js           render vainilla (corre solo tras descifrar)
assets/css/*.css           marca Newman v3 + capa de reporte
```

## Correr localmente
```bash
python3 -m http.server 8080   # → http://localhost:8080, luego ingresa la contraseña
```
Publicado con GitHub Pages (Settings → Pages → Deploy from branch `main`).

---
*Análisis generado por el flock de agentes de Newman. No constituye propuesta comercial ni asesoría de inversión.*
