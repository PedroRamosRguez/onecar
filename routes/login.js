(() => {
  'use strict';
  const express = require("express"),
        router = express.Router(),
        mysql = require('mysql'),
	crypto = require('crypto');
  
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
//peticion post para el registro de un usuario. Actualmente es una prueba de un insert y el script, no esta del todo correcto ya que el id debe autoincrementar solo.
  router.post('/',(req,res)=>{ 
     let usuario=req.body.username,
         pass=crypto.createHash('md5').update(req.body.password).digest("hex"),
 	 valido=0;
     connection.query('SELECT *  FROM Usuarios ',(err,rows,fields)=>{
        if(err){
	   throw err;
        }else{
	  for (var i=0;i<rows.length;i++){
	    if(rows[i].Username === usuario && rows[i].Password === pass){
		console.log("coincidencia encontrada");					
	   	valido=1;
	    }
         }	
	}
        console.log("valido="+valido);
        if(valido===0){   
          console.log("no se encontraron coincidencias, error de loging, introduce bien la pass o registrese");
	  res.status(500).send('Error al introducir usuario o contraseña');
	}else{
         res.redirect(302,'http://banot.etsii.ull.es/alu4718/Onecar/principal.html');
        }
      
     });
  });
module.exports = router;
})();
