document.addEventListener("mouseup", function (event) {
  var obj = document.getElementById("busca");
  if (!obj.contains(event.target)) {
    document.body.style.background = "url(../Imagens/Mapa.png)";
  } else {
    document.body.style.background = "#f3f3f3";
    document.body.style.zIndex = "2";
  }
});
