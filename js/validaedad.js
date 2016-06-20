function validaedad(valor)
{
    "use strict";
    var edad=valor.value;
    if ( edad < 18 )
    {
        alert(" Debes ser mayor de edad para utilizar la plataforma");
        valor.style.color='#FFDDDD';
    }
    else
    {
      valor.style.color='#d1d1d1';
    }
}