import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import PaymentMethodSelector from '../components/checkout/PaymentMethodSelector';
import QRDisplayModal from '../components/checkout/QRDisplayModal';
import { useIsMobile } from '../hooks/use-mobile';
import { Separator } from '../components/ui/separator';
import { formatCurrency } from '../lib/utils'; // Assuming this utility exists

const Checkout: React.FC = () => {
  const [selectedEWallet, setSelectedEWallet] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<{ url: string; info: string } | null>(null);
  const isMobile = useIsMobile();

  const amountToPay = 150000; // Example amount

  const handlePayNow = () => {
    if (!selectedEWallet) {
      alert('Please select an e-wallet method.');
      return;
    }

    // Placeholder for Midtrans Core process
    console.log(`Initiating payment for ${selectedEWallet} with amount ${amountToPay}`);

    // Simulate Midtrans response
    const simulatedMidtransResponse = {
      transaction_status: 'pending',
      qr_code_url: 'https://via.placeholder.com/256x256?text=QR+Code', // Placeholder QR
      deeplink_url: `https://example.com/deeplink/${selectedEWallet}?amount=${amountToPay}`, // Placeholder Deeplink
      payment_info: `Pay ${formatCurrency(amountToPay)} via ${selectedEWallet.toUpperCase()}`,
    };

    if (isMobile) {
      // For mobile, redirect to deeplink
      // In a real application, this would use the actual deeplink from Midtrans
      // to open the e-wallet application. For this simulation, we'll redirect
      // to a success page to avoid navigation errors with placeholder URLs.
      console.log(`Simulating deeplink for ${selectedEWallet}: ${simulatedMidtransResponse.deeplink_url}`);
      // Redirect to a simulated transaction status page
      window.location.href = '/transaction-status?status=success&method=' + selectedEWallet;
    } else {
      // For desktop, display QR code in modal
      setQrCodeData({
        url: simulatedMidtransResponse.qr_code_url,
        info: simulatedMidtransResponse.payment_info,
      });
      setIsQRModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600">Total Amount:</p>
            <p className="text-5xl font-extrabold text-primary mt-2">
              {formatCurrency(amountToPay)}
            </p>
          </div>

          <Separator className="my-8" />

          <h3 className="text-xl font-semibold mb-4 text-center">Choose Payment Method</h3>
          <PaymentMethodSelector
            selectedMethod={selectedEWallet}
            onSelectMethod={setSelectedEWallet}
          />

          <Button
            className="w-full mt-8 py-3 text-lg font-semibold"
            onClick={handlePayNow}
            disabled={!selectedEWallet}
          >
            Pay Now
          </Button>
        </CardContent>
      </Card>

      {qrCodeData && (
        <QRDisplayModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          qrCodeUrl={qrCodeData.url}
          paymentInfo={qrCodeData.info}
        />
      )}
    </div>
  );
};

export default Checkout;
