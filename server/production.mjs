import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from './index.js';

// ES module fix untuk __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buat instance server API Anda
const api = createServer();

// Buat server utama yang akan menggabungkan keduanya
const app = express();

// Gunakan semua rute API Anda di bawah path /api
app.use('/api', api);

// Path ke folder build frontend
const clientBuildPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// Kirimkan index.html untuk semua permintaan yang bukan API
app.get('*', (req, res) => {
  res.sendFile(path.resolve(clientBuildPath, 'index.html'));
});

// Ambil PORT dari environment variable Cloud Run
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(Number(PORT), HOST, () => {
  console.log(`✅ Server berjalan di http://${HOST}:${PORT}, melayani API & Frontend`);
});
