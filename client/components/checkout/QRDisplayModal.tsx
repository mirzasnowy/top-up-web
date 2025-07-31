import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';

interface QRDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string;
  paymentInfo: string;
}

const QRDisplayModal: React.FC<QRDisplayModalProps> = ({ isOpen, onClose, qrCodeUrl, paymentInfo }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan QR Code for Payment</DialogTitle>
          <DialogDescription>
            Scan this QR code with your e-wallet application to complete the payment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64 object-contain" />
          ) : (
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              Loading QR Code...
            </div>
          )}
          <p className="mt-4 text-lg font-semibold text-center">{paymentInfo}</p>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default QRDisplayModal;
