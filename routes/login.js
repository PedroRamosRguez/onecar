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
  // console.log("estoy en el controlador de login...");
  // console.log(req.body.username);
   //console.log(req.body.password);
   //console.log("password cifrada: "+ crypto.createHash('md5').update(req.body.password).digest("hex"));
   //console.log("datos pasados..."); 
     let usuario=req.body.username,
         pass=crypto.createHash('md5').update(req.body.password).digest("hex"),
 	 valido=0;
     //console.log("variable  usuario: "+usuario+", variable pass: "+pass);
     connection.query('SELECT *  FROM Usuarios ',(err,rows,fields)=>{
        if(err){
	   throw err;
        }else{
	  for (var i=0;i<rows.length;i++){
	    //console.log(rows[i]);
	    if(rows[i].username === usuario && rows[i].password === pass){
		console.log("coincidencia encontrada");
		res.redirect(200,'/');//cambiarlo para que dirija a la pagina en banot principal...			
	   	valido=1;
	    }
	    console.log("i="+i);
         }	
	//  console.log(rows.length);
	  //console.log("yya existe un usuario con ese nombre"); 
	}
        console.log("valido="+valido);
        if(valido===0){   
          console.log("no se encontraron coincidencias, error de loging, introduce bien la pass o registrese");
          res.status(500).send('Error de login');
          //res.redirect('/'); modificar para que luego envie a la pagina del logueo de bannot
	}
     });
  });
module.exports = router;
})();
