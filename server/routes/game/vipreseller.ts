import express, { Request, Response } from 'express';
import axios from 'axios';
import crypto from 'crypto';

const router = express.Router();

// --- Konfigurasi Dasar ---
const API_ID = process.env.VIP_RESELLER_API_ID;
const API_KEY = process.env.VIP_RESELLER_API_KEY;
const BASE_URL = 'https://vip-reseller.co.id/api/game-feature';

// --- Fungsi Helper untuk mengirim request ke VIP Reseller ---
// Ini akan mengurus pembuatan signature dan pengiriman request secara otomatis
const sendVipRequest = async (payload: object) => {
  if (!API_ID || !API_KEY) {
    throw new Error('API ID atau API Key VIP Reseller belum diatur di .env');
  }

  // Membuat signature MD5
  const sign = crypto.createHash('md5').update(API_ID + API_KEY).digest('hex');

  const params = new URLSearchParams({
    key: API_KEY,
    sign,
    ...payload,
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    // Header User-Agent ini penting untuk meniru request PHP dan menghindari blokir
    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)',
  };

  try {
    const response = await axios.post(BASE_URL, params, { headers });
    // Jika result false, lemparkan error agar bisa ditangkap di endpoint
    if (response.data.result === false) {
      throw new Error(response.data.message || 'Terjadi kesalahan dari provider.');
    }
    return response.data;
  } catch (error: any) {
    // Melemparkan kembali error agar bisa ditangani oleh pemanggil
    const errorMessage = error.response?.data?.message || error.message;
    console.error('VIP Reseller API Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// --- ROUTES ---

/**
 * @route   POST /api/game/vipreseller/check-nickname
 * @desc    Mendapatkan nickname game dari User ID & Zone ID
 * @access  Public
 */
router.post('/check-nickname', async (req: Request, res: Response) => {
  const { gameCode, userId, zoneId } = req.body;

  if (!gameCode || !userId) {
    return res.status(400).json({ message: 'Parameter gameCode dan userId dibutuhkan.' });
  }

  try {
    const response = await sendVipRequest({
      type: 'get-nickname',
      code: gameCode,
      target: userId,
      additional_target: zoneId,
    });
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/game/vipreseller/services
 * @desc    Mendapatkan daftar layanan/produk
 * @access  Public
 */
router.post('/services', async (req: Request, res: Response) => {
    // Anda bisa menambahkan filter dari req.body jika diperlukan
    const { filterType, filterValue } = req.body;

    try {
      const response = await sendVipRequest({
        type: 'services',
        filter_type: filterType,
        filter_value: filterValue,
      });
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
});


/**
 * @route   POST /api/game/vipreseller/order
 * @desc    Membuat pesanan baru
 * @access  Public
 */
router.post('/order', async (req: Request, res: Response) => {
    const { serviceCode, userId, zoneId } = req.body;

    if (!serviceCode || !userId) {
        return res.status(400).json({ message: 'Parameter serviceCode dan userId dibutuhkan.' });
    }

    try {
        const response = await sendVipRequest({
            type: 'order',
            service: serviceCode,
            data_no: userId,
            data_zone: zoneId
        });
        res.json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route   POST /api/game/vipreseller/status
 * @desc    Mengecek status transaksi
 * @access  Public
 */
router.post('/status', async (req: Request, res: Response) => {
    const { trxid } = req.body;

    if (!trxid) {
        return res.status(400).json({ message: 'Parameter trxid dibutuhkan.' });
    }
    
    try {
        const response = await sendVipRequest({
            type: 'status',
            trxid: trxid
        });
        res.json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;