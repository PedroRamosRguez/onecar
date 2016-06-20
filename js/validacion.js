function validaemail(valor)
{
    "use strict";
    var email=valor.value;
    var regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !regexp.test(email) )
    {
        alert("Error: La dirección de correo " + email + " es incorrecta. Debe tener formato (xxx@xx.xx)");
        valor.style.color='#FFDDDD';
    }
    else
    {
      valor.style.color='#d1d1d1';
    }
}

