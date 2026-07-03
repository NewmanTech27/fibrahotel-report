/* Render the client-facing Fibra Hotel report (window.INFORME) after decrypt. */
(function () {
  var I = window.INFORME, $ = function (s) { return document.querySelector(s); };
  if (!I) return;
  var estadoLabel = { "validado": "Validado", "requiere-datos": "Requiere datos", "parcial": "Parcial" };

  $("#i-titulo").textContent = I.resumen.titulo;
  $("#i-lede").textContent = I.resumen.lede;
  $("#i-puntos").innerHTML = I.resumen.puntos.map(function (p) { return "<li>" + p + "</li>"; }).join("");

  $("#i-oportunidad").innerHTML = I.oportunidad.map(function (o) {
    return '<div class="card"><h3>' + o.h + "</h3><p>" + o.b + "</p></div>";
  }).join("");

  $("#i-metodo-intro").textContent = I.metodologia.intro;
  $("#i-metodo").innerHTML = I.metodologia.correcciones.map(function (c) {
    return '<div class="corr"><div class="corr-row"><span class="de">' + c.de +
      '</span><span class="arrow">→</span><span class="a">' + c.a + "</span></div>" +
      "<p>" + c.por + "</p></div>";
  }).join("");

  $("#i-estado-intro").textContent = I.estado.intro;
  $("#i-estado").innerHTML = I.estado.sitios.map(function (s) {
    return '<div class="site-row"><span class="site-ref">' + s.ref + "</span>" +
      '<span class="badge ' + s.estado + '">' + estadoLabel[s.estado] + "</span>" +
      '<span class="site-note">' + s.nota + "</span></div>";
  }).join("");

  $("#i-datos-intro").textContent = I.datos.intro;
  $("#i-datos").innerHTML = I.datos.como.map(function (d) {
    return '<div class="card"><h3>' + d.h + "</h3><p>" + d.b + "</p></div>";
  }).join("");

  $("#i-pasos").innerHTML = I.pasos.map(function (p) {
    return '<div class="step"><div class="step-n">' + p.n + "</div><div><h4>" + p.h +
      "</h4><p>" + p.b + "</p></div></div>";
  }).join("");
})();
