const express = require('express')
const conf = require('./next.config')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const HOST = 'localhost'
const PORT = 3000;

// App
const app = next({ dev:false, conf})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    
    if (err) throw err;
    console.log(`Running on http://${HOST}:${PORT}`);
  })

});