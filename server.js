const http = require('http');
const fs = require('fs');
const path = require('path');

// Get port from command line arguments or default to 3000
const port = process.argv[2] || 3000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Handle the root path and ignore query strings
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let filePath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  filePath = path.join(process.cwd(), filePath);
  
  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        fs.readFile(path.join(process.cwd(), '404.html'), (err, content404) => {
          if (err) {
            // No 404 page, send default error
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The page you are looking for could not be found.</p>', 'utf-8');
          } else {
            // Send custom 404 page
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content404, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`\nWanderlust Escapes server is running on:`);
  console.log(`  http://localhost:${port}`);
  console.log(`  http://127.0.0.1:${port}`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});