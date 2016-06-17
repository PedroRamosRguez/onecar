(() => {
  'use strict';
  const express = require("express");
  const router = express.Router();
  const mysql = require('mysql');
  
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
  router.get('/',(req,res)=>{
    connection.query("SELECT * from Usuarios",(err, rows, fields)=>{
    let data={
    
    }; 
      if (err){
        console.log('error al conectar a la base de datos..');
        //res.status(500).send('error');
        throw err;
      }  
      console.log(rows);
      if(rows.length != 0){
        data["Usuarios"] = rows;
        res.jsonp(data);
      }else{
        res.jsonp(data);
      }
    });
  });	//este es el cierre de router.get
  //peticion post para el registro de un usuario. Actualmente es una prueba de un insert y el script, no esta del todo correcto ya que el id debe autoincrementar solo.
  router.post('/',(req,res,next)=>{
     //console.log(req.body.username);
     //console.log(req.body.password);
     //console.log("datos pasados...");
     let usuario=req.body.username,
         pass=req.body.password,
 	 valido=0;
     //console.log("variable  usuario: "+usuario+", variable pass: "+pass);
     connection.query('SELECT * FROM Usuarios ',(err,rows,fields)=>{
        if(err){
	   throw err;
        }else{
	  for (var i=0;i<rows.length;i++){
	    //console.log(rows[i]);
	    if(rows[i].username===usuario){
		console.log("coincidencia encontrada");
		valido=1;		
	    }
	    console.log("i="+i);
         }	
	//  console.log(rows.length);
	  //console.log("yya existe un usuario con ese nombre");
	  
	}
        console.log("valido="+valido);
        if(valido===0){   
          console.log("no se encontraron coincidencias por tanto se inserta el usuario...");
          connection.query('INSERT INTO Usuarios(username,password)values("'+usuario+'",md5("'+pass+'"))',(err)=>{
          if (err){
            console.log('error al ingresar..');
            throw err;
          }
          res.status(200).send("exito al registrarse");
          });
        }else{
           res.status(500).send("YA EXISTE UN USUARIO CON ESE NICK");
         }
    });
});

module.exports = router;
})();
