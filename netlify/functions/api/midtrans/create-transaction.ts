import axios from 'axios';

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { id, price, quantity, customer_name, customer_email, customer_phone, payment_method } = body;

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
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
        gopay: { enable_callback: true, callback_url: 'https://snowystoree.netlify.app/status' },
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
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid payment type' }),
      };
  }

  try {
    const response = await axios.post("https://api.sandbox.midtrans.com/v2/charge", payload, { headers });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to create transaction',
        error: error.response ? error.response.data : error.message,
      }),
    };
  }
};
