import express from 'express';
import axios from 'axios'; // Import axios
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper function to get Midtrans API URL based on environment
const getMidtransApiUrl = () => {
  // Set isProduction to true for production environment
  const isProduction = false; 
  return isProduction 
    ? 'https://api.midtrans.com/v2/charge' 
    : 'https://api.sandbox.midtrans.com/v2/charge';
};

router.post('/create-transaction', async (req, res) => {
  const { id, price, quantity, customer_name, customer_email, customer_phone, payment_method } = req.body;

  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      throw new Error('MIDTRANS_SERVER_KEY is not defined in your .env file');
    }

    // 1. Encode Server Key to Base64
    // Sesuai dokumentasi Midtrans, Server Key di-encode ke Base64 dan ditambahkan tanda ':' di belakangnya.
    const base64ServerKey = Buffer.from(serverKey + ':').toString('base64');

    // 2. Prepare the request headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${base64ServerKey}`,
    };

    // 3. Prepare the transaction details common for all payment types
    const order_id = `ORDER-${Date.now()}-${id}`;
    const gross_amount = price * quantity;

    const transactionData = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      customer_details: {
        first_name: customer_name,
        email: customer_email,
        phone: customer_phone,
      },
      item_details: [
        {
          id: id,
          price: price,
          quantity: quantity,
          name: `Top Up ${id}`,
        },
      ],
    };

    // 4. Build the final payload based on the payment method
    let payload;
    switch (payment_method) {
      case 'qris':
        payload = {
          ...transactionData,
          payment_type: 'qris',
          qris: {
            acquirer: 'gopay', // QRIS can be paid by any supporting app
          },
        };
        break;
      case 'gopay':
        payload = {
          ...transactionData,
          payment_type: 'gopay',
          gopay: {
            enable_callback: true,
            callback_url: 'https://snowystoree.netlify.app/status', // Example callback URL
          }
        };
        break;
      case 'bank_transfer':
        payload = {
          ...transactionData,
          payment_type: 'bank_transfer',
          bank_transfer: {
            bank: 'bca', // Example: BCA. You can make this dynamic.
          },
        };
        break;
      default:
        return res.status(400).json({ error: 'Invalid payment type' });
    }

    // 5. Send the request to Midtrans API
    console.log("Sending payload to Midtrans:", JSON.stringify(payload, null, 2));

    const midtransResponse = await axios.post(getMidtransApiUrl(), payload, { headers });

    console.log("Midtrans charge response:", midtransResponse.data);
    res.json(midtransResponse.data);

  } catch (error) {
    console.error('Error creating Midtrans transaction:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
        message: 'Failed to create transaction',
        error: error.response ? error.response.data : error.message 
    });
  }
});

export default router;
