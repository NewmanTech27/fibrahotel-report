# Fibra Hotel — Ahorro Solar+BESS (protegido)

Reporte estático de una página, protegido con contraseña: resultados de ahorro Solar+BESS del
portafolio Fibra Hotel (tarifa CFE GDMTH). Marca Newman v3.

## Seguridad
Repositorio público, sin datos legibles del cliente: el contenido (`assets/js/payload.js`) es texto
cifrado **AES-256-GCM**; la llave se deriva por **PBKDF2-SHA256 (250k iter)** y el descifrado ocurre
en el navegador (WebCrypto) tras ingresar la contraseña. Contraseña incorrecta = falla la verificación
GCM. El texto plano nunca se publica ni se sirve.

## Archivos
```
index.html            puerta de contraseña + tabla de resultados por inmueble
assets/js/payload.js  datos cifrados AES-256-GCM (solo texto cifrado)
assets/js/gate.js     descifrado WebCrypto
assets/js/app.js      render de la tabla (corre tras descifrar)
assets/css/*.css      marca Newman v3
assets/logo-*.svg     logotipo Newman (lockup + reversado)
```

## Local
```bash
python3 -m http.server 8080   # → http://localhost:8080, ingresa la contraseña
```
Publicado con GitHub Pages (rama `main`).
