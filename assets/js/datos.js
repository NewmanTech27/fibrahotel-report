/* Render the Fibra Hotel data landing (window.DATOS) after decrypt. */
(function () {
  var D = window.DATOS, $ = function (s) { return document.querySelector(s); };
  if (!D) return;
  var mxn = function (n) { return "$" + Math.round(n).toLocaleString("es-MX"); };
  var pct = function (n) { return (n * 100).toFixed(1) + "%"; };
  var confLabel = { alta: "Alta", media: "Media", baja: "Requiere datos" };

  $("#d-titulo").textContent = D.meta.titulo;
  $("#d-lede").textContent = D.meta.lede;

  var stats = [
    [D.meta.n, "inmuebles"],
    [mxn(D.meta.tot_bill), "factura CFE anual (sin IVA)"],
    [mxn(D.meta.tot_corr) + "/año", "ahorro neto corregido (Año 1)"],
    [pct(D.meta.tot_corr / D.meta.tot_bill), "ahorro ponderado corregido"]
  ];
  $("#d-stats").innerHTML = stats.map(function (s) {
    return '<div class="stat"><div class="n">' + s[0] + '</div><div class="l">' + s[1] + "</div></div>";
  }).join("");

  // reported vs corrected table
  var head = ["No. Servicio", "Reg.", "Factura/año", "Solar", "Batería", "PPA",
    "Cobert.", "Neto A1 (reportado)", "Neto A1 (corregido)", "Confianza"];
  var rows = D.sites.map(function (s) {
    var batt = s.batt ? s.batt + " kWh" : "—";
    return "<tr>" +
      "<td>" + s.svc + "</td><td>" + s.region + "</td>" +
      "<td>" + mxn(s.bill) + "</td>" +
      "<td>" + s.kwp + " kWp</td><td>" + batt + "</td>" +
      "<td>$" + s.ppa.toFixed(2) + "</td>" +
      "<td>" + pct(s.cov) + "</td>" +
      "<td>" + mxn(s.net1) + " · " + pct(s.netpct) + "</td>" +
      '<td class="corr-cell">' + mxn(s.net1_corr) + " · " + pct(s.netpct_corr) + "</td>" +
      '<td><span class="conf ' + s.conf + '">' + confLabel[s.conf] + "</span></td>" +
      "</tr>";
  }).join("");
  $("#d-table").innerHTML = "<thead><tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
    "</tr></thead><tbody>" + rows + "</tbody>";

  // corrections
  $("#d-corr").innerHTML = D.correcciones.map(function (c) {
    return '<div class="corr"><div class="corr-head"><h3>' + c.t + '</h3><span class="ef">' + c.ef + "</span></div>" +
      '<div class="corr-row"><span class="de">' + c.de + '</span><span class="arrow">→</span><span class="a">' + c.a + "</span></div>" +
      "<p>" + c.por + "</p></div>";
  }).join("");

  // confidence legend
  $("#d-conf").innerHTML = Object.keys(D.confianza).map(function (k) {
    return '<div class="conf-item"><span class="conf ' + k + '">' + confLabel[k] + "</span><p>" + D.confianza[k] + "</p></div>";
  }).join("");
})();
