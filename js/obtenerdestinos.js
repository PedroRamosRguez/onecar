function destinos() {
console.log("boton presionado...");
var busqueda= destino.value.toUpperCase();
console.log(busqueda);
    $.ajax({
      type: 'GET',
      url: 'http://10.6.128.175:8080/viajes',
      dataType:"jsonp",
      success: function(datos) {
        //window.open("http://banot.etsii.ull.es/alu4718/Onecar/principal.html",'_blank');
        console.log("no hubo errores...");
        //console.log(datos);
        document.getElementById("texto").innerHTML="";
        $.each(datos,function(i,campos){
          $.each(campos, function(j, valores){
            if(busqueda === valores.Zona  && valores.Tipo_Usuario === "CONDUCTOR" ){
              console.log("coincidencia...");
              console.log(valores);
              //$('#texto').append('<pre>' + JSON.stringify(valores, null, 2) + '</pre>');

              $('#texto').append('<p> Nombre: ' +valores.Nombre);
              $('#texto').append('<p> Apellidos: ' +valores.Apellidos);
              $('#texto').append('<p> Nick: ' +valores.Username);
              $('#texto').append('<p> Edad: ' +valores.Edad);
              $('#texto').append('<p> Zona: ' +valores.Zona);
            }
            //console.log(busqueda);
          });  
        })
        
      },
      error: function(jqXHR, textStatus, error) {
        console.log("error....");
      }
    });
  }
  
  