import { createServer } from './index'; // Impor fungsi pabrik Anda

// Buat instance server dari pabrik
const app = createServer();

// Ambil PORT dari environment variable yang diberikan Cloud Run, atau 3001
const PORT = 8080;
// '0.0.0.0' penting agar bisa diakses dari luar container
const HOST = '0.0.0.0';

// Mulai server dan buat dia mendengarkan
app.listen(Number(PORT), HOST, () => {
  console.log(`✅ Server produksi berjalan dan mendengarkan di http://${HOST}:${PORT}`);
});