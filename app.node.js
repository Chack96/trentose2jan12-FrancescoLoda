var express = require('express');
var app = express();
//libreria
const uuid = require("uuid/v4");
//Istanza bodyparser per leggere i JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//Activate CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", false);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method=='OPTIONS'){
    res.sendStatus(200);
  }else{
    next();
  }
});

var opzioni = {
  dotfiles: 'ignore', //ignora i files preceduti dal punto
  etag: false,
  fallthrough: true, //se non trova il file salta la funzione e va a quella dopo
  index: 'index.html', //default index
  maxAge: '1d', //quanto rimane in cache
  redirect: false,
  setHeaders: function (res, path, stat) { //imposta il documento
      res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(__dirname + '/docs', opzioni));

var astronauti = {};

app.post('/add/', function (req, res) {
  if(req.body.firstName==null || req.body.lastName==null || req.body.isInSpace==null){
    res.sendStatus(500);
  }
  var astronauta ={
    astroId : uuid(),
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    isInSpace : req.body.isInSpace,
  };
  astronauti.push(astronauta);
  res.sendStatus(200);
});

module.exports = app;
