const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '0.0.0.0';
const port = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    // Página principal con formulario y enlace para ver comentarios.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <body>
          <h1>Libro de Visitas</h1>
          <form method="POST" action="/nuevo">
            <input type="text" name="nombre" placeholder="Nombre" required><br><br>
            <input type="email" name="correo" placeholder="Correo Electrónico" required><br><br>
            <textarea name="comentario" placeholder="Escribe tu comentario" required></textarea><br><br>
            <button type="submit">Enviar</button>
          </form>
          <br>
          <a href="/comentarios">Ver Comentarios</a>
        </body>
      </html>
    `);
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
  } else if (req.method === 'GET' && parsedUrl.pathname === '/comentarios') {
    // Página que muestra todos los comentarios guardados en `visitas.txt`.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('visitas.txt', 'utf8', (err, data) => {
      const messages = err ? 'No hay comentarios aún.' : data.split('\n').filter(Boolean).join('<br><br>');
      res.end(`
        <html>
          <body>
            <h1>Comentarios de los Visitantes</h1>
            <p>${messages}</p>
            <br>
            <a href="/">Volver a la Página Principal</a>
          </body>
        </html>
      `);
    });
  } else {
    // Página 404 para rutas no encontradas.
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Página no encontrada');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${server.address().port}/`);
});
