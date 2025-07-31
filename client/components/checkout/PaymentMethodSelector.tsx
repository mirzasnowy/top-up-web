import React from 'react';
import EWalletOption from './EWalletOption';
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from 'react-icons/fa'; // Placeholder icons

interface PaymentMethodSelectorProps {
  selectedMethod: string | null;
  onSelectMethod: (method: string) => void;
}

const paymentMethods = [
  { name: "GoPay", icon: <FaMoneyBillWave />, value: "gopay" },
  { name: "ShopeePay", icon: <FaCreditCard />, value: "shopeepay" },
  { name: "DANA", icon: <FaQrcode />, value: "dana" },
  { name: "OVO", icon: <FaMoneyBillWave />, value: "ovo" },
];

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {paymentMethods.map((method) => (
        <EWalletOption
          key={method.value}
          name={method.name}
          icon={method.icon}
          isSelected={selectedMethod === method.value}
          onSelect={() => onSelectMethod(method.value)}
        />
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
