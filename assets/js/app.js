/* Fibra Hotel analysis — vanilla render. No dependencies. */
(function () {
  var F = window.FIBRA, $ = function (s, r) { return (r || document).querySelector(s); };
  var mxn = function (n) { return "$" + Math.round(n).toLocaleString("es-MX"); };
  var pct = function (n) { return (n * 100).toFixed(1) + "%"; };
  var dataLabel = { "genuine": "real", "genuine-bill": "recibo real", "fabricated": "fabricado", "copy-paste": "copy-paste", "circular": "circular" };

  // --- stat strip (portfolio totals) ---
  var totBill = F.sites.reduce(function (a, s) { return a + s.bill; }, 0);
  var totNet = F.sites.reduce(function (a, s) { return a + s.net; }, 0);
  var withBatt = F.sites.filter(function (s) { return s.batt !== "—"; }).length;
  var p1 = F.findings.filter(function (f) { return f.sev === "P1"; }).length;
  var genuine = F.sites.filter(function (s) { return s.data === "genuine"; }).length;
  var stats = [
    [F.sites.length, "sitios analizados"],
    [mxn(totBill), "factura CFE anual (sin IVA)"],
    [pct(totNet / totBill), "ahorro neto ponderado Año 1"],
    [withBatt + " / 6", "sitios con batería"],
    [p1, "hallazgos severidad P1"],
    [genuine + " / 6", "con datos reales honestos"]
  ];
  $("#stats").innerHTML = stats.map(function (s) {
    return '<div class="stat"><div class="n">' + s[0] + '</div><div class="l">' + s[1] + '</div></div>';
  }).join("");

  // --- portfolio table ---
  var head = ["No. Servicio", "Región", "Factura/año", "Batería", "PPA $/kWh", "Esc. CFE", "Cobertura solar", "Ahorro neto A1", "% neto", "Datos"];
  var rows = F.sites.map(function (s) {
    return "<tr>" +
      "<td>" + s.svc + "</td>" +
      "<td>" + s.region + "</td>" +
      "<td>" + mxn(s.bill) + "</td>" +
      "<td>" + s.batt + "</td>" +
      "<td>$" + s.ppa.toFixed(2) + "</td>" +
      "<td>" + s.esc + "%</td>" +
      "<td>" + pct(s.cov) + "</td>" +
      "<td>" + mxn(s.net) + "</td>" +
      "<td>" + pct(s.netpct) + "</td>" +
      '<td><span class="tag" data-d="' + s.data + '">' + dataLabel[s.data] + "</span></td>" +
      "</tr>";
  }).join("");
  $("#ptable").innerHTML = "<thead><tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
    "</tr></thead><tbody>" + rows + "</tbody>";

  // --- business logic cards ---
  $("#logic").innerHTML = F.logic.map(function (l) {
    return '<div class="card"><h3>' + l.h + "</h3><p>" + l.b + "</p></div>";
  }).join("");

  // --- findings (filterable) ---
  var lenses = ["Todos"].concat(F.findings.map(function (f) { return f.lens; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
  $("#filter").innerHTML = lenses.map(function (l, i) {
    return '<button data-lens="' + l + '" aria-pressed="' + (i === 0) + '">' + l + "</button>";
  }).join("");
  function renderFinds(lens) {
    var list = F.findings.filter(function (f) { return lens === "Todos" || f.lens === lens; })
      .sort(function (a, b) { return a.sev.localeCompare(b.sev); });
    $("#finds").innerHTML = list.map(function (f) {
      return '<div class="find"><span class="sev ' + f.sev + '">' + f.sev + "</span>" +
        '<div><h4>' + f.t + ' <span class="lens">' + f.lens + "</span></h4><p>" + f.d + "</p></div></div>";
    }).join("");
  }
  $("#filter").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    [].forEach.call(this.children, function (c) { c.setAttribute("aria-pressed", c === b); });
    renderFinds(b.dataset.lens);
  });
  renderFinds("Todos");

  // --- verdict ---
  $("#v-yes").innerHTML = '<div class="vh">Estructuralmente</div><h3>Sí, cuadran</h3><p>' + F.verdict.structural + "</p>";
  $("#v-no").innerHTML = '<div class="vh">Listos para vender</div><h3>No todavía</h3><p>' + F.verdict.salesReady + "</p>";
})();
