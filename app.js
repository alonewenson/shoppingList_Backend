const express = require('express')
const https = require('https');
const fs = require('fs');
const imgRoutes = require('./routes/imgRoutes');
const listRoutes = require('./routes/listRoutes');
const DB = require('./db/imgsDB')
const app = express()
const port = 3000


DB.init().then(() => {

  app.use(function(req, res, next) {
    //TODO not sure we need al these headears
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.use('/images' , imgRoutes);
  
  app.use('/shoppingLists' , listRoutes);
  
  https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app)
  .listen(port, function () {
    console.log(`Example app listening at https://localhost:${port}`)
  })

})
.catch( err => console.log(err))