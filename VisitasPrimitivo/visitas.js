const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '0.0.0.0';
const port = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    // Muestra la página principal con el formulario y lista de mensajes.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('visitas.txt', 'utf8', (err, data) => {
      const messages = err ? '' : data.split('\n').filter(Boolean).join('<br>');
      res.end(`
        <html>
          <body>
            <h1>Libro de Visitas</h1>
            <form method="POST" action="/nuevo">
              <label>Nombre:</label><br>
              <input type="text" name="nombre" placeholder="Tu nombre" required><br><br>
              
              <label>Correo Electrónico:</label><br>
              <input type="email" name="correo" placeholder="Tu correo electrónico" required><br><br>
              
              <label>Comentario:</label><br>
              <textarea name="comentario" placeholder="Escribe tu comentario" required></textarea><br><br>
              
              <button type="submit">Enviar</button>
            </form>
            <h2>Mensajes:</h2>
            <p>${messages || 'No hay mensajes aún.'}</p>
          </body>
        </html>
      `);
    });
  } else if (req.method === 'POST' && parsedUrl.pathname === '/nuevo') {
    // Almacena el nombre, correo y comentario en el archivo `visitas.txt`.
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const nombre = params.get('nombre');
      const correo = params.get('correo');
      const comentario = params.get('comentario');

      const message = `Nombre: ${nombre} | Correo: ${correo} | Comentario: ${comentario}\n`;
      fs.appendFile('visitas.txt', message, err => {
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
