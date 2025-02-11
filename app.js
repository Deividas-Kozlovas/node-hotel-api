const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello");
});

server.listen(PORT, () => {
    console.log(`Server runing at http://localhost:${PORT}`);
})