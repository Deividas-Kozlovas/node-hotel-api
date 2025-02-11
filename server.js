const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    
    if(req.url === "/"){
        res.end("Welcome home");
    }else{
        res.writeHead(404);
        res.end("Page Not Found")
    }
});

server.listen(PORT, () => {
    console.log(`Server runing at http://localhost:${PORT}`);
})