import axios from 'axios';
import { Handler } from '@netlify/functions';

// Import your existing create-transaction logic
const createMidtransTransaction = async (body: any) => {
  const { id, price, quantity, customer_name, customer_email, customer_phone, payment_method } = body;

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  
  if (!serverKey) {
    throw new Error('MIDTRANS_SERVER_KEY is not set');
  }

  const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Basic ${base64ServerKey}`,
  };

  const order_id = `ORDER-${Date.now()}-${id}`;
  const gross_amount = price * quantity;

  const transactionData = {
    transaction_details: { order_id, gross_amount },
    customer_details: {
      first_name: customer_name,
      email: customer_email,
      phone: customer_phone,
    },
    item_details: [{ id, price, quantity, name: `Top Up ${id}` }],
  };

  let payload;

  switch (payment_method) {
    case 'gopay':
      payload = {
        ...transactionData,
        payment_type: 'gopay',
        gopay: { 
          enable_callback: true, 
          callback_url: 'https://snowystoree.netlify.app/status' 
        },
      };
      break;
    case 'qris':
      payload = {
        ...transactionData,
        payment_type: 'qris',
        qris: { acquirer: 'gopay' },
      };
      break;
    default:
      throw new Error('Invalid payment type');
  }

  const response = await axios.post("https://api.sandbox.midtrans.com/v2/charge", payload, { headers });
  return response.data;
};

export const handler: Handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: '',
    };
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    // Parse the path to determine the route
    const path = event.path.replace('/.netlify/functions/api/', '').replace('/api/', '');
    console.log('API Path:', path);
    console.log('Full Path:', event.path);

    // Route handling
    if (path === 'midtrans/create-transaction' && event.httpMethod === 'POST') {
      if (!event.body) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Request body is required' }),
        };
      }

      const body = JSON.parse(event.body);
      
      // Validate required fields
      const { id, price, quantity, customer_name, customer_email, customer_phone, payment_method } = body;
      if (!id || !price || !quantity || !customer_name || !customer_email || !customer_phone || !payment_method) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      const result = await createMidtransTransaction(body);
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(result),
      };
    }

    // If no route matches
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'API route not found', path }),
    };

  } catch (error: any) {
    console.error('API Error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error.message,
      }),
    };
  }
};