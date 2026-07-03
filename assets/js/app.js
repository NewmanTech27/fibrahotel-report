/* Fibra Hotel — render the portfolio savings data (window.FIBRA) after decrypt. */
(function () {
  var F = window.FIBRA, $ = function (s) { return document.querySelector(s); };
  if (!F) return;
  var mxn = function (n) { return "$" + Math.round(n).toLocaleString("es-MX"); };
  var pct = function (n) { return (n * 100).toFixed(1) + "%"; };

  $("#f-titulo").textContent = F.meta.titulo;
  $("#f-lede").textContent = F.meta.lede;

  var stats = [
    [F.meta.n, "inmuebles"],
    [mxn(F.meta.tot_bill), "factura CFE anual (sin IVA)"],
    [mxn(F.meta.tot_net) + "/año", "ahorro neto Año 1"],
    [pct(F.meta.tot_net / F.meta.tot_bill), "ahorro sobre la factura"]
  ];
  $("#stats").innerHTML = stats.map(function (s) {
    return '<div class="stat"><div class="n">' + s[0] + '</div><div class="l">' + s[1] + "</div></div>";
  }).join("");

  var head = ["No. Servicio", "Región", "Factura/año", "Solar", "Batería", "PPA $/kWh",
    "Cobertura solar", "Ahorro neto Año 1", "% factura", "Ahorro contrato"];
  var rows = F.sites.map(function (s) {
    return "<tr>" +
      "<td>" + s.svc + "</td><td>" + s.region + "</td>" +
      "<td>" + mxn(s.bill) + "</td>" +
      "<td>" + s.kwp + " kWp</td>" +
      "<td>" + (s.batt ? s.batt + " kWh" : "—") + "</td>" +
      "<td>$" + s.ppa.toFixed(2) + "</td>" +
      "<td>" + pct(s.cov) + "</td>" +
      '<td class="hl">' + mxn(s.net1) + "</td>" +
      "<td>" + pct(s.netpct) + "</td>" +
      "<td>" + mxn(s.acc_c) + "</td>" +
      "</tr>";
  }).join("");
  $("#ptable").innerHTML = "<thead><tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
    "</tr></thead><tbody>" + rows + "</tbody>";
})();
