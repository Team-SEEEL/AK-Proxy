const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


app.use(express.static(`${__dirname}/../public`));

const port = 3000;

app.use('/products', createProxyMiddleware({ target: `http://localhost:3001`, changeOrigin: true }));
app.use('/carousel', createProxyMiddleware({ target: `http://localhost:3002`, changeOrigin: true }));
app.use('/questions', createProxyMiddleware({ target: `http://localhost:3003`, changeOrigin: true }));
app.use('/reviews', createProxyMiddleware({ target: `http://localhost:3004`, changeOrigin: true }));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.listen(port, (req, res) => {
    console.log(`Server listening on ${port}`);
});