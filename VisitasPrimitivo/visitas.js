const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '0.0.0.0';
const port = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    // Muestra la página principal con un formulario para agregar mensajes y una lista de mensajes previos.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('visitas.txt', 'utf8', (err, data) => {
      const messages = err ? '' : data.split('\n').filter(Boolean).join('<br>');
      res.end(`
        <html>
          <body>
            <h1>Libro de Visitas</h1>
            <form method="POST" action="/nuevo">
              <input type="text" name="mensaje" placeholder="Escribe tu mensaje" required>
              <button type="submit">Enviar</button>
            </form>
            <h2>Mensajes:</h2>
            <p>${messages || 'Todavia no hay mensajes.'}</p>
          </body>
        </html>
      `);
    });
  } else if (req.method === 'POST' && parsedUrl.pathname === '/nuevo') {
    // Almacena el mensaje en el archivo `visitas.txt`.
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const message = params.get('mensaje');

      fs.appendFile('visitas.txt', message + '\n', err => {
        res.statusCode = err ? 500 : 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  } else {
    // Muestra una página 404 para cualquier otra ruta.
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Página no encontrada');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${server.address().port}/`);
});
