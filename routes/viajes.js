(() => {
  'use strict';
  const express = require("express"),
        router = express.Router(),
        mysql = require('mysql');
  
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alumno',
    database: 'onecar'
  });

connection.connect((err)=>{
  if (err){
    console.log("error al conectar...");
    throw err;
  } 
  console.log('conectado a la bbdd..');
});

//peticion post del login a la platforma.
  router.post('/',(req,res)=>{
  console.log("estoy en el controlador de viajes...");
     let destino = req.body.destino.toUpperCase(),
         data = {},
	 array = [], 
 	 valido=0;
     //console.log("variable  usuario: "+usuario+", variable pass: "+pass);
     connection.query('SELECT *  FROM Usuarios ',(err,rows,fields)=>{
        if(err){
	   throw err;
        }else{
	  for (var i=0;i<rows.length;i++){
	    //console.log(rows[i]);
	    if(rows[i].Zona === destino && rows[i].Tipo_Usuario === "CONDUCTOR"){
		//res.redirect(200,'/');//cambiarlo para que dirija a la pagina en banot principal...			
	   	console.log("coincidencia...");
		data["Usuarios"] = rows[i];
		array.push(rows[i]);
		console.log(data); 
		valido=1;	
	    }
         } 
	}
        if(valido === 0){   
          console.log("no se encontraron coincidencias");
          res.status(500).send('Error de busqueda de destinos');
          //res.redirect('/'); modificar para que luego envie a la pagina del logueo de bannot
	}else{
	 res.status(200).jsonp(array);
	}	 
     });
  });
module.exports = router;
})();
