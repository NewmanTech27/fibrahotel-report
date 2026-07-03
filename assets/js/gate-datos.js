/* Password gate — real AES-256-GCM decryption in-browser (WebCrypto).
   The repo is public but ships only ciphertext; without the passphrase the
   payload is cryptographically useless. No password is stored or checked
   client-side — an incorrect key simply fails to decrypt (GCM auth tag). */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var b64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); };

  async function decrypt(pass) {
    var enc = window.DATOS_ENC;
    var keyMat = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass),
      "PBKDF2", false, ["deriveKey"]);
    var key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: b64(enc.salt), iterations: enc.iter, hash: "SHA-256" },
      keyMat, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    var pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(enc.iv) }, key, b64(enc.ct));
    return JSON.parse(new TextDecoder().decode(pt));
  }

  function reveal(data) {
    window.DATOS = data;
    $("#gate").remove();
    document.body.classList.remove("locked");
    var s = document.createElement("script"); s.src = "assets/js/datos.js";
    document.body.appendChild(s);
  }

  window.addEventListener("DOMContentLoaded", function () {
    var form = $("#gate-form"), input = $("#gate-pass"), err = $("#gate-err"), btn = $("#gate-btn");
    // remember within the tab only (sessionStorage) so a reload doesn't re-prompt
    var saved = sessionStorage.getItem("fibra-pass");
    if (saved) decrypt(saved).then(reveal).catch(function () { sessionStorage.removeItem("fibra-pass"); });
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); err.textContent = ""; btn.disabled = true; btn.textContent = "Descifrando…";
      try {
        var data = await decrypt(input.value);
        sessionStorage.setItem("fibra-pass", input.value);
        reveal(data);
      } catch (_) {
        err.textContent = "Contraseña incorrecta.";
        btn.disabled = false; btn.textContent = "Entrar"; input.select();
      }
    });
  });
})();
