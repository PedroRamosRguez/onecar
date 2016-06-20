function destinos() {
console.log("boton presionado...");
var busqueda= destino.value.toUpperCase();
console.log(busqueda);
    $.ajax({
      type: 'GET',
      url: 'http://10.6.128.175:8080/viajes',
      dataType:"jsonp",
      success: function(datos) {
        
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
  /* Función que realiza la consulta de ajax*/



/*function destinos() {
   console.log("prueba");
    $.ajax({
      url: './js/usuarios.json',
      type: 'GET',
      data: { 'parametro': "values"},
      dataType:"json",

      success: function(datos) {
        document.getElementById("texto").innerHTML="";
        
        var valor=origen.value.toLowerCase();
        console.log(valor);
        $.each(datos,function(i,campos)
        {
          $.each(campos, function(j, valores){
          if(valor==valores.zona.toLowerCase())
          {
            $('#texto').append('<p> Nombre: ' +valores.nombre);
            $('#texto').append('<p> Edad: ' +valores.edad);
            $('#texto').append('<p> Nombre Usuario: ' +valores.nusuario);
            $('#texto').append('<p> Antigüedad: ' +valores.antiguedad);
          }
        });  
        })
        
      },
      error: function(jqXHR, textStatus, error) {
        console.log("error....");
      }
    });
  }
*/
  

  
  