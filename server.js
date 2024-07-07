import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.use(
  '/fruityvice',
  createProxyMiddleware({
    target: 'https://www.fruityvice.com',
    changeOrigin: true,
    pathRewrite: {
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('origin', 'https://www.fruityvice.com'); 
    },
  })
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
