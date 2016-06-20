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
  router.get('/',(req,res)=>{
  console.log("estoy en el controlador de viajes...");
  connection.query('SELECT * FROM Usuarios',(err,rows,fields)=>{
    let data={};
    if(err){
      console.log("error al conectar a la base de datos..");
      res.status(500).send('Error al conectar a la base de datos');
      throw err;
    }
    if(rows.length!=0){
      data["Usuarios"]=rows;
      res.status(200).jsonp(data);
    }else{
      res.status(500).send('base de datos vacía');
    }
  });
});
module.exports = router;
})();
