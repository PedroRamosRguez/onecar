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
  router.get('/',(req,res)=>{
    connection.query("SELECT * from Usuarios",(err, rows, fields)=>{
    let data={
    
    }; 
      if (err){
        console.log('error al conectar a la base de datos..');
        res.status(500).send('error al conectar a la base de datos');
        throw err;
      }  
      console.log(rows);
      if(rows.length != 0){
        data["Usuarios"] = rows;
        res.jsonp(data);
      }else{
        res.status(200).jsonp(data);
      }
    });
  });	//este es el cierre de router.get
  //peticion post para el registro de un usuario. Actualmente es una prueba de un insert y el script, no esta del todo correcto ya que el id debe autoincrementar solo.
  router.post('/',(req,res)=>{
     let nombre = req.body.nombre,
	 apellidos = req.body.apellidos,
         usuario = req.body.username,
         pass = req.body.password,
	 edad = req.body.edad,
	 email = req.body.email,
         sexo = req.body.sexo,
         vehiculo = req.body.vehiculo,
         tipousuario= "",
         zona = req.body.zona.toUpperCase(),
 	 valido = 0;
      connection.query('SELECT * FROM Usuarios ',(err,rows,fields)=>{
        if(err){
	   throw err;
        }else{
	  for (var i=0;i<rows.length;i++){
	    if(rows[i].username === usuario){
		console.log("coincidencia encontrada");
		valido=1;		
	    }
         }  
	}
        console.log("valido="+valido);
        if(valido===0){   
          console.log("no se encontraron coincidencias por tanto se inserta el usuario...");
          if(vehiculo === "Si"){
            tipousuario = "CONDUCTOR";
          }else{
	    tipousuario = "PASAJERO";
          }
	   connection.query('INSERT INTO Usuarios(Nombre,Apellidos,Username,Password,Edad,Email,Sexo,Vehiculo,Tipo_Usuario,Zona)values("'+nombre+'","'+apellidos+'","'+usuario+'",md5("'+pass+'"),"'+edad+'","'+email+'","'+sexo+'","'+vehiculo+'","'+tipousuario+'","'+zona+'")',(err)=>{
           if (err){
            console.log('error al ingresar..');
	    res.redirect(500,'http://banot.etsii.ull.es/alu4718/Onecar/registro.html');	
            throw err;
           }
          //res.status(200).send("exito al registrarse");
            console.log('exito al registrarse');
	    res.redirect(200,'http://banot.etsii.ull.es/alu4718/Onecar/index.html');
          });
          }else{
          res.status(500).send("YA EXISTE UN USUARIO CON ESE NICK");
         }
        });
   });
module.exports = router;
})();
